import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessOverlay from './SuccessOverlay'; // optional overlay

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
    setErrors(validationErrors);

    // Mark all fields as touched so errors display
    setTouched({
      incidentType: true,
      shipName: true,
      location: true,
      date: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Submit the data
    const existingData = JSON.parse(localStorage.getItem('reports')) || [];
    const newSubmission = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem('reports', JSON.stringify([...existingData, newSubmission]));

    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Submit Incident Report</h2>

        {/* INCIDENT TYPE */}
        <label>
          Type of Incident *
          <select
            name="incidentType"
            value={formData.incidentType}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...styles.select,
              ...(touched.incidentType && errors.incidentType ? styles.inputError : {})
            }}
          >
            <option value="">Select an incident type</option>
            <option value="Anonymous Tip or Observation">Anonymous Tip or Observation</option>
            <option value="Assault or Harassment">Assault or Harassment</option>
            <option value="Crew Misconduct">Crew Misconduct</option>
            <option value="Distress Call or Signal">Distress Call or Signal</option>
            <option value="Missing Person">Missing Person</option>
            <option value="Overboard">Overboard</option>
            <option value="Passenger Misconduct">Passenger Misconduct</option>
            <option value="Security / Surveillance Concern">Security / Surveillance Concern</option>
            <option value="Suspicious Death">Suspicious Death</option>
            <option value="Theft or Tampering">Theft or Tampering</option>
            <option value="Unexplained Injury or Illness">Unexplained Injury or Illness</option>
            <option value="Unusual Behavior or Event">Unusual Behavior or Event</option>
            <option value="Other">Other</option>
          </select>
          {touched.incidentType && errors.incidentType && (
            <p style={styles.error}>{errors.incidentType}</p>
          )}
        </label>

        {/* SHIP NAME */}
        <label>
          Ship Name *
          <input
            type="text"
            name="shipName"
            value={formData.shipName}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...styles.input,
              ...(touched.shipName && errors.shipName ? styles.inputError : {})
            }}
          />
          {touched.shipName && errors.shipName && (
            <p style={styles.error}>{errors.shipName}</p>
          )}
        </label>

        {/* LOCATION */}
        <label>
          Location *
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...styles.input,
              ...(touched.location && errors.location ? styles.inputError : {})
            }}
          />
          {touched.location && errors.location && (
            <p style={styles.error}>{errors.location}</p>
          )}
        </label>

        {/* DATE */}
        <label>
          Date *
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              ...styles.input,
              ...(touched.date && errors.date ? styles.inputError : {})
            }}
          />
          {touched.date && errors.date && (
            <p style={styles.error}>{errors.date}</p>
          )}
        </label>

        {/* NOTES */}
        <label>
          Additional Notes
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            style={styles.textarea}
          />
        </label>

        {/* FILE */}
        <label>
          File Upload
          <input
            type="file"
            name="file"
            accept=".pdf,.jpg,.png"
            onChange={handleChange}
            style={styles.input}
          />
        </label>

        <button type="submit" style={styles.button}>
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
  input: {
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
  },
  textarea: {
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
    minHeight: '80px',
  },
  select: {
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    width: '100%',
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
    cursor: 'pointer',
  },
};



