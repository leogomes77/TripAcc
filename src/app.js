const app = require('express')();
const bodyParser = require('body-parser');
const consign = require('consign');

const knex = require('knex');
const knexfile = require('../knexfile');

app.db = knex(knexfile.test);

consign({ cwd: 'src', verbose: false })
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/router.js')
  .into(app);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send();
});

app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === 'validationError') res.status(400).json({ error: err.message });
  else {
    console.log(message);
    res.status(500).json({ name, message, stack });
  }
  next(err);
});

module.exports = app;
