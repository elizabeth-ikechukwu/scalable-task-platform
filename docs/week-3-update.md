# Week 3 — React Frontend, Nginx Reverse Proxy & Docker Compose

## Overview
This week I added a React frontend to the project and wired the full stack 
together using Docker Compose. The backend and frontend now run as separate 
containers on a shared Docker network, with Nginx acting as a reverse proxy 
between the browser and the backend API.

## What I Built

### React Frontend
- Scaffolded using Vite for fast builds
- Single-page app with full task management — add, complete, delete
- Live stats sidebar showing total, remaining, and completed tasks
- Progress bar that updates in real time
- Active and completed tasks displayed in separate groups
- Multi-stage Dockerfile — Vite builds the app, Nginx serves the static files

### Nginx Reverse Proxy
- All browser traffic hits Nginx on port 80
- Requests to `/api/*` are forwarded internally to the backend container
- The backend is never exposed publicly — only reachable inside the Docker network
- This is the production-correct pattern used at scale

### Docker Compose
- Orchestrates both backend and frontend as separate services
- Services communicate over a private bridge network called `task-network`
- Backend container has no public ports — fully internal
- Frontend container exposes port 80 only
- `depends_on` ensures backend starts before frontend
- `restart: unless-stopped` keeps containers running automatically

## Architecture

```
Browser
  │
  ▼
Nginx (port 80) ← only publicly exposed port
  │
  ├── GET /          → serves React static files
  │
  └── GET /api/*     → forwards to backend:3000
                              │
                              ▼
                     Express API (port 3000)
                     internal only, not public
```

## How to Run

```bash
docker compose up --build
```

Open http://localhost in your browser.

## Key Decisions

**Why Nginx as a reverse proxy?**
The backend should never be directly accessible from the browser in a 
production environment. Nginx sits in front and controls all routing. 
This is the same pattern used by companies at scale.

**Why a multi-stage Dockerfile for the frontend?**
Stage 1 uses Node.js to build the React app with Vite. Stage 2 copies 
only the compiled output into an Nginx image. The final image has no 
Node.js or source code — just static files and a web server. This keeps 
the image small (~25MB vs ~300MB) and reduces the attack surface.

**Why Docker Compose?**
Running `docker run` manually for each container does not scale. 
Docker Compose defines the entire stack in one file. One command starts 
everything, networking is automatic, and the configuration is version 
controlled.

## Stack This Week
| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Web server | Nginx |
| Backend | Node.js, Express |
| Orchestration | Docker Compose |
| Networking | Docker bridge network |

## Challenges & Lessons
- Learned the difference between a container's internal port and an 
  exposed port
- Understood why `http://backend:3000` works inside Docker Compose — 
  containers resolve each other by service name via internal DNS
- Fixed a build error by switching from `npm ci` to `npm install` since 
  no lock file existed yet — will generate one properly in Week 4

## Next Week — Week 4
Add a CI pipeline with GitHub Actions that automatically builds and tests 
the project on every push to main.

---
*Scalable Task Platform — built in public, one week at a time.*  
*By Ikechukwu Elizabeth Nkwo — DevOps & Cloud Engineer*