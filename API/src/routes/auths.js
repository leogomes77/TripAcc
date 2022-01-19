const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

const secret = 'ipca!DWM@202122';

module.exports = (app) => {
  const router = express.Router();

  router.post('/signin', (req, res, next) => {
    app.services.user.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) throw new ValidationError('Email Incorreto');
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          const token = jwt.encode(payload, secret);
          res.status(200).json({ token });
        } else throw new ValidationError('Password Incorreta');
      }).catch((err) => next(err));
  });

  router.post('/signup', async (req, res) => {
    try {
      const result = await app.services.user.save(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return res.status(400).send(err);
    }
  });

  return router;
};
