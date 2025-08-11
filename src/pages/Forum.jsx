import { useEffect, useMemo, useState } from 'react';

const SAMPLE_THREADS = [
  {
    id: 't-1001',
    category: 'Verification',
    title: 'Seeking verification for report near Cozumel (Feb 14, 2025)',
    authorAlias: 'SeaWatcher',
    createdAt: '2025-02-16T14:00:00Z',
    posts: [
      { id: 'p-1', authorAlias: 'SeaWatcher', body: 'Looking for anyone on Coral Voyager who remembers cabin block C incidents after shore day.', createdAt: '2025-02-16T14:05:00Z' },
      { id: 'p-2', authorAlias: 'HarborLight', body: 'I was on that sailing. Security took statements late evening. I can share notes.', createdAt: '2025-02-16T15:21:00Z' },
    ],
  },
  {
    id: 't-1002',
    category: 'Emotional Support',
    title: 'Coping after a loved one goes missing at sea',
    authorAlias: 'AnchoredHeart',
    createdAt: '2025-03-02T10:00:00Z',
    posts: [
      { id: 'p-1', authorAlias: 'AnchoredHeart', body: 'Starting this thread to share resources and hold space for each other.', createdAt: '2025-03-02T10:02:00Z' },
      { id: 'p-2', authorAlias: 'KindCurrent', body: 'The Families for Truth at Sea group was helpful for me. DMs open.', createdAt: '2025-03-02T11:47:00Z' },
    ],
  },
  {
    id: 't-1003',
    category: 'Discussions',
    title: 'What data should an ideal incident map display?',
    authorAlias: 'MapNerd',
    createdAt: '2025-04-11T09:30:00Z',
    posts: [
      { id: 'p-1', authorAlias: 'MapNerd', body: 'Thinking heatmaps + time sliders + ship overlays. What else?', createdAt: '2025-04-11T09:33:00Z' },
      { id: 'p-2', authorAlias: 'SignalFlare', body: 'Port-of-call filters and weather layers would help patterns pop.', createdAt: '2025-04-11T10:10:00Z' },
    ],
  },
];

export default function Forum() {
  // allow read for all, restrict posting to signed-in (not 'guest')
  const userMode = useMemo(() => localStorage.getItem('userMode') || 'guest', []);
  const users = useMemo(() => JSON.parse(localStorage.getItem('users') || '[]'), []);
  const currentEmail = useMemo(() => localStorage.getItem('userEmail') || '', []);
  const currentUser = users.find((u) => u.email === currentEmail);
  const currentAlias = currentUser?.alias || 'Member';
  const canPost = userMode !== 'guest' && !!currentEmail;

  // seed/persist threads in localStorage
  const [threads, setThreads] = useState(() => {
    const saved = localStorage.getItem('forumThreads');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('forumThreads', JSON.stringify(SAMPLE_THREADS));
    return SAMPLE_THREADS;
  });

  const [selectedId, setSelectedId] = useState(threads[0]?.id || null);
  const selectedThread = threads.find((t) => t.id === selectedId);
  const [newComment, setNewComment] = useState('');

  const persist = (next) => {
    setThreads(next);
    localStorage.setItem('forumThreads', JSON.stringify(next));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!canPost || !newComment.trim() || !selectedThread) return;
    const comment = {
      id: `p-${Date.now()}`,
      authorAlias: currentAlias,
      body: newComment.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = threads.map((t) =>
      t.id === selectedThread.id ? { ...t, posts: [...t.posts, comment] } : t
    );
    persist(next);
    setNewComment('');
  };

  useEffect(() => {
    if (selectedId && !threads.some((t) => t.id === selectedId)) {
      setSelectedId(threads[0]?.id || null);
    }
  }, [threads, selectedId]);

  return (
    <div className="container">
      <h1 className="home-title">Community Forum</h1>

      <div className="forum-grid">
        {/* Left: thread list */}
        <aside className="card forum-list">
          <div className="forum-list-header">
            <span className="forum-list-title">Threads</span>
          </div>
          <ul className="forum-ul">
            {threads.map((t) => (
              <li key={t.id}>
                <button
                  className={`forum-thread-btn ${t.id === selectedId ? 'active' : ''}`}
                  onClick={() => setSelectedId(t.id)}
                >
                  <span className="forum-thread-cat">{t.category}</span>
                  <span className="forum-thread-title">{t.title}</span>
                  <span className="forum-thread-meta">
                    by {t.authorAlias} • {new Date(t.createdAt).toLocaleDateString()}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right: thread detail */}
        <section className="card forum-detail">
          {selectedThread ? (
            <>
              <header className="forum-detail-header">
                <div>
                  <h2 className="forum-detail-title">{selectedThread.title}</h2>
                  <div className="forum-detail-meta">
                    <span className="badge">{selectedThread.category}</span>
                    <span>Started by {selectedThread.authorAlias}</span>
                    <span>• {new Date(selectedThread.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </header>

              <div className="forum-posts">
                {selectedThread.posts.map((p) => (
                  <article key={p.id} className="forum-post">
                    <div className="forum-post-meta">
                      <span className="forum-post-author">{p.authorAlias}</span>
                      <span className="forum-post-date">
                        {new Date(p.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="forum-post-body">{p.body}</p>
                  </article>
                ))}

                {selectedThread.posts.length === 0 && (
                  <p className="forum-empty">No comments yet. Be the first to contribute.</p>
                )}
              </div>

              {/* Mock comment box (restricted to users) */}
              <div className="forum-reply card">
                <h3 className="forum-reply-title">Add a comment</h3>
                {canPost ? (
                  <form className="report-form" onSubmit={handleAddComment}>
                    <label>
                      Comment
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share information, resources, or support…"
                      />
                    </label>
                    <div className="button-row">
                      <button type="submit" className="btn-primary" disabled={!newComment.trim()}>
                        Post Comment
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="forum-guest-note">
                    <p>You must be signed in to post. Guests can read threads but cannot comment.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p>Select a thread from the list to view its discussion.</p>
          )}
        </section>
      </div>
    </div>
  );
}
