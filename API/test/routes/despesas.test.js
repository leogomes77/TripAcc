const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/despesas';

const mail = `${Date.now()}@ipca.pt`;
const secret = 'ipca!DWM@202122';
let user;

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'Leonardo Francisco', email: mail, password: '12345' });
  user = { ...res[0] };
  user.token = jwt.encode(user, secret);
});

test('Test #1 - Listar Depesas', () => {
  return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #2 - Inserir Despesas', () => {
  return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .send({ id_group: 21, amount: 100.00, id_user_paid: 100 })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.amount).toBe(100.00);
    });
});

test('Test #2.1 - inserir Despesa sem id_group', (done) => {
  request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .send({ amount: 100.00, id_user_paid: 100 })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('id_group é um atributo obrigatório');
      done();
    });
});

test('Test #2.2 - inserir grupo sem quantia', (done) => {
  request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .send({ id_group: 21, id_user_paid: 100 })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('A quantia é um atributo obrigatório');
      done();
    });
});

test('Test #2.3 - inserir grupo sem id_user_paid', (done) => {
  request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .send({ id_group: 21, amount: 100.00 })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('id_user_paid é um atributo obrigatório');
      done();
    });
});

test('Test #3 - Remover uma despesa', () => {
  return app.db('group_bills')
    .insert({ id_group: 12, amount: 100.00, id_user_paid: 100 }, ['id'])
    .then((group) => request(app).delete(`${MAIN_ROUTE}/${group[0].id}`)
      .set('authorization', `bearer ${user.token} `))
    .then((res) => {
      expect(res.status).toBe(204);
    });
});

test('Test #4 - Atualizar Despesa', () => {
  return app.db('group_bills')
    .insert({
      id_group: 12, amount: 100.00, id_user_paid: 100,
    }, ['id'])
    .then((serv) => request(app).put(`${MAIN_ROUTE}/${serv[0].id}`)
      .set('authorization', `bearer ${user.token}`)
      .send({
        id_group: 12, amount: 120.00, id_user_paid: 100,
      }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.amount).toBe(120.00);
    });
});

test('Test #4.1 - Atualizar Despesa sem id_group', () => {
  return app.db('group_bills')
    .insert({
      id_group: 12, amount: 100.00, id_user_paid: 100,
    }, ['id'])
    .then((serv) => request(app).put(`${MAIN_ROUTE}/${serv[0].id}`)
      .set('authorization', `bearer ${user.token}`)
      .send({
        amount: 100.00, id_user_paid: 100,
      }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('id_group é um atributo obrigatório');
    });
});

test('Test #4.2 - Atualizar Despesa sem amount', () => {
  return app.db('group_bills')
    .insert({
      id_group: 12, amount: 100.00, id_user_paid: 100,
    }, ['id'])
    .then((serv) => request(app).put(`${MAIN_ROUTE}/${serv[0].id}`)
      .set('authorization', `bearer ${user.token}`)
      .send({
        id_group: 12, id_user_paid: 100,
      }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('A quantia é um atributo obrigatório');
    });
});

test('Test #4.3 - Atualizar Despesa sem id_user_paid', () => {
  return app.db('group_bills')
    .insert({
      id_group: 12, amount: 100.00, id_user_paid: 100,
    }, ['id'])
    .then((serv) => request(app).put(`${MAIN_ROUTE}/${serv[0].id}`)
      .set('authorization', `bearer ${user.token}`)
      .send({
        id_group: 12, amount: 120.00,
      }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('id_user_paid é um atributo obrigatório');
    });
});
