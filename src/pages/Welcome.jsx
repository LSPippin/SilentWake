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
      navigate('/Signup');
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
    </div>
  );
}
