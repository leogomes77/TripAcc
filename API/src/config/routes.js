module.exports = (app) => {
  app.route('/auth/signin').post(app.routes.auths.signin);
  app.route('/auth/signup').post(app.routes.users.create);

  app.route('/users')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);

  app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.findAll)
    .post(app.routes.users.create)
    .delete(app.routes.accounts.remove);

  app.route('/groups')
    .get(app.routes.groups.findAll)
    .post(app.routes.groups.create)
    .delete(app.routes.groups.remove);

  app.route('/despesas')
    .all(app.config.passport.authenticate())
    .get(app.routes.despesas.findAll)
    .post(app.routes.despesas.create)
    .delete(app.routes.despesas.remove);

  app.route('/groupusers')
    .all(app.config.passport.authenticate())
    .get(app.routes.despesas.findAll)
    .post(app.routes.despesas.create)
    .delete(app.routes.despesas.remove);
};
