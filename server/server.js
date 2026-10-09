import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json({ limit: '1mb' }));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const medicalKeywords = ['health','medical','medicine','doctor','hospital','symptom','symptoms','pain','fever','cough','cold','flu','headache','migraine','stomach','vomit','vomiting','nausea','diarrhea','diarrhoea','skin','rash','itch','itching','allergy','breath','breathing','chest','heart','blood','pressure','sugar','diabetes','infection','wound','injury','dizziness','weakness','fatigue','sleep','anxiety','stress','mental','pregnancy','period','menstrual','urine','kidney','liver','lung','throat','ear','eye','tooth','dental','tablet','drug','dose','dosage','vaccine','vaccination','nutrition','diet','exercise','weight','temperature','bp','pulse','emergency','ambulance','cancer'];
const nonMedicalPatterns = [/\b(code|coding|javascript|java|python|react|node|html|css|programming)\b/i,/\b(stock|share market|crypto|bitcoin|trading)\b/i,/\b(politics|politician|election|prime minister|president)\b/i,/\b(movie|film|song|game|cricket|football)\b/i,/\b(joke|story|poem|recipe)\b/i];
function isMedicalQuestion(text){const lower=text.toLowerCase();if(nonMedicalPatterns.some(p=>p.test(lower)))return false;return medicalKeywords.some(k=>lower.includes(k));}
const systemPrompt = `
You are DoctorSahab Talk AI, a healthcare awareness assistant.

Answer ONLY health, medical, healthcare, wellness, symptoms,
prevention, or healthcare-access questions.

Never claim to diagnose a condition.
Do not prescribe medicines or give dosages.
Give general health awareness and appropriate next steps.

For emergencies, advise immediate professional emergency care.

Your job also includes identifying the most appropriate type of
healthcare specialist based on the user's stated concern.

Use ONLY one of these specialty values:

- General Physician
- Internal Medicine
- Cardiology
- Dermatology
- ENT Specialist
- Pediatrics
- Oncology
- Gastroenterology
- Orthopedics
- Neurology
- Urology
- Nephrology
- Ophthalmology
- Dentistry
- Psychiatry
- Gynecology

Choose the most relevant specialty based on the user's stated
symptoms or healthcare concern.

IMPORTANT:
Do not diagnose a disease just to choose a specialty.
For example, if the user says "I have fever and cough",
recommend General Physician or Internal Medicine.
If the user says they have been diagnosed with cancer or are
asking about cancer care, recommend Oncology.
If the concern is about skin rash or itching, recommend Dermatology.

Return valid JSON only in exactly this structure:

{
  "summary": "",
  "urgency": "low | moderate | urgent",
  "recommendedSpecialty": "",
  "possibleCauses": [],
  "guidance": [],
  "warningSigns": [],
  "doctorRecommendation": ""
}
`;
function fallbackForNonMedical() {
  return {
    summary: 'I can help only with health and medical-related questions.',
    urgency: 'low',
    recommendedSpecialty: '',
    possibleCauses: [],
    guidance: [
      'Please ask me about symptoms, health concerns, prevention, wellness, or healthcare access.'
    ],
    warningSigns: [],
    doctorRecommendation:
      'For a medical concern, describe your symptoms, how long you have had them, and any important related details.'
  };
}

const userSchema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true},passwordHash:{type:String,required:true}},{timestamps:true});
const recordSchema=new mongoose.Schema({userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},question:{type:String,required:true},data:{type:Object,required:true}},{timestamps:true});
const User=mongoose.model('User',userSchema); const HealthRecord=mongoose.model('HealthRecord',recordSchema);
function signToken(user){return jwt.sign({id:user._id,email:user.email,name:user.name},process.env.JWT_SECRET,{expiresIn:'7d'});}
function auth(req,res,next){try{const h=req.headers.authorization||'';const token=h.startsWith('Bearer ')?h.slice(7):null;if(!token) return res.status(401).json({ok:false,message:'Authentication required.'});req.user=jwt.verify(token,process.env.JWT_SECRET);next();}catch{return res.status(401).json({ok:false,message:'Invalid or expired token.'});}}

app.get('/api/health',(_req,res)=>res.json({ok:true,service:'DoctorSahab Talk AI API',database:mongoose.connection.readyState===1?'connected':'disconnected'}));
app.post('/api/auth/register',async(req,res)=>{try{const {name,email,password}=req.body||{};if(!name||!email||!password)return res.status(400).json({ok:false,message:'Name, email and password are required.'});if(password.length<6)return res.status(400).json({ok:false,message:'Password must be at least 6 characters.'});const exists=await User.findOne({email:email.toLowerCase()});if(exists)return res.status(409).json({ok:false,message:'An account with this email already exists.'});const passwordHash=await bcrypt.hash(password,10);const user=await User.create({name,email:email.toLowerCase(),passwordHash});res.status(201).json({ok:true,token:signToken(user),user:{id:user._id,name:user.name,email:user.email}});}catch(e){console.error('register',e);res.status(500).json({ok:false,message:'Could not create account.'});}});
app.post('/api/auth/login',async(req,res)=>{try{const {email,password}=req.body||{};const user=await User.findOne({email:(email||'').toLowerCase()});if(!user||!(await bcrypt.compare(password||'',user.passwordHash)))return res.status(401).json({ok:false,message:'Invalid email or password.'});res.json({ok:true,token:signToken(user),user:{id:user._id,name:user.name,email:user.email}});}catch(e){console.error('login',e);res.status(500).json({ok:false,message:'Could not log in.'});}});
app.get('/api/auth/me',auth,async(req,res)=>{const u=await User.findById(req.user.id).select('name email');res.json({ok:true,user:{id:u._id,name:u.name,email:u.email}});});

