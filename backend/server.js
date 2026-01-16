const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET all applications
app.get('/applications', (req, res) => {
  try {
    const applications = db.prepare('SELECT * FROM applications ORDER BY created_at DESC').all();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create application
app.post('/applications', (req, res) => {
  const { company, position, link, status, notes } = req.body;

  if (!company || !position) {
    return res.status(400).json({ error: 'Company and position are required' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO applications (company, position, link, status, notes)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(company, position, link || null, status || 'Applied', notes || null);

    const newApplication = db.prepare('SELECT * FROM applications WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update application
app.put('/applications/:id', (req, res) => {
  const { id } = req.params;
  const { company, position, link, status, notes } = req.body;

  try {
    const existing = db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const stmt = db.prepare(`
      UPDATE applications
      SET company = ?, position = ?, link = ?, status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(
      company || existing.company,
      position || existing.position,
      link !== undefined ? link : existing.link,
      status || existing.status,
      notes !== undefined ? notes : existing.notes,
      id
    );

    const updated = db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE application
app.delete('/applications/:id', (req, res) => {
  const { id } = req.params;

  try {
    const existing = db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Application not found' });
    }

    db.prepare('DELETE FROM applications WHERE id = ?').run(id);
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
