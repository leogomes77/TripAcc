const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@ipca.pt`;

/*
test('Teste 13 - Receber token ao autenticar', () => {
  return app.services.user.save(
    { name: 'Carlos Araújo', email: mail, password: '12345' },
  ).then(() => request(app).post('/auth/signin')
    .send({ email: mail, password: '12345' }))
    .then((res) => {
      expect(res.status).toBe(200);
      console.log(res.body);
      expect(res.body).toHaveProperty('token');
    });
});

test('Teste 14 - Tentativa de autenticacao errada', () => {
  const nmail = `${Date.now()}@ipca.pt`;
  return app.services.user.save(
    { name: 'Carlos Araújo', email: nmail, password: '12345' },
  ).then(() => request(app).post('/auth/signin')
    .send({ email: mail, password: '6789' }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Autenticação inválida!');
    });
});

test('Teste 15 - Tentativa de autenticacao com utilizador errado', () => {
  const nmail = `${Date.now()}@ipca.pt`;
  return request(app).post('/auth/signin')
    .send({ email: nmail, password: '6789' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Autenticação inválida! #2');
    });
});

test('Teste 16 - Aceder a rotas protegidas', () => {
  return request(app).get('/v1/users')
    .then((res) => {
      expect(res.status).toBe(401);
    });
});

test('Teste 17 - Criar Utilizador', () => {
  const nmail = `${Date.now()}@ipca.pt`;
  return request(app).post('/auth/signup')
    .send({ name: 'Carlos Araújo', email: nmail, password: '12345' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Carlos Araújo');
      expect(res.body).toHaveProperty('email');
      expect(res.body).not.toHaveProperty('password');
    });
});
*/
