import React from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  PhoneCall,
  HeartPulse,
  Wind,
  Brain,
  Droplets,
  ShieldAlert,
  Hospital,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import Logo from '../components/Logo';

export default function Emergency() {
  const emergencySigns = [
    {
      icon: HeartPulse,
      title: 'Severe Chest Pain',
      text: 'Sudden or severe chest pain, pressure, or discomfort that does not improve.'
    },
    {
      icon: Wind,
      title: 'Severe Breathing Difficulty',
      text: 'Extreme difficulty breathing, inability to speak normally, or severe shortness of breath.'
    },
    {
      icon: Brain,
      title: 'Loss of Consciousness',
      text: 'Fainting, unresponsiveness, sudden confusion, or seizure.'
    },
    {
      icon: Droplets,
      title: 'Severe Bleeding',
      text: 'Heavy bleeding that does not stop with basic pressure or appears life-threatening.'
    },
    {
      icon: Brain,
      title: 'Possible Stroke Symptoms',
      text: 'Sudden facial weakness, difficulty speaking, or sudden weakness/numbness of an arm or leg.'
    },
    {
      icon: ShieldAlert,
      title: 'Severe Allergic Reaction',
      text: 'Severe swelling of the face or throat, breathing difficulty, or rapidly worsening reaction.'
    }
  ];

  return (
    <div className="emergency-page">

      <header className="emergency-topbar">
        <Logo />

        <a href="#/chat" className="back-home">
          <ArrowLeft size={16} />
          Back to AI Chat
        </a>
      </header>

      <main className="emergency-container">

        {/* Hero */}
        <section className="emergency-hero">

          <div className="emergency-hero-icon">
            <AlertTriangle size={38} />
          </div>

          <div>
            <div className="emergency-eyebrow">
              EMERGENCY & SAFETY
            </div>

            <h1>Need urgent medical help?</h1>

            <p>
              If you or someone around you may be experiencing a
              life-threatening emergency, seek professional emergency
              medical help immediately.
            </p>
          </div>

        </section>


        {/* Emergency Action */}
        <section className="emergency-action-card">

          <div className="emergency-action-content">

            <div className="emergency-action-icon">
              <PhoneCall size={26} />
            </div>

            <div>
              <h2>Get immediate help</h2>

              <p>
                Do not wait for an AI response if the situation appears
                life-threatening.
              </p>
            </div>

          </div>

          <a
            href="tel:112"
            className="emergency-call-btn"
          >
            <PhoneCall size={18} />
            Call 112
          </a>

        </section>


        {/* Warning Signs */}
        <section className="emergency-section">

          <div className="emergency-section-heading">
            <div>
              <div className="emergency-eyebrow">
                WARNING SIGNS
              </div>

              <h2>Seek immediate medical attention if...</h2>

              <p>
                These are examples of situations that may require urgent
                professional evaluation.
              </p>
            </div>
          </div>


          <div className="emergency-signs-grid">

            {emergencySigns.map((item, index) => {
              const Icon = item.icon;

              return (
                <div className="emergency-sign-card" key={index}>

                  <div className="emergency-sign-icon">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* Hospital */}
        <section className="emergency-hospital-card">

          <div className="emergency-hospital-icon">
            <Hospital size={28} />
          </div>

          <div className="emergency-hospital-content">

            <h2>Need a hospital?</h2>

            <p>
              You can use DoctorSahab's hospital information to check
              available hospital details and directions.
            </p>

          </div>

          <a
            href="#/hospital/City%20Care%20Hospital"
            className="emergency-hospital-btn"
          >
            <MapPin size={17} />
            Find Hospital
          </a>

        </section>


        {/* Safety */}
        <section className="emergency-safety-card">

          <div className="emergency-safety-title">
            <ShieldAlert size={22} />
            <h2>Important AI Safety Notice</h2>
          </div>

          <div className="emergency-safety-list">

            <div>
              <CheckCircle2 size={17} />
              <span>
                DoctorSahab Talk AI provides general healthcare awareness,
                not a medical diagnosis.
              </span>
            </div>

            <div>
              <CheckCircle2 size={17} />
              <span>
                AI responses should not replace evaluation by a qualified
                healthcare professional.
              </span>
            </div>

            <div>
              <CheckCircle2 size={17} />
              <span>
                Do not delay emergency care while waiting for an AI response.
              </span>
            </div>

            <div>
              <CheckCircle2 size={17} />
              <span>
                If symptoms are severe or rapidly worsening, seek immediate
                professional medical help.
              </span>
            </div>

          </div>

        </section>


        <div className="emergency-disclaimer">
          <AlertTriangle size={16} />

          <span>
            This page provides general safety information and is not a
            substitute for emergency medical services.
          </span>
        </div>

      </main>
    </div>
  );
}