/* const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const save = async (account) => {
    if (!account.name) throw new ValidationError('Nome é um atributo obrigatório');
    if (!account.moeda) throw new ValidationError('Moeda é um atributo obrigatório');

    return app.db('groupp').insert(account, '*');
  };

  const findAll = (filter = {}) => {
    return app.db('groupp').where(filter).select(['id', 'name', 'descricao', 'moeda']);
  };

  const find = (filter = {}) => {
    return app.db('groupp').where(filter).first();
  };

  const update = (id, account) => {
    return app.db('groupp')
      .where({ id })
      .update(account, '*');
  };

  const remove = (id) => {
    return app.db('groupp')
      .where({ id })
      .del();
  };

  return {
    save, findAll, find, update, remove,
  };
}; */
