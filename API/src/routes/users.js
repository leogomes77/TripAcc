const express = require('express');
const jwt = require('jwt-simple');
const constants = require('../constant');

module.exports = (app) => {
  const router = express.Router();

  router.get('/info', (req, res) => {
    const jwtt = req.headers.authorization.slice(7);
    const decoded = jwt.decode(jwtt, constants.secret);
    app.services.user.findOne({ email: decoded.email })
      .then((result) => res.status(200).json({
        id: result.id,
        name: result.name,
        email: result.email,
        password: result.password,
        contacto: result.contacto,
      }))
      .catch(() => res.status(404).send());
  });

  router.get('/', (req, res, next) => {
    app.services.user.findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.post('/', async (req, res, next) => {
    try {
      const result = await app.services.user.save(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  });

  router.delete('/:id', (req, res, next) => {
    app.services.user.remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  });

  return router;
};
