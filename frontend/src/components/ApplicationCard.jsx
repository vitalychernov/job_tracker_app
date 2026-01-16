const STATUS_COLORS = {
  Applied: '#3498db',
  Interview: '#f39c12',
  Offer: '#27ae60',
  Rejected: '#e74c3c',
};

function ApplicationCard({ application, onEdit, onDelete, onStatusChange }) {
  const { id, company, position, link, status, notes, created_at } = application;

  return (
    <div className="application-card">
      <div className="card-header">
        <div className="card-title">
          <h3>{position}</h3>
          <span className="company">{company}</span>
        </div>
        <span className="status-badge" style={{ backgroundColor: STATUS_COLORS[status] }}>
          {status}
        </span>
      </div>

      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="job-link">
          View Job Posting
        </a>
      )}

      {notes && <p className="notes">{notes}</p>}

      <div className="card-footer">
        <span className="date">
          {new Date(created_at).toLocaleDateString()}
        </span>
        <div className="card-actions">
          <select
            value={status}
            onChange={(e) => onStatusChange(id, e.target.value)}
            className="status-select"
          >
            {['Applied', 'Interview', 'Offer', 'Rejected'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button onClick={() => onEdit(application)} className="btn-edit">Edit</button>
          <button onClick={() => onDelete(id)} className="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
