const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('group_users').where(filter).select();
  };

  const save = async (groupusers) => {
    if (!groupusers.id_user) throw new ValidationError('A Moeda é um atributo obrigatório');
    if (!groupusers.id_group) throw new ValidationError('Nome é um atributo obrigatório');
    return app.db('group_users').insert(groupusers, '*');
  };

  const find = (filter = {}) => {
    return app.db('group_users').where(filter).select();
  };

  const findGroup = (id) => {
    return app.db('group_users')
      .where({ id })
      .select(['*']);
  };

  const update = (id, groupusers) => {
    return app.db('group_users')
      .where({ id })
      .update(groupusers, '*');
  };

  const remove = (id) => {
    return app.db('group_users')
      .where({ id })
      .del();
  };

  return {
    save, findAll, find, remove, update, findGroup,
  };
};
