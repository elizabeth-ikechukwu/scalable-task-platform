const request = require('supertest');
const jwt     = require('jsonwebtoken');

// Mock pg Pool before importing app so no real
// database connection is attempted during tests
jest.mock('pg', () => {
  const mPool = { query: jest.fn() };
  return { Pool: jest.fn(() => mPool) };
});

// Mock initDb so the server does not try to create
// tables on startup during tests
jest.mock('./db', () => ({
  pool:   { query: jest.fn() },
  initDb: jest.fn().mockResolvedValue(),
}));

const { pool } = require('./db');
const app      = require('./server');

// Generate a valid test token so authenticated routes pass
const TEST_USER  = { id: 1, email: 'test@example.com', name: 'Test User' };
const TEST_TOKEN = jwt.sign(
  TEST_USER,
  process.env.JWT_SECRET || 'changeme-use-a-real-secret-in-production',
  { expiresIn: '1h' }
);

// Reset all mocks between tests so they do not bleed into each other
beforeEach(() => {
  jest.clearAllMocks();
});

describe('Health Check', () => {
  it('GET /api/health returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Tasks API', () => {
  it('GET /api/tasks returns empty array initially', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${TEST_TOKEN}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('POST /api/tasks creates a new task', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, title: 'Test task', completed: false, created_at: new Date() }],
    });
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({ title: 'Test task' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test task');
    expect(res.body.completed).toBe(false);
  });

  it('POST /api/tasks returns 400 when title is missing', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${TEST_TOKEN}`)
      .send({});
    expect(res.statusCode).toBe(400);
  });

  it('PATCH /api/tasks/:id toggles completed status', async () => {
    pool.query.mockResolvedValueOnce({
      rowCount: 1,
      rows: [{ id: 1, title: 'Test task', completed: true, created_at: new Date() }],
    });
    const res = await request(app)
      .patch('/api/tasks/1')
      .set('Authorization', `Bearer ${TEST_TOKEN}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it('PATCH /api/tasks/:id returns 404 when task not found', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 0, rows: [] });
    const res = await request(app)
      .patch('/api/tasks/999')
      .set('Authorization', `Bearer ${TEST_TOKEN}`);
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/tasks/:id deletes a task', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });
    const res = await request(app)
      .delete('/api/tasks/1')
      .set('Authorization', `Bearer ${TEST_TOKEN}`);
    expect(res.statusCode).toBe(204);
  });

  it('DELETE /api/tasks/:id returns 404 when task not found', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 0 });
    const res = await request(app)
      .delete('/api/tasks/999')
      .set('Authorization', `Bearer ${TEST_TOKEN}`);
    expect(res.statusCode).toBe(404);
  });
});
