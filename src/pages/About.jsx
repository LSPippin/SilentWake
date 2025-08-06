import { useNavigate } from 'react-router-dom';

export function About() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-screen fade-in">
      <h1>About Silent Wake</h1>
      <p>
        Silent Wake is a citizen science project devoted to tracking missing persons and unexplained events on cruise ships and at sea. Our goal is to bring visibility to these often-overlooked cases by collecting, organizing, and analyzing stories, data, and patterns that may otherwise go unnoticed. By turning attention to what happens beyond the shoreline, we hope to support affected families and push for greater transparency and accountability in the maritime industry.
      </p>
      <div className="button-row">
        <button className="btn-secondary" onClick={() => navigate('/infocenter')}>
          ← Back to Info Center
        </button>
      </div>
    </div>
  );
}
