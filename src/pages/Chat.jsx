
import React from 'react';
import {
  ArrowLeft,
  Bot,
  Hospital,
  History,
  LoaderCircle,
  Mic,
  Send,
  ShieldCheck,
  UserRound,
  Volume2,
  VolumeX,
  Square
} from 'lucide-react';
import Logo from '../components/Logo';
import API_URL from '../api';

const suggestions = [
  'Mujhe fever hai',
  'Pet mein dard hai',
  'I have a headache',
  'I have a skin problem'
];

export default function Chat() {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [listening, setListening] = React.useState(false);
  const [speaking, setSpeaking] = React.useState(false);
  const [handsFree, setHandsFree] = React.useState(false);
  const [voiceLanguage, setVoiceLanguage] = React.useState('hi-IN');

  const recognitionRef = React.useRef(null);
  const recognitionActiveRef = React.useRef(false);
  const recognitionStartingRef = React.useRef(false);
  const messagesRef = React.useRef([]);
  const loadingRef = React.useRef(false);
  const handsFreeRef = React.useRef(false);
  const voiceRequestRef = React.useRef(false);
  const restartTimerRef = React.useRef(null);
  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  React.useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      handsFreeRef.current = false;
      clearTimeout(restartTimerRef.current);

      try {
        recognitionRef.current?.abort();
      } catch {}

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const scheduleHandsFreeRestart = (delay = 800) => {
    clearTimeout(restartTimerRef.current);

    if (!handsFreeRef.current || !mountedRef.current) return;

    restartTimerRef.current = setTimeout(() => {
      if (!handsFreeRef.current || !mountedRef.current) return;

      if (
        recognitionActiveRef.current ||
        recognitionStartingRef.current
      ) {
        return;
      }

      if (loadingRef.current || speaking) {
        scheduleHandsFreeRestart(800);
        return;
      }

      startListening();
    }, delay);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  

const speakText = (text) => {
  if (!text || !("speechSynthesis" in window)) return;

  const cleanText = String(text)
    .replace(/[#*_>`|]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleanText) return;

  window.speechSynthesis.cancel();

  const parts = cleanText.match(/[^.!?।]+[.!?।]?/g) || [cleanText];
  const chunks = [];
  let current = "";

  parts.forEach((part) => {
    const sentence = part.trim();
    if (!sentence) return;

    if ((current + " " + sentence).trim().length > 220) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current = (current + " " + sentence).trim();
    }
  });

  if (current) chunks.push(current);

  const voices = window.speechSynthesis.getVoices();
  const hindiVoice = voices.find((v) => /^hi(-IN)?$/i.test(v.lang));
  const englishVoice = voices.find((v) => /^en-IN$/i.test(v.lang));
  const isHindi = /[\u0900-\u097F]/.test(cleanText);

  let index = 0;

  const speakNext = () => {
    if (index >= chunks.length) {
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunks[index++]);
    utterance.lang = isHindi ? "hi-IN" : "en-IN";

    const voice = isHindi ? hindiVoice : englishVoice;
    if (voice) utterance.voice = voice;

    utterance.rate = 0.95;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => speakNext();

    utterance.onerror = (event) => {
      console.error("Speech error:", event.error);
      setSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  speakNext();
};


  const stopHandsFree = () => {
    handsFreeRef.current = false;
    setHandsFree(false);

    clearTimeout(restartTimerRef.current);

    recognitionStartingRef.current = false;
    recognitionActiveRef.current = false;

    try {
      recognitionRef.current?.abort();
    } catch {}

    recognitionRef.current = null;
    setListening(false);
    stopSpeaking();
  };

  const startHandsFree = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        'Speech recognition is not supported. Please use an updated Chrome browser.'
      );
      return;
    }

    if (loadingRef.current) return;

    setError('');
    handsFreeRef.current = true;
    setHandsFree(true);

    startListening();
  };

  const sendMessage = async (rawText, shouldSpeak = true) => {
    const value = typeof rawText === 'string' ? rawText.trim() : '';

    if (!value || loadingRef.current) return;

    clearTimeout(restartTimerRef.current);
    stopSpeaking();

    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: value
    };

    const updatedMessages = [...messagesRef.current, userMessage];

    messagesRef.current = updatedMessages;
    setMessages(updatedMessages);
    setMessage('');
    setError('');
    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/ai/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages: updatedMessages.map(item => ({
              role: item.role,
              content: item.text
            }))
          })
        }
      );

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(
          result.message || 'Unable to get an AI response.'
        );
      }

      if (!mountedRef.current) return;

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        text: result.reply
      };
      
      // Save a structured health report for logged-in users.
     
      // Save a structured health report for logged-in users.
      try {
        const token = localStorage.getItem('doctorSahabToken');

        if (token) {
          const analysisResponse = await fetch(
            `${API_URL}/api/ai/analyze`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ message: value })
            }
          );

          const analysisResult = await analysisResponse.json();

          if (
            !analysisResponse.ok ||
            !analysisResult.ok ||
            !analysisResult.allowed ||
            !analysisResult.data
          ) {
            throw new Error(
              analysisResult.message || 'Could not create a health report.'
            );
          }

          const saveResponse = await fetch(
            `${API_URL}/api/health/records`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                question: value,
                data: analysisResult.data
              })
            }
          );

          const saveResult = await saveResponse.json();

          if (!saveResponse.ok || !saveResult.ok) {
            throw new Error(
              saveResult.message || 'Could not save the health report.'
            );
          }

          console.log('Health report saved successfully.');
        } else {
          console.warn('Health report not saved: user is not logged in.');
        }
      } catch (saveError) {
        console.error('Health report save failed:', saveError);
        if (mountedRef.current) {
          setError(`Chat reply received, but report was not saved: ${saveError.message}`);
        }
      }


      const finalMessages = [
        ...messagesRef.current,
        assistantMessage
      ];

      messagesRef.current = finalMessages;
      setMessages(finalMessages);

      if (shouldSpeak) {
        speakText(result.reply);
      } else {
        scheduleHandsFreeRestart(500);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(
          err.message || 'Unable to connect to DoctorSahab AI.'
        );
      }

      scheduleHandsFreeRestart(1500);
    } finally {
      loadingRef.current = false;

      if (mountedRef.current) {
        setLoading(false);
      }

      // Safety fallback if voice playback did not start.
      if (handsFreeRef.current && !shouldSpeak) {
        scheduleHandsFreeRestart(500);
      }
    }
  };

  const startListening = () => {
    if (!mountedRef.current) return;

    if (
      recognitionActiveRef.current ||
      recognitionStartingRef.current ||
      loadingRef.current
    ) {
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(
        'Speech recognition is not supported. Please use an updated Chrome browser.'
      );
      return;
    }

    clearTimeout(restartTimerRef.current);
    stopSpeaking();

    const recognition = new SpeechRecognition();

    recognition.lang = voiceLanguage;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    let finalTranscript = '';
    let requestSent = false;

    recognitionStartingRef.current = true;

    recognition.onstart = () => {
      recognitionStartingRef.current = false;
      recognitionActiveRef.current = true;

      if (mountedRef.current) {
        setListening(true);
      }
    };

    
    recognition.onresult = (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      if (mountedRef.current) {
        setMessage(
          (finalTranscript + interimTranscript).trim()
        );
      }
    };

    recognition.onerror = (event) => {
      recognitionStartingRef.current = false;

      if (mountedRef.current) {
        setListening(false);
      }

      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError(
          'Microphone permission denied. Allow microphone access in Chrome settings.'
        );

        // Permission errors cannot be fixed by restarting repeatedly.
        handsFreeRef.current = false;

        if (mountedRef.current) {
          setHandsFree(false);
        }
      } else if (
        event.error !== 'no-speech' &&
        event.error !== 'aborted'
      ) {
        setError(
          'Voice recognition stopped. Trying to reconnect...'
        );
      }
    };

    recognition.onend = () => {
      recognitionStartingRef.current = false;
      recognitionActiveRef.current = false;

      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }

      if (mountedRef.current) {
        setListening(false);
      }

      if (!handsFreeRef.current) return;

      const transcript = finalTranscript.trim();

      if (transcript && !requestSent) {
        requestSent = true;
        voiceRequestRef.current = true;
        sendMessage(transcript, true);
      } else {
        // Silence, no speech, or a temporary recognition interruption.
        scheduleHandsFreeRestart(900);
      }
    };

    try {
      recognition.start();
    } catch {
      recognitionStartingRef.current = false;
      recognitionActiveRef.current = false;

      if (mountedRef.current) {
        setListening(false);
        setError('Could not start the microphone. Retrying...');
      }

      scheduleHandsFreeRestart(1500);
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch {}

    setListening(false);
  };

  const submit = (event) => {
    event?.preventDefault();
    sendMessage(message, true);
  };
  
