const express = require('express');
const consign = require('consign');

const knex = require('knex');
const knexfile = require('../knexfile');

const app = express();

app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

app.db = knex(knexfile.test);

consign({ cwd: 'src', verbose: false })
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/router.js')
  .into(app);

app.listen(3001);

/**
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send();
});

app.listen(3001);
*/
