
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('store', table => {
    table.uuid('storeId').notNullable().primary
      table.string('storeName').unique()
      table.float('latitude')
      table.float('longitude')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('store');
  };
  