const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('groupp').where(filter).select();
  };

  const save = async (group) => {
    if (!group.name) throw new ValidationError('Nome é um atributo obrigatório');
    if (!group.moeda) throw new ValidationError('A Moeda é um atributo obrigatório');

    return app.db('groupp').insert(group, '*');
  };

  const find = (filter = {}) => {
    return app.db('groupp').where(filter).first();
  };

  const update = (id, group) => {
    return app.db('groupp')
      .where({ id })
      .update(group, '*');
  };

  const remove = (id) => {
    return app.db('groupp')
      .where({ id })
      .del();
  };

  return {
    save, findAll, find, remove, update,
  };
};
