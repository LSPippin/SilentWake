import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INTEREST_OPTIONS = [
  'Case Research',
  'Connect with others',
  'Cruise Incidents',
  'Family Support',
  'Missing Persons',
  'Raise Awareness',
  'Safety at Sea',
  'Share My Story',
];

export default function Profile() {
  const navigate = useNavigate();

  // Try to identify current user (based on what we used earlier)
  const currentEmail = useMemo(
    () => localStorage.getItem('userEmail') || localStorage.getItem('currentUserEmail') || '',
    []
  );

  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('users') || '[]');
    } catch {
      return [];
    }
  });

  const currentUserIndex = useMemo(
    () => users.findIndex((u) => u.email === currentEmail),
    [users, currentEmail]
  );

  const currentUser = users[currentUserIndex] || {
    email: currentEmail || 'guest@local',
    alias: 'Guest',
    interests: [],
  };

  // Local editable state
  const [alias, setAlias] = useState(currentUser.alias || '');
  const [interests, setInterests] = useState(currentUser.interests || []);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setAlias(currentUser.alias || '');
    setInterests(currentUser.interests || []);
  }, [currentUser.alias, currentUser.interests]);

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(false);

    // Mock save: write back to localStorage users[]
    // If not signed-in or user not found, we’ll store a lightweight profile cache
    if (currentUserIndex >= 0) {
      const updated = [...users];
      updated[currentUserIndex] = { ...updated[currentUserIndex], alias, interests };
      localStorage.setItem('users', JSON.stringify(updated));
      setUsers(updated);
    } else {
      localStorage.setItem(
        'profileCache',
        JSON.stringify({ email: currentEmail || 'guest@local', alias, interests })
      );
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="container">
      <div className="profile-card card fade-in">
        <div className="profile-header">
          <h1>Account</h1>
          <button className="btn-secondary" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
        </div>

        {/* Read-only summary */}
        <section className="profile-section">
          <h2 className="profile-subtitle">Your Profile</h2>
          <div className="profile-grid">
            <div>
              <div className="profile-label">Alias</div>
              <div className="profile-value">{currentUser.alias || alias || '—'}</div>
            </div>
            <div>
              <div className="profile-label">Email</div>
              <div className="profile-value">{currentUser.email}</div>
            </div>
            <div className="profile-interests">
              <div className="profile-label">Interests</div>
              <div className="pill-row">
                {(currentUser.interests || []).length === 0 ? (
                  <span className="pill pill-muted">No interests selected</span>
                ) : (
                  currentUser.interests.map((i) => (
                    <span className="pill" key={i}>
                      {i}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mock edit form */}
        <section className="profile-section">
          <h2 className="profile-subtitle">Edit Info (Mock)</h2>

          <form className="report-form" onSubmit={handleSave}>
            <label>
              Alias
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Your display name"
              />
            </label>

            <div>
              <div className="label-text" style={{ marginBottom: '.4rem' }}>
                Select Your Interests
              </div>
              <div className="interest-buttons">
                {INTEREST_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    className={`interest-btn ${interests.includes(opt) ? 'selected' : ''}`}
                    onClick={() => toggleInterest(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="button-row">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
              <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
                Cancel
              </button>
            </div>

            {saved && <p className="profile-saved">Profile updated (mock)</p>}
          </form>
        </section>
      </div>
    </div>
  );
}
