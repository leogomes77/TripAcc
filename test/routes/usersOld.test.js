const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROOT = '/v1/users';

const mail = `${Date.now()}@ipca.pt`;
const secret = 'ipca!DWM@2122';
let user;

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'Carlos Araújo', email: mail, password: '12345' });
  user = { ...res[0] };
  user.token = jwt.encode(user, secret);
});

/*
test('Test #1 - Listar os utilizadores', () => {
  return request(app).get(MAIN_ROOT)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #2 - inserir Utilizadores', () => {
  const nmail = `${Date.now()}@ipca.pt`;

  return request(app).post(MAIN_ROOT)
    .set('authorization', `bearer ${user.token}`)
    .send({ name: 'Carlos Araújo', email: nmail, password: '22331' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Carlos Araújo');
      expect(res.body).not.toHaveProperty('password');
    });
});

test('Test #2.1 - Guardar palavra pass encriptada', async () => {
  const res = await request(app).post('/users')
    .send({ name: 'Carlos Araujo', email: `${Date.now()}@ipca.pt`, password: '1234' });
  expect(res.status).toBe(201);

  const { id } = res.body;
  const userDB = await app.services.user.findOne({ id });
  expect(userDB.password).not.toBeUndefined();
  expect(userDB.password).not.toBe('1234');
});

test('Teste 3 - Inserir user sem nome', () => {
  return request(app).post(MAIN_ROOT)
    .set('authorization', `bearer ${user.token}`)
    .send({ email: mail, password: '12344' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Teste 4 - Inserir utilizador sem email', async () => {
  const result = await request(app).post('/users')
    .set('authorization', `bearer ${user.token}`)
    .send({ name: 'Carlos Araújo', password: '123123' });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('O email é um atributo obrigatorio');
});

test('Teste 5 - Inserrir utilizador sem password', (done) => {
  request(app).post(MAIN_ROOT)
    .set('authorization', `bearer ${user.token}`)
    .send({ name: 'Carlos Araújo', email: mail })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('A palavra-passe é um atributo obrigatório');
      done();
    });
});

test('Teste 6 - Inserir utilizadores', () => {
  return request(app).post('/users')
    .send({ name: 'Carlos Araújo', email: mail, password: '102920' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Email duplicado na BD');
    });
});
*/
