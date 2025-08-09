import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

export default function ProtectedRoute({ children, guestAllowed = false }) {
  const { userMode } = useAuth();
  const accessAllowed = guestAllowed || userMode === 'user';

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;
    if (!accessAllowed) root.classList.add('blurred-background');
    else root.classList.remove('blurred-background');

    return () => root.classList.remove('blurred-background');
  }, [accessAllowed]);

  if (!accessAllowed) {
    return (
      <div className="access-popup">
        <div className="popup-content">
          <h2>🔒 Access Restricted</h2>
          <p>You must log in or create an account to view this page.</p>

          <div className="popup-buttons">
            <button className="btn-secondary" onClick={() => (window.location.href = '/Login')}>
              Log In
            </button>
            <button className="btn-primary" onClick={() => (window.location.href = '/Signup')}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
