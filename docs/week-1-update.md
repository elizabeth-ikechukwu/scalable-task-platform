# Week 1 — Project Foundation and Backend Setup

## What I Built
A production-structured REST API backend for the Scalable Task Platform using Node.js and Express.

## Technical Decisions
- Used dotenv for environment variable management instead of hardcoding values
- Structured error handling with a 404 handler and global error handler
- In-memory task store as a foundation before database integration in later weeks

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | / | API health check |
| GET | /health | Returns status and uptime |
| GET | /tasks | Returns all tasks |
| POST | /tasks | Creates a new task |
| PATCH | /tasks/:id | Toggles task complete or incomplete |
| DELETE | /tasks/:id | Deletes a task |

## Project Structure
```
scalable-task-platform/
├── app/
│   └── backend/
│       ├── server.js
│       ├── package.json
│       ├── .env.example
│       └── .gitignore
└── docs/
    └── week-1-update.md
```

## Outcome
- Node.js and Express backend running on port 3000
- Full CRUD API validated with Postman
- Environment variables managed with dotenv
- Branch based Git workflow established
- Code pushed and merged via pull request on GitHub

## Next Step
Week 2: Containerize the backend with Docker