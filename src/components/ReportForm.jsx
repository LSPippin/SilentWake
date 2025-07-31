import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ for redirection

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.incidentType) newErrors.incidentType = 'Incident type is required';
    if (!formData.shipName) newErrors.shipName = 'Ship name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Form Submitted:', formData); // ✅ simulate post

    // Reset
    setFormData({
      incidentType: '',
      shipName: '',
      location: '',
      date: '',
      notes: '',
      file: null,
    });
    setErrors({});

    // Redirect to confirmation or dashboard
    navigate('/welcome'); // or wherever you want
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Submit an Incident Report</h2>

      <label>
        Type of Incident *
        <input
          type="text"
          name="incidentType"
          value={formData.incidentType}
          onChange={handleChange}
        />
        {errors.incidentType && <p style={styles.error}>{errors.incidentType}</p>}
      </label>

      <label>
        Ship Name *
        <input
          type="text"
          name="shipName"
          value={formData.shipName}
          onChange={handleChange}
        />
        {errors.shipName && <p style={styles.error}>{errors.shipName}</p>}
      </label>

      <label>
        Location *
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <p style={styles.error}>{errors.location}</p>}
      </label>

      <label>
        Date of Incident *
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p style={styles.error}>{errors.date}</p>}
      </label>

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

      <button type="submit" style={styles.button}>Submit Report</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
  },
  button: {
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #333',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
};
