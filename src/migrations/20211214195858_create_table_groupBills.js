exports.up = (knex) => {
  return knex.schema.createTable('groupBills', (t) => {
    t.increments('id').primary();
    t.integer('idGroup').notNull();
    t.decimal('ammount', 15, 2).notNull();
    t.integer('idUserPaid').notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('groupBills');
};
