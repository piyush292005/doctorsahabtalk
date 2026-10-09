import React from 'react';
import ReactDOM from 'react-dom/client';

import Home from './pages/Home';
import Chat from './pages/Chat';
import Result from './pages/Result';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Doctors from './pages/Doctors';
import HospitalDetails from './pages/HospitalDetails';
import Profile from './pages/profile';
import Emergency from './pages/Emergency';

import './styles.css';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('doctorSahabToken');

  if (!token) {
    const currentPath = window.location.hash.slice(1) || '/';

    localStorage.setItem(
      'doctorSahabRedirect',
      currentPath
    );

    window.location.hash = '/login';

    return null;
  }

  return children;
}

function Router() {
  const [path, setPath] = React.useState(
    window.location.hash.slice(1) || '/'
  );

  React.useEffect(() => {
    const onHash = () => {
      setPath(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', onHash);

    return () => {
      window.removeEventListener('hashchange', onHash);
    };
  }, []);

  // Public pages
  if (path === '/login') return <Login />;
  if (path === '/register') return <Register />;
  if (path === '/emergency') return <Emergency />;
  if (path.startsWith('/hospital/')) return <HospitalDetails />;

  // Protected pages
  if (path === '/chat') {
    return (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    );
  }

  if (path === '/result') {
    return (
      <ProtectedRoute>
        <Result />
      </ProtectedRoute>
    );
  }

  if (path === '/history') {
    return (
      <ProtectedRoute>
        <History />
      </ProtectedRoute>
    );
  }

  if (path === '/profile') {
    return (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    );
  }

  if (path === '/doctors') {
    return (
      <ProtectedRoute>
        <Doctors />
      </ProtectedRoute>
    );
  }

  return <Home />;
}

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);