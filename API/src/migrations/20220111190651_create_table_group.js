exports.up = (knex) => {
  return knex.schema.createTable('groupp', (t) => {
    t.increments('id').primary();
    t.string('name').notNull();
    t.string('descricao').notNull();
    t.string('moeda').notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('groupp');
};
