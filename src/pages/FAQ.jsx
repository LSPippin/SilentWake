import { useNavigate } from 'react-router-dom';

export function FAQ() {
  const navigate = useNavigate();

  return (
    <div className="container fade-in faq-page">
      <h1 className="page-title">Frequently Asked Questions</h1>

      <div className="faq-list">
        <div className="faq-item">
          <h3 className="faq-question">What is Silent Wake?</h3>
          <p className="faq-answer">A public platform for collecting and sharing information about maritime incidents.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Who can submit a report?</h3>
          <p className="faq-answer">Anyone. You can choose to report anonymously or as a registered user.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Is my data safe?</h3>
          <p className="faq-answer">Yes. You control what you share. Review our privacy policy for full details.</p>
        </div>
      </div>

      <div className="button-row">
        <button className="btn-secondary" onClick={() => navigate('/InfoCenter')}>
          ← Back to Info Center
        </button>
      </div>
    </div>
  );
}
