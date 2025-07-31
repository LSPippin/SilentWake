import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessOverlay from './SuccessOverlay'; // Make sure you have this

export default function ReportForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    incidentType: '',
    shipName: '',
    location: '',
    date: '',
    notes: '',
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    const updatedErrors = validate({ ...formData, [name]: newValue });
    setErrors(updatedErrors);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validate = (data = formData) => {
    const newErrors = {};
    if (!data.incidentType.trim()) newErrors.incidentType = 'Incident type is required';
    if (!data.shipName.trim()) newErrors.shipName = 'Ship name is required';
    if (!data.location.trim()) newErrors.location = 'Location is required';
    if (!data.date) newErrors.date = 'Date is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({
        incidentType: true,
        shipName: true,
        location: true,
        date: true,
      });
      return;
    }

    const existingData = JSON.parse(localStorage.getItem('reports')) || [];
    const newSubmission = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem('reports', JSON.stringify([...existingData, newSubmission]));

    setErrors({});
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      navigate('/dashboard');
    }, 4000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Submit Incident Report</h2>

        {['incidentType', 'shipName', 'location', 'date'].map((field) => (
          <label key={field}>
            {field.replace(/([A-Z])/g, ' $1')} *
            <input
              type={field === 'date' ? 'date' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              style={touched[field] && errors[field] ? styles.inputError : {}}
            />
            {touched[field] && errors[field] && (
              <p style={styles.error}>{errors[field]}</p>
            )}
          </label>
        ))}

        <label>
          Additional Notes
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </label>

        <label>
          File Upload
          <input
            type="file"
            name="file"
            accept=".pdf,.jpg,.png"
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          disabled={Object.keys(validate()).length > 0}
          style={{
            ...styles.button,
            opacity: Object.keys(validate()).length > 0 ? 0.5 : 1,
            cursor: Object.keys(validate()).length > 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Submit Report
        </button>
      </form>

      {showOverlay && (
        <SuccessOverlay
          badgeText="🛟 Maritime Reporter Badge Earned"
          onClose={() => {
            setShowOverlay(false);
            navigate('/dashboard');
          }}
        />
      )}
    </>
  );
}

const styles = {
  form: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    fontFamily: 'Arial, sans-serif',
    color: '#222',
  },
  inputError: {
    border: '2px solid #cc0000',
    backgroundColor: '#fff0f0',
  },
  error: {
    color: '#cc0000',
    fontSize: '0.9rem',
    marginTop: '0.3rem',
  },
  button: {
    padding: '0.9rem',
    fontSize: '1.1rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#004080',
    color: '#fff',
    transition: 'background 0.3s ease',
  },
};


