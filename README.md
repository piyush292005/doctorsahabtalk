# DoctorSahab Talk AI — Step 3

Step 3 adds a Node/Express backend and Groq LLM integration to the Step 2 React frontend.

## 1. Frontend

From the project root:

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## 2. Backend

Open a second terminal:

```bash
cd server
npm install
```

Create `server/.env` from `.env.example` and add your Groq API key:

```env
PORT=5000
GROQ_API_KEY=your_real_key_here
GROQ_MODEL=llama-3.3-70b-versatile
CLIENT_URL=http://localhost:5173
```

Then:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`.

## 3. Test

Open the frontend, click **Start a Health Check**, then ask something medical such as:

`I have fever and cough for two days.`

The frontend sends the question to `/api/ai/analyze`, the backend applies a first-line medical-domain filter, and allowed questions are sent to Groq.

Non-medical questions are rejected before they reach the LLM.

## Important

Never put the Groq API key inside React/Vite frontend code. Keep it in `server/.env`, which is ignored by Git.

This is a healthcare-awareness demo, not a diagnostic or treatment system.
