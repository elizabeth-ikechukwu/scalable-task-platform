# Week 2: Dockerizing the Backend

## What I Did
Containerized the Node.js backend using Docker. Wrote a Dockerfile 
from scratch, built the image locally, ran the container, and verified 
all API endpoints.

## Dockerfile
- Base image: node:24-alpine
- Working directory: /app
- Dependencies installed with npm ci --only=production
- App starts via docker-entrypoint.sh
- Image size: 237MB across 15 layers

## Steps Taken
1. Wrote the Dockerfile in app/backend
2. Built the image: docker build -t task-backend:v1 .
3. Ran the container: docker run -d -p 3000:3000 --name task-backend task-backend:v1
4. Tested all 6 endpoints via Postman

## Endpoints Verified
| Method | Route | Status |
|--------|-------|--------|
| GET | / | 200 OK |
| GET | /health | 200 OK |
| GET | /tasks | 200 OK |
| POST | /tasks | 200 OK |
| PATCH | /tasks/:id | 200 OK |
| DELETE | /tasks/:id | 200 OK |

## Problems and Fixes
**Problem:** Docker build failed with exit code 1 on npm ci  
**Root cause:** DNS failure — Docker could not resolve auth.docker.io  
**Fix:** Added Google DNS (8.8.8.8, 8.8.4.4) to Docker Engine settings

## Key Concepts Learned
- Dockerfile instructions become image layers — each RUN, COPY, ENV is a layer
- Docker caches layers — unchanged layers are reused on rebuild
- Port mapping (-p host:container) exposes the container to localhost
- Docker Desktop is a GUI over the Docker CLI — same underlying engine

## Commands Reference
```bash
docker build -t task-backend:v1 .
docker run -d -p 3000:3000 --name task-backend task-backend:v1
docker ps
docker start task-backend
docker images
```

## Week 3 Preview
Week 3 will cover adding a frontend service and connecting both 
services using Docker Compose.