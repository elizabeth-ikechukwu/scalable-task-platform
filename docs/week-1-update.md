# Week 1 — Project Foundation and Backend Setup

1. Install Node.js and restart your computer

2. Verify installation

   `node -v`  
   `npm.cmd -v`

3. Create `app/backend`, `app/frontend`, and `docs`

4. Create `server.js` and `package.json` inside the backend folder

5. Create and update project documentation:
   - `README.md`
   - `docs/week-1-update.md`

6. Install dependencies

   `cd app\backend`  
   `npm.cmd install`

   This creates:
   - `node_modules/`
   - `package-lock.json`

7. Start the server

   `node server.js`

   You should see:

   `Server running on port 3000`

8. Test the API — open in your browser

   `http://localhost:3000`  
   `http://localhost:3000/health`

   You should see:
   - `/` → `Task backend is running`
   - `/health` → `{"status":"healthy"}`

## Outcome

✅ Node.js installed successfully  
✅ Project structure created  
✅ Backend files created  
✅ Dependencies installed  
✅ Backend working locally  
✅ Health endpoint returning healthy response  

## Next Step

Week 2: Dockerize the backend service