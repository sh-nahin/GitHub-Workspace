import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Modal } from '../../components/common/Modal';
import { useCollections } from '../../context/CollectionsContext';
import { useNotifications } from '../../context/NotificationsContext';

export function Collections() {
  const {
    collections,
    createCollection,
    deleteCollection,
    removeRepoFromCollection,
  } = useCollections();
  const { notify } = useNotifications();

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  function handleCreate(e) {
    e.preventDefault();
    if (!name.trim()) return;
    createCollection(name.trim());
    notify('Collection created', `"${name.trim()}" collection was created`);
    setName('');
    setModalOpen(false);
  }

  return (
    <AppLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Collections</h1>
        <button className="btn" onClick={() => setModalOpen(true)}>
          + New Collection
        </button>
      </div>

      {collections.length === 0 && (
        <p className="muted">
          No collections yet — try "Frontend Repositories" or "Machine
          Learning".
        </p>
      )}

      <div className="card-grid">
        {collections.map((c) => (
          <div key={c.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{c.name}</strong>
              <button
                className="btn btn-secondary"
                onClick={() => deleteCollection(c.id)}
              >
                Delete
              </button>
            </div>
            {c.repos.length === 0 && (
              <p className="muted">
                No repos yet. Add repos from a repository's page.
              </p>
            )}
            {c.repos.map((repo) => (
              <p key={repo}>
                <Link to={`/repos/${repo}`}>{repo}</Link>{' '}
                <button
                  className="btn btn-secondary"
                  onClick={() => removeRepoFromCollection(c.id, repo)}
                >
                  Remove
                </button>
              </p>
            ))}
          </div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Collection"
      >
        <form onSubmit={handleCreate} className="form" style={{ margin: 0 }}>
          <input
            placeholder="Collection name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <button className="btn" type="submit">
            Create
          </button>
        </form>
      </Modal>
    </AppLayout>
  );
}
