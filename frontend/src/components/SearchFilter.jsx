const STATUSES = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];

function SearchFilter({ search, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by company or position..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <div className="status-filters">
        {STATUSES.map((status) => (
          <button
            key={status}
            className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchFilter;
