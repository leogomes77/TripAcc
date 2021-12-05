const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROOT = '/v1/users';

const secret = 'secretKey!';

let user;
user.token = jwt.encode(user, secret);
user.id = 44;
const groupId = 6;
const newUser = 55;
const groupUserId = newUser;

test('Test #1 - Criar Grupo', () => {
  return request(app).post(`${MAIN_ROUTE}createGroup/${user.id}`)
    .set('authorization', `bearer ${user.token}`)
    .send({ groupName: 'Ferias', groupObs: 'grupo férias', moeda: 'euro', active: 'true' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.moeda).toBe('euro');
      request(app).post(`${MAIN_ROUTE}/addGroupMembers/${groupId}`)
        .send({ idUser: user.id, idGroup: groupId, active: 'true' })
        .then((resu) => {
          expect(resu.status).toBe(201);
          expect(resu.body.idUser).toBe(user.id);
        });
    });
});

test('Test #2 - Editar Grupo', () => {
  return request(app).put(`${MAIN_ROUTE}/updateGroup/${groupId}`)
    .set('authorization', `bearer ${user.token}`)
    .send({ moeda: 'Dollar' })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.desc).toBe('Dollar');
    });
});

test('Test #3 - Eliminar Grupo', () => {
  return request(app).delete(`${MAIN_ROUTE}/deleteGroup/${groupId}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    });
});

test('Test #4 - Listar Grupos do Utilizador', () => {
  return request(app).get(`${MAIN_ROUTE}/listGroups/${user.id}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(groupId);
    });
});

test('Test #5 - Adicionar Utilizador a Grupo', () => {
  return request(app).post(`${MAIN_ROUTE}/addGroupMembers/${groupId}`)
    .set('authorization', `bearer ${user.token}`)
    .send({ idUser: newUser, idGroup: groupId, active: 'true' })
    .then((resu) => {
      expect(resu.status).toBe(201);
      expect(resu.body.idUser).toBe(newUser);
    });
});

test('Test #6 - Listar Membros do Grupos', () => {
  return request(app).get(`${MAIN_ROUTE}/listGroupMembers/${groupId}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #7 - Eliminar Grupo', () => {
  return request(app).delete(`${MAIN_ROUTE}/removeGroupMember/${groupUserId}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    });
});
