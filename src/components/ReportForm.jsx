import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessOverlay from './SuccessOverlay';

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
      navigate('/Dashboard');
    }, 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="report-form">
        <h2>Submit Incident Report</h2>

        {/* INCIDENT TYPE */}
        <label>
          Type of Incident <span className = "required">*</span>
          <select
            name="incidentType"
            value={formData.incidentType}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.incidentType && errors.incidentType ? 'input-error' : ''}
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
          <p className="error-text">{errors.incidentType}</p>
        )}
        </label>

        {/* SHIP NAME */}
        <label>
          Ship Name <span className="required">*</span>
          <input
            type="text"
            name="shipName"
            value={formData.shipName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.shipName && errors.shipName ? 'input-error' : ''}
          />
        {touched.shipName && errors.shipName && (
          <p className="error-text">{errors.shipName}</p>
        )}
        </label>

        {/* LOCATION */}
        <label>
          Location <span className="required">*</span>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.location && errors.location ? 'input-error' : ''}
        />
        {touched.location && errors.location && (
          <p className="error-text">{errors.location}</p>
        )}
      </label>

        {/* DATE */}
      <label>
        Date <span className="required">*</span>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.date && errors.date ? 'input-error' : ''}
        />
      {touched.date && errors.date && (
        <p className="error-text">{errors.date}</p>
      )}
      </label>

        {/* NOTES */}
      <label>
        Additional Notes
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
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
          />
      </label>
      <button type="submit" className="btn-primary">
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
  )
}