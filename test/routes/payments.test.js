const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROOT = '/v1/users';

const secret = 'secretKey!';

let user;
user.token = jwt.encode(user, secret);
user.id = 44;
const groupId = 6;
const paymentId = 132;

test('Test #1 - inserir Pagamento', () => {
  return request(app).post(`${MAIN_ROUTE}/addPayment/${groupId}`)
    .set('authorization', `bearer ${user.token}`)
    .send({ idGroup: groupId, ammount: 15.4, idUserPaid: user.id, descricao: 'almoço' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.descricao).toBe('almoço');
    });
});

test('Test #2 - Editar Pagamento', () => {
  return request(app).put(`${MAIN_ROUTE}/updatePayment/${paymentId}`)
    .set('authorization', `bearer ${user.token}`)
    .send({ descricao: 'Prqueno Almoço' })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.desc).toBe('Prqueno Almoço');
    });
});

test('Test #3 - Remover Pagamento', () => {
  return request(app).delete(`${MAIN_ROUTE}/removePayment/${paymentId}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    });
});

test('Test #4 - Listar Pagamentos do Grupo', () => {
  return request(app).get(`${MAIN_ROUTE}/listGroupPayments/${groupId}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(groupId);
    });
});
