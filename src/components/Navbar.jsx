import React from 'react';
import { ArrowRight, Menu, X, User } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(
    !!localStorage.getItem('doctorSahabToken')
  );

  const close = () => setMenuOpen(false);

  React.useEffect(() => {
    const checkAuth = () => {
      setLoggedIn(!!localStorage.getItem('doctorSahabToken'));
    };

    window.addEventListener('storage', checkAuth);
    window.addEventListener('hashchange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('hashchange', checkAuth);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="nav-inner">

        <Logo />

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#/" onClick={close}>Home</a>
          <a href="#features" onClick={close}>Features</a>
          <a href="#about" onClick={close}>About</a>
          <a href="#contact" onClick={close}>Contact</a>
            <a href="#/emergency" onClick={close} className="emergency-nav-link">
  🚨 Emergency
</a>

          {loggedIn && (
            <>
              <a href="#/chat" onClick={close}>AI Chat</a>
              <a href="#/history" onClick={close}>History</a>
            
              <a href="#/profile" onClick={close}>Profile</a>
            </>
          )}
        </nav>

        <div className="nav-actions">

          {loggedIn ? (
            <a
              className="profile-nav-btn"
              href="#/profile"
            >
              <User size={16} />
              Profile
            </a>
          ) : (
            <a className="login-btn" href="#/login">
              Login
            </a>
          )}

          <a
            className="primary-btn small"
            href="#/chat"
          >
            Get Started
            <ArrowRight size={15} />
          </a>

        </div>

      </div>
    </header>
  );
}