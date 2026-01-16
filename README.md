# Job Application Tracker

A fullstack web application for tracking job applications. Keep track of companies you've applied to, manage application statuses, and add notes.

## Features

- Add job applications with company name, position, link, and notes
- Track application status (Applied, Interview, Offer, Rejected)
- Quick status updates with dropdown selector
- Search applications by company or position
- Filter by status
- Real-time statistics dashboard
- Responsive design

## Tech Stack

**Frontend:**
- React 19
- Vite
- CSS3 (Grid, Flexbox)

**Backend:**
- Node.js
- Express 5
- SQLite (better-sqlite3)

## Getting Started

### Prerequisites
- Node.js 18+

### Installation

1. Clone the repository
```bash
git clone https://github.com/vitalychernov/job-tracker.git
cd job-tracker
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running Locally

1. Start the backend server (port 3001)
```bash
cd backend
npm start
```

2. Start the frontend dev server (port 5173)
```bash
cd frontend
npm run dev
```

3. Open http://localhost:5173 in your browser

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /applications | Get all applications |
| POST | /applications | Create new application |
| PUT | /applications/:id | Update application |
| DELETE | /applications/:id | Delete application |

## License

MIT
