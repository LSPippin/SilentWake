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
  },
  guest: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: '1rem',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
};
