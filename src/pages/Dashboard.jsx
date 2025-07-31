import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('reports')) || [];
    setReports(stored);
  }, []);

  const handleDelete = (id) => {
    const updatedReports = reports.filter((r) => r.id !== id);
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  const userMode = localStorage.getItem('userMode');

  return (
    <div style={styles.container}>
      <h2 style={{ fontSize: '1.8rem', color: '#003366' }}>📊 Submitted Reports</h2>

      {userMode === 'guest' && (
        <p style={styles.guest}>Guest mode: reports are stored only in this browser.</p>
      )}

      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        reports.map((report) => (
          <div key={report.id} style={styles.card}>
            <strong style={{ fontSize: '1.2rem' }}>{report.incidentType}</strong>
            <p><b>Ship:</b> {report.shipName}</p>
            <p><b>Location:</b> {report.location}</p>
            <p><b>Date:</b> {report.date}</p>
            <p><b>Submitted:</b> {new Date(report.submittedAt).toLocaleString()}</p>
            <button style={styles.deleteBtn} onClick={() => handleDelete(report.id)}>
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
    color: '#111',
  },
  guest: {
    fontStyle: 'italic',
    color: '#444',
    marginBottom: '1rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1.2rem',
    marginBottom: '1.2rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    color: '#222',
    borderLeft: '6px solid #007bff',
  },
  deleteBtn: {
    marginTop: '0.8rem',
    backgroundColor: '#cc0000',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background 0.3s ease',
  },
};
