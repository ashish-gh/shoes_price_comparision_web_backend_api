
exports.up = async function(knex, Promise) {
  return await knex.schema.createTable('users', table => {
    table.uuid('userId').notNullable().primary
    table.string('email').unique()
    table.string('password')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shoes');
};
