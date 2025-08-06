import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoCenter.css';

export default function InfoCenter() {
  const navigate = useNavigate();

  return (
    <div className="info-center-container">
      <h1 className="info-title">Info Center</h1>
      <div className="info-button-row">
        <button className="info-btn" onClick={() => navigate('/about')}>About Silent Wake</button>
        <button className="info-btn" onClick={() => navigate('/data-impact')}>Data Impact Report</button>
        <button className="info-btn" onClick={() => navigate('/faq')}>FAQs</button>
        <button className="info-btn" onClick={() => navigate('/legal')}>Legal & Privacy Policy</button>
        <button className="info-btn" onClick={() => navigate('/partners')}>Partner Organizations</button>
      </div>
    </div>
  );
}
