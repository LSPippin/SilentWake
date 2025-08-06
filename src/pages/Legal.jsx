import { useNavigate } from 'react-router-dom';

export function Legal() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-screen fade-in">
      <h1>Legal & Privacy Policy</h1>
      <p>
        By using Silent Wake, you agree to our terms of use and privacy practices. We do not collect
        identifying information unless you choose to provide it. All data is stored securely and used
        solely for the purposes outlined in our mission.
      </p>
      <div className="button-row">
        <button className="btn-secondary" onClick={() => navigate('/infocenter')}>← Back to Info Center</button>
      </div>
    </div>
  );
}
