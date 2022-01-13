exports.up = (knex) => {
  return knex.schema.createTable('groupBills', (t) => {
    t.increments('id').primary();
    t.integer('idGroup')
      .references('id')
      .inTable('groupp')
      .notNull();
    t.decimal('ammount').notNull();
    t.integer('idUserPaid')
      .references('id')
      .inTable('users')
      .notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('groupBills');
};
