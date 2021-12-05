const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROOT = '/v1/accounts';

let user;
const mail = `${Date.now()}@ipca.pt`;
const secret = 'ipca!DWM@2122';

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'Daniel Silva', email: mail, password: '12241' });
  user = { ...res[0] };
  user.token = jwt.encode(user, secret);
  const res2 = await app.services.user.save({ name: 'Daniel Silva #2', email: `${Date.now()}@ipca.pt`, password: '12241' });
  user = { ...res2[0] };
});

/*
test('Test 7 - Inserir contas', () => {
  return request(app).post(MAIN_ROOT)
    .send({ name: 'Account #1' })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Account #1');
    });
});

test('test 8 - Inserir conta sem nome', () => {
  return request(app).post(MAIN_ROOT)
    .send({ user_id: user.id })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatorio');
    });
});

test('Test 18 - Listar apenas as contas do utilizador', () => {
  return app.db('accounts')
    .insert([
      { name: 'Account U #1', user_id: user.id },
      { name: 'Account U #2', user_id: user.id },
    ]).then(() => request(app).get(MAIN_ROOT)
      .set('authorization', `bearer ${user.token}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe('Account U #1');
    });
});
*/
