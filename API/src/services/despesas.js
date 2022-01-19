const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('group_bills').where(filter).select();
  };

  const save = async (despesas) => {
    if (!despesas.id_group) throw new ValidationError('id_group é um atributo obrigatório');
    if (!despesas.amount) throw new ValidationError('A quantia é um atributo obrigatório');
    if (!despesas.id_user_paid) throw new ValidationError('id_user_paid é um atributo obrigatório');

    return app.db('group_bills').insert(despesas, '*');
  };

  const find = (filter = {}) => {
    return app.db('group_bills').where(filter).first();
  };

  const update = (id, despesas) => {
    if (!despesas.id_group) throw new ValidationError('id_group é um atributo obrigatório');
    if (!despesas.amount) throw new ValidationError('A quantia é um atributo obrigatório');
    if (!despesas.id_user_paid) throw new ValidationError('id_user_paid é um atributo obrigatório');
    return app.db('group_bills')
      .where({ id })
      .update(despesas, '*');
  };

  const remove = (id) => {
    return app.db('group_bills')
      .where({ id })
      .del();
  };

  return {
    save, findAll, find, remove, update,
  };
};
