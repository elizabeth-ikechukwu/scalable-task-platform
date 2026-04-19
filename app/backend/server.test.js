const request = require('supertest');
const app = require('./server');

describe('Health Check', () => {
  it('GET /api/health returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Tasks API', () => {
  it('GET /api/tasks returns empty array initially', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/tasks creates a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test task' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test task');
    expect(res.body.completed).toBe(false);
  });

  it('POST /api/tasks returns 400 when title is missing', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({});
    expect(res.statusCode).toBe(400);
  });
});