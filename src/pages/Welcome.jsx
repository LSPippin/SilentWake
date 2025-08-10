import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LogoImage from '../components/LogoImage.svg';

export default function Welcome() {
  const navigate = useNavigate();
  const { setUserMode } = useAuth();

  const handleSelect = (mode) => {
    if (mode === 'guest') {
      setUserMode('guest');
      navigate('/Onboarding');
    } else if (mode === 'user') {
      navigate('/Login');
    } else if (mode === 'new') {
      setUserMode('new');
      navigate('/CreateAccount');
    }
  };

  return (
    <div className="full-screen-center container fade-in">
      <h1>Welcome</h1>

      <div className="button-group">
        <button className="access-btn" onClick={() => handleSelect('guest')}>
          Continue as Guest
        </button>
        <button className="access-btn" onClick={() => handleSelect('user')}>
          Log In
        </button>
        <button className="access-btn" onClick={() => handleSelect('new')}>
          Create Account
        </button>
      </div>

      <img src={LogoImage} alt="Silent Wake Logo" className="welcome-logo" />

      {/* ✅ DEV MODE BUTTONS */}
      {process.env.NODE_ENV === 'development' && (
        <div className="dev-access">
          <p style={{ color: 'white', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
            🚧 Dev Mode:
          </p>
          <button className="access-btn" onClick={() => {
            localStorage.setItem('userMode', 'user');
            window.location.href = '/Dashboard';
          }}>
            Login as User
          </button>
          <button className="access-btn" onClick={() => {
            localStorage.setItem('userMode', 'guest');
            window.location.href = '/ExploreCases';
          }}>
            Continue as Guest
          </button>
          <button className="access-btn" onClick={() => {
            localStorage.removeItem('userMode');
            window.location.href = '/Welcome';
          }}>
            Reset Session
          </button>
        </div>
      )}
    </div>
  );
}
