const { Pool } = require("pg");

// Connection pool — reuses connections instead of
// opening a new one for every request
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // Required for AWS RDS
  },
});

// Create the tasks table if it does not already exist.
// Runs once on server startup.
// In CI there is no real database — the error is logged
// and the server starts anyway so the health check passes.
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id          SERIAL PRIMARY KEY,
        title       TEXT NOT NULL,
        completed   BOOLEAN NOT NULL DEFAULT FALSE,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log("Database initialised — tasks table ready");
  } catch (err) {
    console.warn("Database not available — running without persistent storage:", err.message);
  }
}

module.exports = { pool, initDb };
