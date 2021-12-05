module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '2917',
      database: 'pessoal',
    },
    debug: false,
    migrations: {
      directory: './src/migrations',
    },
    pool: {
      min: 0,
      max: 50,
      porpagateCreateError: false,
    },
  },
};
