exports.up = (knex) => {
  return knex.schema.createTable('groupClose', (t) => {
    t.increments('id').primary();
    t.integer('idGroup').notNull();
    t.integer('idUserPay').notNull();
    t.integer('idUserReceive').notNull();
    t.decimal('ammount', 15, 2).notNull();
    t.boolean('confirmation').notNull().default(false);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('groupClose');
};
