import React from 'react';

export default function SuccessOverlay({ badgeText, onClose }) {
  return (
    <div className="success-overlay">
      <div className="success-box">
        <h2>✅ Report Submitted!</h2>
        <p>Thank you for contributing.</p>
        <div className="success-badge">
          🎖 {badgeText || '1st Badge Earned!'}
        </div>
        <button className="btn-primary" onClick={onClose}>Dismiss</button>
      </div>
    </div>
  );
}