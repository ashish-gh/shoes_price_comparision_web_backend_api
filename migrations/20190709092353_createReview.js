

exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('review', table => {
      table.increments('reviewId').notNullable().primary
      table.string('review').notNullable()
      table.integer('userId')
      table.integer('shoesId')
      table.string('reviewDate').notNullable()     
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('review');
  };