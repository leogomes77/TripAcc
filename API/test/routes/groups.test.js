const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/groups';

const mail = `${Date.now()}@ipca.pt`;
const secret = 'ipca!DWM@202122';
let user;

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'Leonardo Francisco', email: mail, password: '12345' });
  user = { ...res[0] };
  user.token = jwt.encode(user, secret);
});

test('Test #1 - Listar Grupos', () => {
  return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #2 - inserir grupo', () => {
  return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .send({ name: 'Maldivas', descricao: 'Ida maldivas', moeda: 'euro' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Maldivas');
    });
});

test('Test #3 - Remover um Grupo', () => {
  return app.db('groupp')
    .insert({ name: 'Group to delete', descricao: 'Trip to Chile', moeda: 'euro' }, ['id'])
    .then((group) => request(app).delete(`${MAIN_ROUTE}/${group[0].id}`)
      .set('authorization', `bearer ${user.token} `))
    .then((res) => {
      expect(res.status).toBe(204);
    });
});
