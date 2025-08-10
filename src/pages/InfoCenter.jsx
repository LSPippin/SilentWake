import { useNavigate } from 'react-router-dom';
import LogoImage from '../components/LogoImage.svg'; // Replace with your actual logo if different

export default function InfoCenter() {
  const navigate = useNavigate();

  const pages = [
    { label: "About Silent Wake", path: "/About" },
    { label: "Data Impact Report", path: "/Impact" },
    { label: "FAQs", path: "/Faq" },
    { label: "Legal & Privacy Policy", path: "/Legal" },
    { label: "Partner Organizations", path: "/Partners" },
  ];

  return (
    <div className="full-screen-center info-center fade-in">
      <img src={LogoImage} alt="Silent Wake Logo" className="info-logo" />
      <h1 className="info-title">Info Center</h1>

      <div className="button-group">
        {pages.map(({ label, path }) => (
          <button
            key={label}
            className="access-btn"
            onClick={() => navigate(path)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
