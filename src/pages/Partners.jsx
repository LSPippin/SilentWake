import { useNavigate } from 'react-router-dom';

export function Partners() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-screen fade-in">
      <h1>Partner Organizations</h1>
      <ul>
        <li>Maritime Justice Alliance</li>
        <li>Ocean Safety Coalition</li>
        <li>Families for Truth at Sea</li>
      </ul>
      <div className="button-row">
        <button className="btn-secondary" onClick={() => navigate('/infocenter')}>← Back to Info Center</button>
      </div>
    </div>
  );
}
