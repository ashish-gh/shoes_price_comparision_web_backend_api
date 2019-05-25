
exports.up = function(knex, Promise) {
    if (! (await knex.schema.hasTable('recipe')) ) {
        await knex.schema.createTable('recipe', function (table) {
          table.increments('id').primary();
          table.string('name');
          table.string('description');      
        });    
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('users')
};
