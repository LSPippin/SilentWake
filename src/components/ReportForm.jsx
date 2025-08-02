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
      navigate('/Dashboard');
    }, 4000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="report-form">
        <h2>Incident Report</h2>


        {['incidentType', 'shipName', 'location', 'date'].map((field) => (
  <label key={field}>
    <span className="label-text">
      {field
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())}
      <span className="required">*</span>
    </span>
    <input
      type={field === 'date' ? 'date' : 'text'}
      name={field}
      value={formData[field]}
      onChange={handleChange}
      onBlur={handleBlur}
      className={touched[field] && errors[field] ? 'input-error' : ''}
    />
    {touched[field] && errors[field] && (
      <p className="error-text">{errors[field]}</p>
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
         >

          Submit Report
        </button>
      </form>

      {showOverlay && (
        <SuccessOverlay
          badgeText="🛟 Maritime Reporter Badge Earned"
          onClose={() => {
            setShowOverlay(false);
            navigate('/Dashboard');
          }}
        />
      )}
    </>
  );
}


