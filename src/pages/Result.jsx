import React from 'react';
import { ArrowLeft, ArrowRight, Bot, CheckCircle2, Hospital, ShieldAlert, Stethoscope } from 'lucide-react';
import Logo from '../components/Logo';

function urgencyClass(value = '') {
  const v = value.toLowerCase();
  if (v.includes('high') || v.includes('urgent')) return 'urgent';
  if (v.includes('low') || v.includes('routine')) return 'low';
  return 'moderate';
}

export default function Result() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem('doctorSahabLatestResult');
      if (saved) setData(JSON.parse(saved));
    } catch { setData(null); }
  }, []);

  if (!data) {
    return <div className="result-page"><header className="result-topbar"><Logo /><a className="back-home" href="#/chat"><ArrowLeft size={15}/> Back to Chat</a></header><main className="empty-result"><div className="empty-icon"><Bot size={28}/></div><h2>No health report yet</h2><p>Start a health check first, and your latest AI health-awareness report will appear here.</p><a className="primary-btn" href="#/chat">Start a Health Check <ArrowRight size={16}/></a></main></div>;
  }

  const urgency = data.urgency || 'moderate';
  return <div className="result-page">
    <header className="result-topbar">
      <Logo />
      <a className="back-home" href="#/chat"><ArrowLeft size={15}/> Back to Chat</a>
      <div className="result-user"><span className="avatar">P</span><span>Piyush</span></div>
    </header>

    <main className="result-container">
      <div className="result-heading">
        <div><div className="result-eyebrow">DoctorSahab Talk AI</div><h1>AI Health Analysis Complete</h1><p>This is a health-awareness report based on the information you provided.</p></div>
        <div className={`urgency-badge ${urgencyClass(urgency)}`}><span className="urgency-dot"/> {urgency} urgency</div>
      </div>

      <section className="summary-card">
        <div className="section-icon"><Bot size={20}/></div>
        <div><div className="section-kicker">Health Summary</div><h2>{data.summary}</h2><p>AI guidance is informational and cannot confirm a diagnosis.</p></div>
      </section>

      <div className="result-grid">
        <section className="result-card"><div className="card-title"><Stethoscope size={18}/> Possible Causes</div><ul>{(data.possibleCauses || []).map((x,i)=><li key={i}>{x}</li>)}</ul></section>
        <section className="result-card"><div className="card-title"><CheckCircle2 size={18}/> General Guidance</div><ul>{(data.guidance || []).map((x,i)=><li key={i}>{x}</li>)}</ul></section>
      </div>

      <section className="warning-result-card"><div className="card-title"><ShieldAlert size={19}/> Warning Signs</div><p>If you experience any of these symptoms, seek appropriate medical care promptly:</p><ul>{(data.warningSigns || []).map((x,i)=><li key={i}>{x}</li>)}</ul></section>

      <section className="doctor-result-card"><div className="doctor-result-copy"><div className="card-title"><Hospital size={19}/> When to See a Doctor</div><p>{data.doctorRecommendation}</p></div><a className="primary-btn" href="#/doctors">Find Doctors & Hospitals <ArrowRight size={16}/></a></section>

      <div className="result-disclaimer"><ShieldAlert size={16}/><span><b>Important:</b> DoctorSahab Talk AI is for healthcare awareness only. It does not diagnose conditions or replace a qualified healthcare professional. For severe or emergency symptoms, seek immediate medical attention.</span></div>
    </main>
  </div>;
}
