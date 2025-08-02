import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const { logout } = useAuth();
  const userMode = localStorage.getItem('userMode');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('reports')) || [];
    setReports(stored);
  }, []);

  const handleDelete = (id) => {
    const updatedReports = reports.filter((r) => r.id !== id);
    setReports(updatedReports);
    localStorage.setItem('reports', JSON.stringify(updatedReports));
  };

  return (
    <div style={styles.container}>
      <h2 style={{ fontSize: '1.8rem', color: '#003366' }}>📊 Submitted Reports</h2>

      {userMode === 'guest' && (
        <p style={styles.guest}>Guest mode: reports are stored only in this browser.</p>
      )}

    <button className="dashboard-logout-btn" onClick={logout}>
        Logout
      </button>   

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