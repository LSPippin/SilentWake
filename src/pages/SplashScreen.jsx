import LogoImage from "../components/LogoImage.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/Welcome");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-screen">
      <img src={LogoImage} alt="Silent Wake Logo" className="splash-logo" />
      <h1 className="splash-title">Silent Wake</h1>
      <p className="splash-subtitle">Tracking the silence. Empowering awareness.</p>
    </div>
  );
}