import { useNavigate } from 'react-router-dom';

export function Impact() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-screen fade-in">
      <h1>Data Impact Report</h1>
      <p>
        Since our launch, Silent Wake has helped surface over 200 unreported incidents and assisted
        dozens of families in seeking answers. Our reports have been used by media, legal teams,
        and investigative researchers to create change.
      </p>
      <div className="button-row">
        <button className="btn-secondary" onClick={() => navigate('/infocenter')}>← Back to Info Center</button>
      </div>
    </div>
  );
}
