import { useEffect } from 'react';

export default function ProtectedRoute({ children, allowedModes }) {
  const userMode = localStorage.getItem('userMode') || '';
  const accessAllowed = allowedModes.includes(userMode);

  useEffect(() => {
    const root = document.getElementById('root');
    if (!accessAllowed) {
      document.body.classList.add('blurred-background');
    } else {
      document.body.classList.remove('blurred-background');
    }

    return () => document.body.classList.remove('blurred-background');
  }, [accessAllowed]);

  if (!accessAllowed) {
    return (
      <div className="access-popup">
        <div className="popup-content">
          <h2>🔒 Access Restricted</h2>
          <p>You must log in or create an account to view this page.</p>

          <div className="popup-buttons">
            <button className="btn-secondary" onClick={() => (window.location.href = '/login')}>
              Log In
            </button>
            <button className="btn-primary" onClick={() => (window.location.href = '/signup')}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
