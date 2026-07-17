import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppLayout } from '../../components/layout/AppLayout';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Card } from '../../components/common/Card';
import { Tabs } from '../../components/common/Tabs';
import { Table } from '../../components/common/Table';
import { useFetch } from '../../hooks/useFetch';
import { useActivity } from '../../context/ActivityContext';
import { useCollections } from '../../context/CollectionsContext';
import { useNotifications } from '../../context/NotificationsContext';
import { formatDate } from '../../utils/formatDate';
import {
  getRepo,
  getRepoContributors,
  getRepoIssues,
  getRepoBranches,
  getRepoCommits,
} from '../../services/githubApi';

const TABS = ['Overview', 'Contributors', 'Issues', 'Branches', 'Commits'];

export function RepositoryDetails() {
  // Route: /repos/:owner/:repo — two route params
  const { owner, repo } = useParams();
  const { logRepoView } = useActivity();
  const { collections, addRepoToCollection } = useCollections();
  const { notify } = useNotifications();
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedCollectionId, setSelectedCollectionId] = useState('');

  const { data: repoData, loading, error } = useFetch(
    () => getRepo(owner, repo),
    [owner, repo]
  );
  const { data: contributors } = useFetch(
    () => getRepoContributors(owner, repo),
    [owner, repo]
  );
  const { data: issues } = useFetch(
    () => getRepoIssues(owner, repo),
    [owner, repo]
  );
  const { data: branches } = useFetch(
    () => getRepoBranches(owner, repo),
    [owner, repo]
  );
  const { data: commits } = useFetch(
    () => getRepoCommits(owner, repo),
    [owner, repo]
  );

  useEffect(() => {
    if (repoData) logRepoView(`${owner}/${repo}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repoData]);

  if (loading) return <AppLayout><Loader label="Loading repository..." /></AppLayout>;
  if (error) return <AppLayout><ErrorMessage message={error} /></AppLayout>;
  if (!repoData) return null;

  function handleAddToCollection() {
    if (!selectedCollectionId) return;
    addRepoToCollection(selectedCollectionId, repoData.full_name);
    const collectionName = collections.find((c) => c.id === selectedCollectionId)?.name;
    notify('Repository added', `${repoData.full_name} was added to "${collectionName}"`);
  }

  return (
    <AppLayout>
      <Card>
        <h2>{repoData.full_name}</h2>
        <p className="muted">{repoData.description}</p>
        <p className="muted">
          ⭐ {repoData.stargazers_count} stars · 🍴 {repoData.forks_count} forks
          · 🐛 {repoData.open_issues_count} issues ·{' '}
          {repoData.language || 'Unknown language'}
        </p>

        {collections.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <select
              value={selectedCollectionId}
              onChange={(e) => setSelectedCollectionId(e.target.value)}
            >
              <option value="">Add to collection...</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <button className="btn btn-secondary" onClick={handleAddToCollection}>
              Add
            </button>
          </div>
        )}
      </Card>

      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'Overview' && (
        <Card>
          <p>Default branch: {repoData.default_branch}</p>
          <p>Created: {formatDate(repoData.created_at)}</p>
          <p>Last updated: {formatDate(repoData.updated_at)}</p>
          <p>License: {repoData.license?.name || 'None'}</p>
        </Card>
      )}

      {activeTab === 'Contributors' && (
        <Table
          columns={[
            { key: 'login', label: 'Username' },
            { key: 'contributions', label: 'Contributions' },
          ]}
          rows={contributors}
          emptyMessage="No contributors found."
        />
      )}

      {activeTab === 'Issues' && (
        <Table
          columns={[
            { key: 'number', label: '#' },
            { key: 'title', label: 'Title' },
            { key: 'state', label: 'State' },
          ]}
          rows={issues}
          emptyMessage="No open issues."
        />
      )}

      {activeTab === 'Branches' && (
        <Table
          columns={[{ key: 'name', label: 'Branch name' }]}
          rows={branches}
          emptyMessage="No branches found."
        />
      )}

      {activeTab === 'Commits' && (
        <Table
          columns={[
            {
              key: 'message',
              label: 'Message',
              render: (row) => row.commit?.message?.split('\n')[0],
            },
            {
              key: 'author',
              label: 'Author',
              render: (row) => row.commit?.author?.name,
            },
            {
              key: 'date',
              label: 'Date',
              render: (row) => formatDate(row.commit?.author?.date),
            },
          ]}
          rows={commits}
          emptyMessage="No commits found."
        />
      )}
    </AppLayout>
  );
}
