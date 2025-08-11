import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="full-screen-center">
      <div className="card" style={{ textAlign: 'center' }}>
        <h1>🚢 Page Not Found</h1>
        <p>Looks like this page has sailed away or doesn’t exist.</p>
        <button
          className="btn-primary"
          onClick={() => navigate('/home')}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}