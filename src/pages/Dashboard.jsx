import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('reports')) || [];
    setReports(stored);
  }, []);

  const userMode = localStorage.getItem('userMode');

  return (
    <div style={styles.container}>
      <h2>📊 Submitted Reports</h2>
      {userMode === 'guest' && (
        <p style={styles.guest}>Guest mode: reports are stored only in this browser.</p>
      )}

      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        reports.map((report) => (
          <div key={report.id} style={styles.card}>
            <strong>{report.incidentType}</strong>
            <p><b>Ship:</b> {report.shipName}</p>
            <p><b>Location:</b> {report.location}</p>
            <p><b>Date:</b> {report.date}</p>
            <p><b>Submitted:</b> {new Date(report.submittedAt).toLocaleString()}</p>
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
};
