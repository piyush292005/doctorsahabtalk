import React from 'react';
import { ArrowRight, Bot, CalendarHeart, Clock3, Hospital, MessageCircleHeart, ShieldCheck, Stethoscope } from 'lucide-react';
import Navbar from '../components/Navbar';
import doctorImage from '../assets/doctor-illustration.png';

const features = [
  { icon: Bot, title: 'AI Health Guidance', text: 'Understand your symptoms in simple words.' },
  { icon: Stethoscope, title: 'Doctor Recommendations', text: 'Find nearby doctors & hospitals with details.' },
  { icon: CalendarHeart, title: 'Health History', text: 'Access your past reports anytime.' },
  { icon: Clock3, title: '24/7 Support', text: 'Get health-awareness help whenever you need it.' },
];

export default function Home() {
  return <div className="app" id="top">
    <Navbar />
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Your Health, Our Priority</div>
          <h1>Talk to DoctorSahab<br />Get AI-Powered Health<br />Guidance & Trusted Care</h1>
          <p className="hero-text">Describe your symptoms, get instant AI insights, and find the right doctors or hospitals near you — all in one place.</p>
          <div className="hero-actions">
            <a className="primary-btn" href="#/chat">Start a Health Check <ArrowRight size={17} /></a>
            <a className="secondary-btn" href="#about"><span className="play">▶</span> How It Works</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="leaf leaf-one" /><div className="leaf leaf-two" /><div className="doctor-glow" />
          <img src={doctorImage} alt="Friendly doctor illustration" className="doctor-image" />
          <div className="speech-card"><b>Don't worry!</b><br />I'm here<br />to help you 😊</div>
        </div>
      </section>
      <section className="feature-grid" id="features">
        {features.map(({ icon: Icon, title, text }) => <article className="feature-card" key={title}>
          <div className="feature-icon"><Icon size={21} /></div><div><h3>{title}</h3><p>{text}</p></div>
        </article>)}
      </section>
      <section className="trust-strip" id="about">
        <div className="trust-item"><ShieldCheck size={18} /> Health-awareness focused</div>
        <div className="trust-item"><MessageCircleHeart size={18} /> Simple conversational experience</div>
        <div className="trust-item"><Hospital size={18} /> Healthcare access support</div>
      </section>
      <section className="bottom-cta" id="contact">
        <div><span className="mini-label">DoctorSahab Talk AI</span><h2>Better Health <span>♡</span> Brighter Future</h2><p>AI guidance for awareness — not a replacement for a qualified medical professional.</p></div>
        <a className="primary-btn" href="#/chat">Start Health Check <ArrowRight size={17} /></a>
      </section>
    </main>
  </div>;
}
