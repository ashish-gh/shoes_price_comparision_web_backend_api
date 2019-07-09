

exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('shoes', table => {
      table.increments('itemId').notNullable().primary
      table.string('shoesBrand').notNullable()
      table.string('shoesName').notNullable()      
      table.string('shoesPrice').notNullable()
      table.string('shoesDescription').notNullable()
      table.string('shoesImageName').notNullable()
      table.integer('shopId')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shoes');
  };