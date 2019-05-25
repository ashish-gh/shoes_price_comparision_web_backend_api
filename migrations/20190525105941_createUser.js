
exports.up = function(knex, Promise) {
    if (! (await knex.schema.hasTable('users')) ) {
        await knex.schema.createTable('users', function (table) {
          table.increments('id').primary();
          table.string('email');
          table.string('password');      
        });  
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable('users')
}
