

exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('shop', table => {
      table.increments('shopId').notNullable().primary
      table.string('shopName').notNullable()
      table.string('shopLocation').notNullable()      
      table.string('shopDescription').notNullable()
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shop');
  };