app.post('/api/ai/analyze', async (req, res) => {
  try {
    const { message } = req.body || {};
    const text = typeof message === 'string' ? message.trim() : '';

    if (!text) {
      return res.status(400).json({
        ok: false,
        message: 'Please describe your health concern.'
      });
    }

    if (!isMedicalQuestion(text)) {
      return res.json({
        ok: true,
        allowed: false,
        data: fallbackForNonMedical()
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        ok: false,
        message: 'GROQ_API_KEY is missing.'
      });
    }

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      temperature: 0.2,
      response_format: {
        type: 'json_object'
      },
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: text
        }
      ]
    });

    const raw =
      completion.choices?.[0]?.message?.content || '{}';

    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      data = {
        summary: raw,
        urgency: 'moderate',
        recommendedSpecialty: 'General Physician',
        possibleCauses: [],
        guidance: [],
        warningSigns: [],
        doctorRecommendation:
          'Consider discussing your concern with a qualified healthcare professional.'
      };
    }

    const validSpecialties = [
      'General Physician',
      'Internal Medicine',
      'Cardiology',
      'Dermatology',
      'ENT Specialist',
      'Pediatrics',
      'Oncology',
      'Gastroenterology',
      'Orthopedics',
      'Neurology',
      'Urology',
      'Nephrology',
      'Ophthalmology',
      'Dentistry',
      'Psychiatry',
      'Gynecology'
    ];

    if (!validSpecialties.includes(data.recommendedSpecialty)) {
      data.recommendedSpecialty = 'General Physician';
    }

    res.json({
      ok: true,
      allowed: true,
      data
    });

  } catch (error) {
    console.error(
      'AI error:',
      error?.message || error
    );

    res.status(500).json({
      ok: false,
      message:
        error?.message ||
        'The AI service could not process the request right now.'
    });
  }
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        ok: false,
        message: 'Chat messages are required.'
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        ok: false,
        message: 'GROQ_API_KEY is missing.'
      });
    }

    const chatSystemPrompt = `
You are DoctorSahab Talk AI, a friendly healthcare-awareness conversational assistant.

RULES:

1. Help ONLY with health, medical symptoms, wellness, prevention,
healthcare access, doctors, hospitals and general health education.

2. Understand and respond in:
English, Hindi, Hinglish and simple everyday language.

3. Reply in the same language/style as the user.
If the user writes Hindi/Hinglish, reply in Hindi/Hinglish.
If the user writes English, reply in English.

4. This is a conversational chat.
Remember and use previous messages in the conversation.

For example:
User: mujhe fever hai
Assistant: Samajh gaya. Fever ke saath aur koi symptom hai?

User: khansi bhi hai
Assistant: Samajh gaya. Fever aur cough dono hain. Ye kitne din se hain?

Understand follow-up questions using previous context.

5. Ask useful follow-up questions when important information is missing,
such as duration, severity, associated symptoms or relevant history.

6. NEVER claim to diagnose a disease.

7. NEVER prescribe medicines or provide medicine dosages.

8. If symptoms may indicate an emergency, clearly advise the user
to seek immediate professional emergency medical care.

9. Give practical general health-awareness guidance.

10. If the user asks something unrelated to healthcare, politely explain
that you can only help with health-related questions.

11. Return normal conversational text.
DO NOT return JSON.

12. Keep responses friendly, clear and reasonably concise.
`;

    const cleanedMessages = messages
      .filter(
        m =>
          m &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim()
      )
      .slice(-20)
      .map(m => ({
        role: m.role,
        content: m.content.trim()
      }));

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content: chatSystemPrompt
        },
        ...cleanedMessages
      ]
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      'I could not generate a response right now. Please try again.';

    res.json({
      ok: true,
      reply
    });

  } catch (error) {
    console.error(
      'Chat AI error:',
      error?.message || error
    );

    res.status(500).json({
      ok: false,
      message:
        error?.message ||
        'The AI service could not process the chat right now.'
    });
  }
});

app.post('/api/health/records',auth,async(req,res)=>{try{const {question,data}=req.body||{};if(!question||!data)return res.status(400).json({ok:false,message:'Question and report data are required.'});const record=await HealthRecord.create({userId:req.user.id,question,data});res.status(201).json({ok:true,record});}catch(e){console.error('save record',e);res.status(500).json({ok:false,message:'Could not save health report.'});}});
app.get('/api/health/records',auth,async(req,res)=>{try{const records=await HealthRecord.find({userId:req.user.id}).sort({createdAt:-1}).limit(50);res.json({ok:true,records});}catch(e){res.status(500).json({ok:false,message:'Could not load history.'});}});
app.delete('/api/health/records/:id',auth,async(req,res)=>{try{const r=await HealthRecord.findOneAndDelete({_id:req.params.id,userId:req.user.id});if(!r)return res.status(404).json({ok:false,message:'Report not found.'});res.json({ok:true});}catch(e){res.status(500).json({ok:false,message:'Could not delete report.'});}});

if(process.env.MONGODB_URI){mongoose.connect(process.env.MONGODB_URI).then(()=>console.log('MongoDB connected')).catch(e=>console.error('MongoDB connection error:',e.message));}else{console.warn('MONGODB_URI is missing. Auth/history will not work until MongoDB is configured.');}
app.listen(PORT,()=>console.log(`DoctorSahab API running at http://localhost:${PORT}`));
