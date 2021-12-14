exports.up = (knex) => {
  return knex.schema.createTable('groupUsers', (t) => {
    t.increments('id').primary();
    t.integer('idUser').notNull();
    t.integer('idGroup').notNull();
    t.boolean('active').notNull().default(false);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('groupUsers');
};
