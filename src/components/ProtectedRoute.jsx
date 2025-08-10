import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LogoImage from '../components/LogoImage.svg';


export default function SplashScreen() {
  const navigate = useNavigate();
  const { userMode } = useAuth();

  console.log("SplashScreen loaded");
  console.log("userMode is:", userMode);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Redirecting from SplashScreen...");
      if (userMode === 'user') {
        navigate('/Dashboard');
      } else {
        navigate('/Welcome');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, userMode]);

  return (
    <div className="splash-screen">
      <img src={LogoImage} alt="Silent Wake Logo" className="splash-logo" />
      <h1 className="splash-title">Silent Wake</h1>
      <p className="splash-subtitle">Tracking the silence. Empowering awareness.</p>
    </div>
  );
}
