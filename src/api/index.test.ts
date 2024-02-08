import request from 'supertest';

import app from '../app';

describe('POST /search', () => {

  it('should return 200 with a status of ok', (done) => {
    request(app)
      .post('/search')
      .send({ search_query: 'The quick brown fox jumps over the lazy dog' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        status: 'ok',
      }, done);
  });

  it('should return 400 ', (done) => {
    request(app)
      .post('/search')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { message: 'no search_query in request body' }, done);
  });
});

describe('GET /analyse', () => {
  it('return a 400', (done) => {
    request(app)
      .get('/analyse')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, { message: 'no analysis_token in request query' }, done);
  });

  it('should return  a 200', async () => {
    const response = await request(app).get('/analyse?analysis_token=the quick');
    expect(response.statusCode).toBe(200);
    expect(response.body.results).toBeDefined();
    expect(response.body.time).toBeDefined();
  });
});
