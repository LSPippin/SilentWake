import { useNavigate } from 'react-router-dom';
import LogoImage from '../components/LogoImage.svg';

export default function Home() {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/Dashboard' },
    { label: 'Community Forum', path: '/Forum' },
    { label: 'Explore Cases', path: '/ExploreCases' },
    { label: 'Info Center', path: '/InfoCenter' },
    { label: 'Map View', path: '/MapView' },
    { label: 'Profile / Account', path: '/Profile' },
    { label: 'Submit a Report', path: '/SubmitReport' },
  ];

  return (
    <div className="home-screen full-screen-center fade-in">
      <img src={LogoImage} alt="Silent Wake Logo" className="home-logo" />
      <h1 className="home-title">Silent Wake</h1>

      <div className="home-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="home-btn"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
