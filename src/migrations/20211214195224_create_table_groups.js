exports.up = (knex) => {
  return knex.schema.createTable('groups', (t) => {
    t.increments('id').primary();
    t.string('groupName').notNull();
    t.string('groupObs').notNull();
    t.string('moeda').notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('groups');
};
