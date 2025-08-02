import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  const navigate = useNavigate();

  const userMode = localStorage.getItem('userMode') || '';

  const setUserMode = (mode) => {
    localStorage.setItem('userMode', mode);
  };

  const logout = () => {
    localStorage.removeItem('userMode');
    navigate('/SplashScreen');
  };

  return { userMode, setUserMode, logout };
}
