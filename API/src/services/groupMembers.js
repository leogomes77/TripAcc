const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('group_users').where(filter).select();
  };

  const save = async (groupusers) => {
    if (!groupusers.id_user) throw new ValidationError('O id user é obrigatorio');
    if (!groupusers.id_group) throw new ValidationError('Grupo é um atributo obrigatório');
    return app.db('group_users').insert(groupusers, '*');
  };

  const find = (filter = {}) => {
    return app.db('group_users').where(filter).select();
  };

  // eslint-disable-next-line camelcase
  const findGroup = (id_group) => {
    return app.db('group_users', 'users').where(id_group).select();
  };

  const update = (id, groupusers) => {
    if (!groupusers.id_user) throw new ValidationError('O id user é obrigatorio');
    if (!groupusers.id_group) throw new ValidationError('Grupo é um atributo obrigatório');
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
