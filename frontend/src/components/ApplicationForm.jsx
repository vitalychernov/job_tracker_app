import { useState } from 'react';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];

function ApplicationForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState(initialData || {
    company: '',
    position: '',
    link: '',
    status: 'Applied',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.position) return;
    onSubmit(formData);
    if (!initialData) {
      setFormData({ company: '', position: '', link: '', status: 'Applied', notes: '' });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="application-form">
      <div className="form-row">
        <input
          type="text"
          name="company"
          placeholder="Company name *"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="position"
          placeholder="Position *"
          value={formData.position}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-row">
        <input
          type="url"
          name="link"
          placeholder="Job link (optional)"
          value={formData.link}
          onChange={handleChange}
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={formData.notes}
        onChange={handleChange}
        rows={3}
      />
      <div className="form-actions">
        <button type="submit">{initialData ? 'Update' : 'Add Application'}</button>
        {onCancel && <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>}
      </div>
    </form>
  );
}

export default ApplicationForm;
