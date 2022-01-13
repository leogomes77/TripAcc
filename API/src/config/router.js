const express = require('express');

module.exports = (app) => {
  app.use('/auth', app.routes.auths);

  const secureRouter = express.Router();

  secureRouter.use('/users', app.routes.users);
  secureRouter.use('/groups', app.routes.groups);
  secureRouter.use('/despesas', app.routes.despesas);
  secureRouter.use('/groupusers', app.routes.groupusers);
  app.use('/v1', app.config.passport.authenticate(), secureRouter);
};
