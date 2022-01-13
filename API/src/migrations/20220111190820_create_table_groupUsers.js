exports.up = (knex) => {
  return knex.schema.createTable('group_users', (t) => {
    t.increments('id').primary();
    t.integer('id_group')
      .references('id')
      .inTable('groupp')
      .notNull();
    t.integer('id_user')
      .references('id')
      .inTable('users')
      .notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('group_users');
};
