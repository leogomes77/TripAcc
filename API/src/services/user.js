const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    console.log('entrou');
    return app.db('users').where(filter).select();
  };

  const findOne = async (filter = {}) => {
    const result = await app.db('users').where(filter).first();
    return result;
  };

  const getPasswdHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (user) => {
    if (!user.name) throw new ValidationError('Nome é um atributo obrigatório');
    if (!user.email) throw new ValidationError('O email é um atributo obrigatório');
    if (!user.password) throw new ValidationError('A palavra-passe é um atributo obrigatório');

    const userDb = await findOne({ email: user.email });
    if (userDb) throw new ValidationError('Email duplicado na BD');

    const newUser = { ...user };
    newUser.password = getPasswdHash(user.password);
    return app.db('users').insert(newUser, ['id', 'email', 'name']);
  };

  const remove = (id) => {
    return app.db('users')
      .where({ id })
      .del();
  };

  return {
    save, findAll, findOne, remove,
  };
};
