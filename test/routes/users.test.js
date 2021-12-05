const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROOT = '/v1/users';

const secret = 'secretKey!';

let user;
user.token = jwt.encode(user, secret);
user.id = 44;

test('Test #1 - Criar Utilizador', () => {
  return request(app).post(`${MAIN_ROUTE}/createUser/`)
    .send({ fullName: 'Carlos Araújo', userName: 'caraujo66', email: 'caraujo@email.com', password: '123123' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.descricao).toBe('almoço');
    });
});

test('Test #2 - Eliminar Utilizador', () => {
  return request(app).delete(`${MAIN_ROUTE}/deleteAccount/${user.id}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    });
});

test('Test #3, Editar Utilizador', () => {
  return request(app).put(`${MAIN_ROUTE}/updateAccount/${user.id}`)
    .set('authorization', `bearer ${user.token}`)
    .send({ fullName: 'Carlos Daniel Araújo' })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.desc).toBe('Dollar');
    });
});
