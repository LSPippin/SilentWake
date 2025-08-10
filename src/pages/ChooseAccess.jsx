import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ChooseAccess() {
  const navigate = useNavigate();
  const {setUserMode} = useAuth();

  const handleSelect = (mode) => {
    setUserMode(mode);

    if (mode === 'guest') {
      navigate('/Onboarding');
    } else if (mode === 'user') {
      navigate('/Login');
    } else if (mode === 'new') {
      navigate('/CreateAccount');
    }
  };

  return (
    <div className="full-screen-center container fade-in">
      <h1>Choose Your Access</h1>
      <p>How would you like to use Silent Wake?</p>

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

    </div>
  );
}
