
exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('shoes', table => {
    table.uuid('shoesId').notNullable().primary
      table.string('shoesBrand').unique()
      table.string('shoesName')
      table.float('shoesPrice')
      table.string('shoesDescription')
      table.string('shoesImageName')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shoes');
  };
  