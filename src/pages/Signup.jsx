import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    alias: '',
    interests: [],
    agreed: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email address';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.alias.trim()) newErrors.alias = 'Alias is required';
    if (!formData.agreed) newErrors.agreed = 'You must agree to the privacy policy';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Simulate successful signup
      navigate('/dashboard');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <label>Email *</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error-text">{errors.email}</p>}

      <label>Password *</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="error-text">{errors.password}</p>}

      <label>Confirm Password *</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

      <label>Alias *</label>
      <input
        type="text"
        name="alias"
        value={formData.alias}
        onChange={handleChange}
      />
      {errors.alias && <p className="error-text">{errors.alias}</p>}

      <label>Select Your Interests:</label>
      <div className="interests-container">
        {[ 'Case Research', 'Connect with others', 'Cruise Incidents', 'Family Support', 'Missing Persons', 'Raise Awareness', 'Safety at Sea', 'Share My Story', ].map((interest) => (
          <button
            type="button"
            key={interest}
            className={`interest-btn ${formData.interests.includes(interest) ? 'selected' : ''}`}
            onClick={() => toggleInterest(interest)}
          >
            {interest}
          </button>
        ))}
      </div>

      <label className="checkbox-label">
        <input
          type="checkbox"
          name="agreed"
          checked={formData.agreed}
          onChange={handleChange}
        />
        I understand and agree to Silent Wake’s privacy policy and terms of use. I know I can post anonymously, and I control what I share.
      </label>
      {errors.agreed && <p className="error-text">{errors.agreed}</p>}

      <button type="submit" className="btn-primary">Create Account</button>
    </form>
  );
}


