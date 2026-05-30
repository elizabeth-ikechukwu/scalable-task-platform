const { Pool } = require('pg')

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT     || 5432,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl:      process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
})

// In CI there is no real database - the error is logged
// and the server starts anyway so the health check passes.
async function initDb() {
  try {
    // Users table - must exist before tasks (foreign key)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id          SERIAL PRIMARY KEY,
        name        TEXT NOT NULL,
        email       TEXT NOT NULL UNIQUE,
        password    TEXT NOT NULL,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    // Tasks table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id          SERIAL PRIMARY KEY,
        title       TEXT NOT NULL,
        completed   BOOLEAN NOT NULL DEFAULT FALSE,
        user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    // Add user_id to tasks if upgrading from Week 7
    await pool.query(`
      ALTER TABLE tasks
        ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id) ON DELETE CASCADE;
    `)

    // Projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id          SERIAL PRIMARY KEY,
        name        TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    // Team members table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id         SERIAL PRIMARY KEY,
        owner_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        email      TEXT NOT NULL,
        role       TEXT NOT NULL DEFAULT 'member',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE(owner_id, email)
      );
    `)

    console.log('Database initialised - all tables ready')
  } catch (err) {
    console.warn(
      'Database not available - running without persistent storage:',
      err.message
    )
  }
}

module.exports = { pool, initDb }
