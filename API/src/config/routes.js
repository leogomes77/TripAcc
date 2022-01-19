module.exports = (app) => {
  app.route('/auth/signin').post(app.routes.auths.signin);
  app.route('/auth/signup').post(app.routes.users.create);

  app.route('/users')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);

  app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.users.findOne)
    .delete(app.routes.users.remove);

  app.route('/groups')
    .all(app.config.passport.authenticate())
    .get(app.routes.groups.findAll)
    .post(app.routes.groups.create);

  app.route('/groups/:id')
    .get(app.routes.groups.findOne)
    .delete(app.routes.groups.remove)
    .put(app.routes.groups.update);

  app.route('/despesas')
    .all(app.config.passport.authenticate())
    .get(app.routes.despesas.findAll)
    .post(app.routes.despesas.create);

  app.route('/despesas/:id')
    .get(app.routes.despesas.findOne)
    .put(app.routes.despesas.update)
    .delete(app.routes.despesas.remove);

  app.route('/groupusers')
    .all(app.config.passport.authenticate())
    .get(app.routes.groupusers.findAll)
    .post(app.routes.groupusers.create);

  app.route('/groupusers/:id')
    .get(app.routes.groupusers.findOne)
    .delete(app.routes.groupusers.remove)
    .put(app.routes.groupusers.update)
    .get(app.routes.groupusers.findGroup);
};
