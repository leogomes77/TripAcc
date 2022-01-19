const request = require('supertest');
const app = require('../../src/app');

const mail = `${Date.now()}@ipca.pt`;

test('Test #1 - Receber token ao autenticar', () => {
  return app.services.user.save(
    { name: 'Leonardo Auth', email: mail, password: '12345' },
  ).then(() => request(app).post('/auth/signin')
    .send({ email: mail, password: '12345' }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
});

test('Test #2 - Tentativa de autenticação password errada', () => {
  const nmail = `${Date.now()}@ipca.pt`;
  return app.services.user.save(
    { name: 'Leonardo Auth', email: nmail, password: '12345' },
  ).then(() => request(app).post('/auth/signin')
    .send({ email: mail, password: '67890' }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Password Incorreta');
    });
});

test('Test #3 - Tentativa de autenticação com utilizador errado', () => {
  const nmail = `${Date.now()}@ipca.pt`;
  return request(app).post('/auth/signin')
    .send({ email: nmail, password: '67890' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Email Incorreto');
    });
});

test('Test #4 - Aceder a rotas protegidas', () => {
  return request(app).get('/v1/users')
    .then((res) => {
      expect(res.status).toBe(401);
    });
});

test('Test #5 - Criar utilizador', () => {
  const nmail = `${Date.now()}@ipca.pt`;
  return request(app).post('/auth/signup')
    .send({ name: 'Leonardo Signup', email: nmail, password: '12345' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Leonardo Signup');
      expect(res.body).toHaveProperty('email');
      expect(res.body).not.toHaveProperty('password');
    });
});
