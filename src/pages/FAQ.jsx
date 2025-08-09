import { useNavigate } from 'react-router-dom';

export function FAQ() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-screen fade-in">
      <h1>Frequently Asked Questions</h1>

      <h3>What is Silent Wake?</h3>
      <p>A public platform for collecting and sharing information about maritime incidents.</p>

      <h3>Who can submit a report?</h3>
      <p>Anyone. You can choose to report anonymously or as a registered user.</p>

      <h3>Is my data safe?</h3>
      <p>Yes. You control what you share. Review our privacy policy for full details.</p>

      <div className="button-row">
        <button className="btn-secondary" onClick={() => navigate('/Infocenter')}>← Back to Info Center</button>
      </div>
    </div>
  );
}
