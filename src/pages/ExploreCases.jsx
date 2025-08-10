import { useMemo, useState } from 'react';
const DUMMY_CASES = [
  {
    id: 'c-1001',
    title: 'Missing Passenger Reported Near Bahamas',
    summary: 'Passenger last seen on deck 11. CCTV review pending.',
    type: 'Missing Person',
    shipName: 'MV Horizon Star',
    location: 'Near Nassau, Bahamas',
    date: '2024-06-18',
    keywords: ['missing', 'passenger', 'bahamas', 'cctv'],
  },
  {
    id: 'c-1002',
    title: 'Overboard Incident – Night Watch',
    summary: 'Crew reported splash; search initiated within 10 minutes.',
    type: 'Overboard',
    shipName: 'Ocean Crest',
    location: 'Straits of Florida',
    date: '2024-11-03',
    keywords: ['overboard', 'night', 'crew', 'search'],
  },
  {
    id: 'c-1003',
    title: 'Theft Reported in Cabin Block C',
    summary: 'Multiple cabins reported missing valuables after shore day.',
    type: 'Theft or Tampering',
    shipName: 'Coral Voyager',
    location: 'Cozumel, Mexico',
    date: '2025-02-14',
    keywords: ['theft', 'cabin', 'valuables', 'tampering'],
  },
  {
    id: 'c-1004',
    title: 'Unexplained Injury in Atrium',
    summary: 'Guest treated onboard; cause unclear, witnesses sought.',
    type: 'Unexplained Injury or Illness',
    shipName: 'MV Horizon Star',
    location: 'Open Sea',
    date: '2025-04-29',
    keywords: ['injury', 'witness', 'medical'],
  },
  {
    id: 'c-1005',
    title: 'Crew Misconduct Allegation',
    summary: 'Alleged harassment reported to security; internal review.',
    type: 'Crew Misconduct',
    shipName: 'Ocean Crest',
    location: 'Key West, FL',
    date: '2025-01-07',
    keywords: ['crew', 'misconduct', 'harassment'],
  },
];

const TYPE_OPTIONS = [
  'All',
  'Anonymous Tip or Observation',
  'Assault or Harassment',
  'Crew Misconduct',
  'Distress Call or Signal',
  'Missing Person',
  'Overboard',
  'Passenger Misconduct',
  'Security / Surveillance Concern',
  'Suspicious Death',
  'Theft or Tampering',
  'Unexplained Injury or Illness',
  'Unusual Behavior or Event',
  'Other',
];

export default function ExploreCases() {
  const [q, setQ] = useState('');
  const [type, setType] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filtered = useMemo(() => {
    const norm = (s) => (s || '').toLowerCase().trim();

    return DUMMY_CASES.filter((item) => {
      const typeOk = type === 'All' || item.type === type;

      const query = norm(q);
      const keywordOk =
        !query ||
        norm(item.title).includes(query) ||
        norm(item.summary).includes(query) ||
        norm(item.shipName).includes(query) ||
        norm(item.location).includes(query) ||
        (item.keywords || []).some((k) => norm(k).includes(query));

      const d = new Date(item.date).getTime();
      const afterOk = startDate ? d >= new Date(startDate).getTime() : true;
      const beforeOk = endDate ? d <= new Date(endDate).getTime() : true;

      return typeOk && keywordOk && afterOk && beforeOk;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [q, type, startDate, endDate]);

  return (
    <div className="container">
      <h1 className="home-title" style={{ textAlign: 'center' }}>Explore Cases</h1>


      {/* Filters */}
      <div className="filters-row card">
        <div className="filter-item">
          <label htmlFor="q">Search keywords</label>
          <input
            id="q"
            type="text"
            placeholder="Search by title, ship, location, or keywords…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="type">Type</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="filter-dates">
          <div className="filter-item">
            <label htmlFor="startDate">Start date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <label htmlFor="endDate">End date</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Count */}
      <p className="results-meta">
        Showing <b>{filtered.length}</b> {filtered.length === 1 ? 'case' : 'cases'}
      </p>

      {/* Results */}
      <div className="case-grid">
        {filtered.map((c) => (
          <article key={c.id} className="card case-card">
            <div className="case-header">
              <h3 className="case-title">{c.title}</h3>
              <span className="badge">{c.type}</span>
            </div>

            <p className="case-summary">{c.summary}</p>

            <div className="case-meta">
              <span><b>Ship:</b> {c.shipName}</span>
              <span><b>Location:</b> {c.location}</span>
              <span><b>Date:</b> {new Date(c.date).toLocaleDateString()}</span>
            </div>

            {c.keywords?.length > 0 && (
              <div className="chip-row">
                {c.keywords.map((k) => (
                  <span className="chip" key={k}>#{k}</span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <p>No cases match your filters. Try removing a filter or changing the dates.</p>
        </div>
      )}
    </div>
  );
}