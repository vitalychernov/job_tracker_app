const API_URL = 'http://localhost:3001';

export const getApplications = async () => {
  const res = await fetch(`${API_URL}/applications`);
  return res.json();
};

export const createApplication = async (data) => {
  const res = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateApplication = async (id, data) => {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteApplication = async (id) => {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
