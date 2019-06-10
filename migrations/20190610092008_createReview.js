
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('review', table => {
    table.uuid('reviewId').notNullable().primary
      table.string('review').unique()
      table.string('username')
      table.float('shoesId')
      table.string('reviewDate')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('review');
  };
  