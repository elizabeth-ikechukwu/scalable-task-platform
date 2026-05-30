const express  = require("express");
const { pool } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// All task routes require a valid JWT
router.use(requireAuth);

// GET /api/tasks - return tasks for the logged-in user, newest first
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/tasks error:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /api/tasks - create a task for the logged-in user
router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, user_id) VALUES ($1, $2) RETURNING *",
      [title, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POST /api/tasks error:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PATCH /api/tasks/:id - toggle completed (only owner can update)
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `UPDATE tasks
       SET completed = NOT completed
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, req.user.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("PATCH /api/tasks/:id error:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /api/tasks/:id - delete (only owner can delete)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("DELETE /api/tasks/:id error:", err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
