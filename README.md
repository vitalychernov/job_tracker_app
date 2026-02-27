# Job Application Tracker

A full-stack web application for tracking job applications. Add positions you've applied to, manage statuses, filter and search your pipeline, and monitor progress with a live stats dashboard.

**Live demo:** https://job-tracker-app-ashy.vercel.app

> The demo runs in frontend-only mode with preloaded sample data. Changes are visible during the session but reset on page refresh. To persist data, run the app locally with the backend.

---

## Features

- Add job applications with company, position, link, and notes
- Track status across four stages: Applied, Interview, Offer, Rejected
- Quick inline status updates via dropdown
- Search applications by company or position
- Filter by status
- Real-time statistics dashboard
- Responsive design

## Tech Stack

**Backend**
- Node.js + Express 5
- SQLite (better-sqlite3)
- CORS middleware

**Frontend**
- React 19 + Vite
- Vanilla CSS (Grid, Flexbox)

---

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/vitalychernov/job-tracker.git
cd job-tracker

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Run Locally

```bash
# Terminal 1 — backend (http://localhost:3001)
cd backend && npm start

# Terminal 2 — frontend (http://localhost:5173)
cd frontend && npm run dev
```

---

## Project Structure

```
job-tracker/
├── backend/
│   ├── server.js       # Express app + API routes
│   └── database.js     # SQLite setup and queries
└── frontend/
    └── src/
        ├── api.js                      # API client
        ├── App.jsx                     # Root component
        └── components/
            ├── ApplicationCard.jsx     # Single application row
            ├── ApplicationForm.jsx     # Add application form
            └── SearchFilter.jsx        # Search and status filter
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/applications` | Get all applications |
| POST | `/applications` | Create new application |
| PUT | `/applications/:id` | Update application |
| DELETE | `/applications/:id` | Delete application |