const currentUser = JSON.parse(
  localStorage.getItem('doctorSahabUser') || '{}'
);

const displayName = currentUser.name || 'User';


  return (
    <div className="chat-page">
      <header className="chat-topbar">
        <Logo />

        <a href="#/" className="back-home">
          <ArrowLeft size={15} /> Back to Home
        </a>

        <div className="user-chip">
          
<span className="avatar">
  {displayName.charAt(0).toUpperCase()}
</span>
<span className="user-name">{displayName}</span>

          <span>⌄</span>
        </div>
      </header>

      <div className="chat-layout">
        <aside className="chat-sidebar">
          <a className="side-link active" href="#/chat">
            <Bot size={17} /> Chat
          </a>

          <a className="side-link" href="#/history">
            <History size={17} /> History
          </a>

          <a className="side-link" href="#/doctors">
            <UserRound size={17} /> Doctors
          </a>

          <a className="side-link" href="#/emergency">
            <Hospital size={17} /> Hospitals
          </a>

          <a className="side-link" href="#/profile">
            <UserRound size={17} /> Profile
          </a>

          <div className="health-note">
            <div className="heart-plant">♡</div>
            <b>Your<br />Health<br />Matters</b>
            <small>Talk to us anytime</small>
          </div>
        </aside>

        <main className="chat-main">
          <div className="chat-content">
            <div className="welcome-row">
              <div className="bot-avatar">
                <Bot size={27} />
              </div>

              <div className="welcome-card">
                <b>Hello! 👋 I'm DoctorSahab.</b>
                <p>
                  Type or speak in your preferred language.
                  I'll respond conversationally and can read my
                  replies aloud.
                </p>
              </div>
            </div>

            {messages.length > 0 && (
              <div className="message-list">
                {messages.map(item =>
                  item.role === 'user' ? (
                    <div className="user-message" key={item.id}>
                      {item.text}
                    </div>
                  ) : (
                    <div className="ai-response" key={item.id}>
                      <div className="assistant-message">
                        <Bot size={16} />
                        DoctorSahab Talk AI
                      </div>

                      <div className="ai-response-card">
                        <div className="ai-chat-text">
                          {item.text}
                        </div>

                        <button
                          type="button"
                          className="voice-replay-btn"
                          onClick={() => speakText(item.text)}
                          title="Listen to this response"
                        >
                          <Volume2 size={16} />
                          Listen
                        </button>
                      </div>
                    </div>
                  )
                )}

                {loading && (
                  <div className="assistant-message loading-message">
                    <LoaderCircle size={16} className="spin" />
                    DoctorSahab is preparing your response...
                  </div>
                )}
              </div>
            )}

            <div className="prompt">
              What would you like to talk about?
            </div>

            <div className="suggestions">
              {suggestions.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMessage(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="voice-language-row">
              <label htmlFor="voice-language">
                Voice language
              </label>

              <select
                id="voice-language"
                value={voiceLanguage}
                onChange={event => setVoiceLanguage(event.target.value)}
                disabled={listening || handsFree}
              >
                <option value="hi-IN">Hindi / Hinglish</option>
                <option value="en-IN">English (India)</option>
                <option value="en-US">English (US)</option>
              </select>
            </div>

            <div className="hands-free-controls">
              {!handsFree ? (
                <button
                  type="button"
                  className="hands-free-btn"
                  onClick={startHandsFree}
                  disabled={loading}
                >
                  <Mic size={18} />
                  Start hands-free conversation
                </button>
              ) : (
                <button
                  type="button"
                  className="hands-free-btn hands-free-stop"
                  onClick={stopHandsFree}
                >
                  <Square size={16} />
                  Stop conversation
                </button>
              )}

              {handsFree && (
                <p className="hands-free-status">
                  {listening
                    ? 'Listening... Speak, then pause when finished.'
                    : speaking
                      ? 'DoctorSahab is speaking...'
                      : loading
                        ? 'Preparing your reply...'
                        : 'Voice mode active. Waiting for microphone...'}
                </p>
              )}
            </div>

            <form className="chat-input-wrap" onSubmit={submit}>
              <input
                value={message}
                onChange={event => setMessage(event.target.value)}
                placeholder="Type here or tap the mic to speak..."
                aria-label="Describe your health concern"
              />

              <button
                type="button"
                className={`send-btn mic-btn ${listening ? 'mic-listening' : ''}`}
                onClick={listening ? stopListening : startListening}
                disabled={loading || handsFree}
                aria-label={listening ? 'Stop listening' : 'Start voice input'}
                title={listening ? 'Stop listening' : 'Speak'}
              >
                {listening ? <Square size={17} /> : <Mic size={19} />}
              </button>

              <button
                className="send-btn"
                type="submit"
                aria-label="Send message"
                disabled={loading || !message.trim()}
              >
                <Send size={17} />
              </button>
            </form>

            {listening && (
              <div className="voice-status">
                <span className="voice-pulse" />
                Listening... Speak now, then pause to send your message.
              </div>
            )}

            {speaking && (
              <button
                type="button"
                className="stop-speaking-btn"
                onClick={stopSpeaking}
              >
                <VolumeX size={16} /> Stop voice reply
              </button>
            )}

            {error && (
              <div className="chat-error" role="alert">
                {error}
              </div>
            )}

            <div className="voice-row">
              <Mic size={15} />
              Tap the mic, speak, and pause when you finish.
            </div>

            <div className="chat-safety">
              <ShieldCheck size={16} />
              <span>
                <b>Health-awareness only:</b> DoctorSahab Talk AI
                does not diagnose conditions or replace a qualified
                doctor. For emergencies, seek immediate medical care.
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}