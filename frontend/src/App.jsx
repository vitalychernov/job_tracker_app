import { useState, useEffect } from 'react';
import ApplicationForm from './components/ApplicationForm';
import ApplicationCard from './components/ApplicationCard';
import SearchFilter from './components/SearchFilter';
import { getApplications, createApplication, updateApplication, deleteApplication } from './api';
import './App.css';

const DEMO_DATA = [
  { id: 1, company: 'Google', position: 'Frontend Developer', status: 'Interview', link: 'https://careers.google.com', notes: 'Technical interview scheduled', created_at: '2024-01-15' },
  { id: 2, company: 'Microsoft', position: 'React Developer', status: 'Applied', link: 'https://careers.microsoft.com', notes: '', created_at: '2024-01-14' },
  { id: 3, company: 'Amazon', position: 'Software Engineer', status: 'Offer', link: '', notes: 'Received offer!', created_at: '2024-01-10' },
  { id: 4, company: 'Meta', position: 'Full Stack Developer', status: 'Rejected', link: '', notes: '', created_at: '2024-01-08' },
  { id: 5, company: 'Apple', position: 'Senior Developer', status: 'Applied', link: 'https://apple.com/careers', notes: 'Referred by friend', created_at: '2024-01-12' },
];

function App() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingApp, setEditingApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      console.error('Backend unavailable, using demo data');
      setApplications(DEMO_DATA);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    if (isDemo) {
      const newApp = { ...data, id: Date.now(), created_at: new Date().toISOString() };
      setApplications([newApp, ...applications]);
      return;
    }
    try {
      const newApp = await createApplication(data);
      setApplications([newApp, ...applications]);
    } catch (error) {
      console.error('Failed to create application:', error);
    }
  };

  const handleUpdate = async (data) => {
    if (isDemo) {
      setApplications(applications.map((app) => (app.id === editingApp.id ? { ...app, ...data } : app)));
      setEditingApp(null);
      return;
    }
    try {
      const updated = await updateApplication(editingApp.id, data);
      setApplications(applications.map((app) => (app.id === editingApp.id ? updated : app)));
      setEditingApp(null);
    } catch (error) {
      console.error('Failed to update application:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    if (isDemo) {
      setApplications(applications.filter((app) => app.id !== id));
      return;
    }
    try {
      await deleteApplication(id);
      setApplications(applications.filter((app) => app.id !== id));
    } catch (error) {
      console.error('Failed to delete application:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    if (isDemo) {
      setApplications(applications.map((app) => (app.id === id ? { ...app, status } : app)));
      return;
    }
    try {
      const updated = await updateApplication(id, { status });
      setApplications(applications.map((app) => (app.id === id ? updated : app)));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.position.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === 'Applied').length,
    interview: applications.filter((a) => a.status === 'Interview').length,
    offer: applications.filter((a) => a.status === 'Offer').length,
    rejected: applications.filter((a) => a.status === 'Rejected').length,
  };

  return (
    <div className="app">
      <header>
        <h1>Job Application Tracker</h1>
        <div className="stats">
          <span>Total: {stats.total}</span>
          <span>Applied: {stats.applied}</span>
          <span>Interview: {stats.interview}</span>
          <span>Offer: {stats.offer}</span>
          <span>Rejected: {stats.rejected}</span>
        </div>
      </header>

      <main>
        <section className="form-section">
          <h2>{editingApp ? 'Edit Application' : 'Add New Application'}</h2>
          <ApplicationForm
            onSubmit={editingApp ? handleUpdate : handleCreate}
            initialData={editingApp}
            onCancel={editingApp ? () => setEditingApp(null) : null}
          />
        </section>

        <section className="list-section">
          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />

          {loading ? (
            <p className="loading">Loading...</p>
          ) : filteredApplications.length === 0 ? (
            <p className="empty">No applications found</p>
          ) : (
            <div className="applications-grid">
              {filteredApplications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onEdit={setEditingApp}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
