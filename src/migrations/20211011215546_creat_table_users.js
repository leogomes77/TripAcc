exports.up = (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('name').notNull();
    t.string('email').notNull();
    t.string('morada').notNull();
    t.string('password');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
