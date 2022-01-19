const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/groupusers';

const mail = `${Date.now()}@ipca.pt`;
const secret = 'ipca!DWM@202122';
let user;

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'Leonardo Francisco', email: mail, password: '12345' });
  user = { ...res[0] };
  user.token = jwt.encode(user, secret);
});

test('Test #1 - Listar Membros', () => {
  return request(app).get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #2 - Inserir Membro', () => {
  return request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .send({ id_group: 21, id_user: 100 })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.id_group).toBe(21);
    });
});

test('Test #2.1 - inserir Membro sem id_group', (done) => {
  request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .send({ id_user: 100 })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Grupo é um atributo obrigatório');
      done();
    });
});

test('Test #2.2 - inserir Membro sem id_user', (done) => {
  request(app).post(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .send({ id_group: 21 })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('O id user é obrigatorio');
      done();
    });
});

test('Test #3 - Remover um membro do grupo', () => {
  return app.db('group_users')
    .insert({ id_group: 12, id_user: 101 }, ['id'])
    .then((group) => request(app).delete(`${MAIN_ROUTE}/${group[0].id}`)
      .set('authorization', `bearer ${user.token} `))
    .then((res) => {
      expect(res.status).toBe(204);
    });
});

test('Test #4 - Atualizar membros de grupos', () => {
  return app.db('group_users')
    .insert({
      id_group: 12, id_user: 102,
    }, ['id'])
    .then((serv) => request(app).put(`${MAIN_ROUTE}/${serv[0].id}`)
      .set('authorization', `bearer ${user.token}`)
      .send({
        id_group: 12, id_user: 100,
      }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.id_user).toBe(100);
    });
});

test('Test #4.1 - Atualizar Membros de grupo sem id_user', () => {
  return app.db('group_users')
    .insert({
      id_group: 12, id_user: 102,
    }, ['id'])
    .then((serv) => request(app).put(`${MAIN_ROUTE}/${serv[0].id}`)
      .set('authorization', `bearer ${user.token}`)
      .send({
        id_group: 12, id_user: null,
      }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('O id user é obrigatorio');
    });
});

test('Test #4.2 - Atualizar Membros de grupos sem id_group', () => {
  return app.db('group_users')
    .insert({
      id_group: 12, id_user: 102,
    }, ['id'])
    .then((serv) => request(app).put(`${MAIN_ROUTE}/${serv[0].id}`)
      .set('authorization', `bearer ${user.token}`)
      .send({
        id_group: null, id_user: 100,
      }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Grupo é um atributo obrigatório');
    });
});
