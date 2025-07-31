import React from 'react';

export default function SuccessOverlay({ badgeText, onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <h2>✅ Report Submitted!</h2>
        <p>Thank you for contributing.</p>
        <div style={styles.badge}>
          🎖 {badgeText || '1st Badge Earned!'}
        </div>
        <button onClick={onClose} style={styles.closeBtn}>Dismiss</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  box: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center',
    width: '300px'
  },
  badge: {
    marginTop: '1rem',
    fontSize: '1.2rem',
    color: '#006400',
    background: '#dfffdc',
    borderRadius: '8px',
    padding: '0.5rem'
  },
  closeBtn: {
    marginTop: '1.5rem',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer'
  }
};
