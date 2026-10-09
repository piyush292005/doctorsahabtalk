import React from 'react';
import {
  ArrowLeft,
  User,
  Mail,
  ShieldCheck,
  History,
  MessageCircle,
  LogOut
} from 'lucide-react';
import Logo from '../components/Logo';

export default function Profile() {
  const user = JSON.parse(
    localStorage.getItem('doctorSahabUser') || '{}'
  );

  const logout = () => {
    localStorage.removeItem('doctorSahabToken');
    localStorage.removeItem('doctorSahabUser');
    location.hash = '/login';
  };

  return (
    <div className="profile-page">

      <header className="profile-topbar">
        <Logo />

        <a href="#/chat" className="back-home">
          <ArrowLeft size={16} />
          Back to AI Chat
        </a>
      </header>

      <main className="profile-container">

        <section className="profile-hero">

          <div className="profile-avatar">
            <User size={38} />
          </div>

          <div>
            <div className="result-eyebrow">
              MY ACCOUNT
            </div>

            <h1>{user.name || 'User'}</h1>

            <p>
              Manage your DoctorSahab account and health conversations.
            </p>
          </div>

        </section>

        <section className="profile-grid">

          {/* Personal Information */}
          <div className="profile-card">

            <div className="profile-card-header">
              <div className="profile-card-icon">
                <User size={20} />
              </div>

              <div>
                <h2>Personal Information</h2>
                <p>Your account details</p>
              </div>
            </div>

            <div className="profile-info">

              <div className="profile-info-row">
                <span>Name</span>
                <strong>{user.name || 'Not available'}</strong>
              </div>

              <div className="profile-info-row">
                <span>Email</span>
                <strong>{user.email || 'Not available'}</strong>
              </div>

            </div>

          </div>


          {/* Account Security */}
          <div className="profile-card">

            <div className="profile-card-header">
              <div className="profile-card-icon">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h2>Account Security</h2>
                <p>Your account is protected</p>
              </div>
            </div>

            <div className="security-status">
              <ShieldCheck size={20} />

              <div>
                <strong>Account Active</strong>
                <p>
                  Your login session is protected using secure authentication.
                </p>
              </div>
            </div>

          </div>


          {/* Quick Actions */}
          <div className="profile-card profile-actions-card">

            <div className="profile-card-header">
              <div className="profile-card-icon">
                <MessageCircle size={20} />
              </div>

              <div>
                <h2>Quick Actions</h2>
                <p>Access your health tools</p>
              </div>
            </div>

            <div className="profile-actions">

              <a href="#/chat" className="profile-action-btn">
                <MessageCircle size={18} />
                Start AI Consultation
              </a>

              <a href="#/history" className="profile-action-btn">
                <History size={18} />
                View Health History
              </a>

            </div>

          </div>

        </section>


        {/* Logout */}
        <section className="profile-logout-card">

          <div>
            <h3>Sign out of DoctorSahab</h3>

            <p>
              You can log back in anytime to access your saved health history.
            </p>
          </div>

          <button
            className="profile-logout-btn"
            onClick={logout}
          >
            <LogOut size={17} />
            Logout
          </button>

        </section>


        <div className="profile-disclaimer">
          <ShieldCheck size={15} />

          <span>
            DoctorSahab Talk AI is a healthcare awareness platform.
            It does not replace a qualified medical professional.
          </span>
        </div>

      </main>
    </div>
  );
}