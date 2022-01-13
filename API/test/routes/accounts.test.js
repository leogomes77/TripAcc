const request = require('supertest');

const app = require('../../src/server');

const MAIN_ROUTE = '/v1/accounts';

test('Test #7 - Adicionar Grupo', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Amigos Algarve', vacationName: 'Trip to Chile', currency: ' euro ' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Amigos Algarve');
      expect(res.body.descricao).toBe('Algarve');
      expect(res.body.moeda).toBe('Euro');
    });
});

/*
test('Test #8 - Listar contas', () => {
  return app.db('accounts')
    .insert({ name: 'Account list', user_id: user.id })
    .then(() => request(app).get(MAIN_ROUTE).set('authorization', `bearer ${user.token}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #9 - Listar contas por ID', () => {
  return app.db('accounts')
    .insert({ name: 'Account By id', user_id: user.id }, ['id'])
    .then((acc) => request(app)
      .get(`${MAIN_ROUTE}/${acc[0].id}`)
      .set('authorization', `bearer ${user.token}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Account By id');
      expect(res.body.user_id).toBe(user.id);
    });
});

test('Test #10 - Alterar conta', () => {
  return app.db('accounts')
    .insert({ name: 'Account - Update', user_id: user.id }, ['id'])
    .then((acc) => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
      .send({ name: 'Account updated' })
      .set('authorization', `bearer ${user.token}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Account updated');
    });
});

test('Test #11 - Remover conta', () => {
  return app.db('accounts')
    .insert({ name: 'Account - Remove', user_id: user.id }, ['id'])
    .then((acc) => request(app)
      .delete(`${MAIN_ROUTE}/${acc[0].id}`)
      .send({ name: 'Account removed' })
      .set('authorization', `bearer ${user.token}`))
    .then((res) => {
      expect(res.status).toBe(204);
    });
});

test('Test #12 - Inserir conta sem nome', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ })
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é um atributo obrigatório');
    });
});

test('Test #18 - Listar apenas as contas do utilizador', () => {
  return app.db('accounts')
    .insert([
      { name: 'Account U #1', user_id: user.id },
      { name: 'Account U #2', user_id: user2.id },
    ]).then(() => request(app).get(MAIN_ROUTE)
      .set('authorization', `bearer ${user.token}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe('Account U #1');
    });
});

test('Test #19 - Inserir nome de conta duplicado', () => {
  return app.db('accounts')
    .insert({ name: 'Account dup', user_id: user.id })
    .then(() => request(app).post(MAIN_ROUTE)
      .set(('authorization'), `bearer ${user.token}`)
      .send({ name: 'Account dup' }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Já existe uma conta com o nome indicado');
    });
});

test('Test #20 - Aceder a conta de outro utilizador', () => {
  return app.db('accounts')
    .insert({ name: 'Account U#2', user_id: user2.id }, ['id'])
    .then((acc) => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`)
      .set('authorization', `bearer ${user.token}`))
    .then((res) => {
      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Não tem acesso ao recurso solicitado');
    });
});

test('Test #21 - Alterar a conta de outro utilizador', () => {
  return app.db('accounts')
    .insert({ name: 'Account U#2', user_id: user2.id }, ['id'])
    .then((acc) => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
      .set('authorization', `bearer ${user.token}`)
      .send({ name: 'Account Change' }))
    .then((res) => {
      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Não tem acesso ao recurso solicitado');
    });
});

test('Test #22 - Remover a conta de outro utilizador', () => {
  return app.db('accounts')
    .insert({ name: 'Account U#2', user_id: user2.id }, ['id'])
    .then((acc) => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`)
      .set('authorization', `bearer ${user.token}`))
    .then((res) => {
      expect(res.status).toBe(403);
      expect(res.body.error).toBe('Não tem acesso ao recurso solicitado');
    });
}); */
