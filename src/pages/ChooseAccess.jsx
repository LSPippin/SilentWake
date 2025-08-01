import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ChooseAccess() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userMode');
  }, []);

  const handleSelect = (mode) => {
    localStorage.setItem('userMode', mode);

    if (mode === 'guest') {
      navigate('/Onboarding');
    } else if (mode === 'user') {
      navigate('/Login');
    } else if (mode === 'new') {
      navigate('/Signup');
    }
  };

  return (
    <div className="full-screen-center container fade-in">
      <h1>Choose Your Access</h1>
      <p>How would you like to use Silent Wake?</p>

      <div className="button-group">
        <button className="btn-secondary" onClick={() => handleSelect('guest')}>
          Continue as Guest
        </button>
        <button className="btn-secondary" onClick={() => handleSelect('user')}>
          Log In
        </button>
        <button className="btn-primary" onClick={() => handleSelect('new')}>
          Create Account
        </button>
      </div>
    </div>
  );
}
