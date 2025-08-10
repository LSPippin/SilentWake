import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LogoImage from '../components/LogoImage.svg';

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alias, setAlias] = useState('');
  const [interests, setInterests] = useState([]);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { setUserMode } = useAuth();

  const interestOptions = [
    'Case Research',
    'Connect with Others',
    'Cruise Incidents',
    'Family Support',
    'Missing Persons',
    'Raise Awareness',
    'Safety at Sea',
    'Share My Story'
  ];

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    if (!password.trim()) newErrors.password = 'Password is required.';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!alias.trim()) newErrors.alias = 'Alias is required.';
    if (!agreed) newErrors.agreed = 'You must agree to the privacy policy.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setUserMode('user');
    localStorage.setItem('userMode', 'user');

    navigate('/Dashboard');
  };

  return (
    <div className="create-account-wrapper fade-in">
      <img src={LogoImage} alt="Silent Wake Logo" className="welcome-logo" />
      <h1>Create Account</h1>

      {Object.keys(errors).length > 0 && (
        <div className="form-alert">
          Please fix the errors below and try again.
        </div>
      )}

      <form className="create-account-form" onSubmit={handleSubmit}>
        <label>
          <span className="label-text">Name <span className="required">*</span></span>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? 'input-error' : ''}
          />
          <small className="helper-text">This will be used for your account only, not shown publicly.</small>
          {errors.name && <p className="error-text">{errors.name}</p>}
        </label>

        <label>
          <span className="label-text">Email <span className="required">*</span></span>
          <input
            type="email"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </label>

        <label>
          <span className="label-text">Password <span className="required">*</span></span>
          <input
            type="password"
            placeholder="Create a Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? 'input-error' : ''}
          />
          <small className="helper-text">Use at least 8 characters with a mix of letters and numbers.</small>
          {errors.password && <p className="error-text">{errors.password}</p>}
        </label>

        <label>
          <span className="label-text">Confirm Password <span className="required">*</span></span>
          <input
            type="password"
            placeholder="Re-enter Your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errors.confirmPassword ? 'input-error' : ''}
          />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
        </label>

        <label>
          <span className="label-text">Choose Alias <span className="required">*</span></span>
          <input
            type="text"
            placeholder="Choose an Alias"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            className={errors.alias ? 'input-error' : ''}
          />
          <small className="helper-text">This will be your public display name.</small>
          {errors.alias && <p className="error-text">{errors.alias}</p>}
        </label>

        <label>
          <span className="label-text">Select Interest</span>
        </label>
        <div className="interests-group column">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              type="button"
              className={`interest-btn ${interests.includes(interest) ? 'selected' : ''}`}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </button>
          ))}
        </div>

        <div className="privacy-wrapper">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <span>
            I understand and agree to Silent Wake’s Privacy Policy and Terms of Use.
            <p>I know I can post anonymously, and I control what I share.</p>
          </span>
        </div>
        {errors.agreed && <p className="error-text">{errors.agreed}</p>}

        <button type="submit" className="create-account-btn">
          Create Account
        </button>
      </form>
    </div>
  );
}
