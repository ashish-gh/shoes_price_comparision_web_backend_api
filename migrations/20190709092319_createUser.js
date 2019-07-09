

exports.up = async function(knex, Promise) {
    return await knex.schema.createTable('users', table => {
      table.increments('userId').notNullable().primary
      table.string('firstName').notNullable()
      table.string('lastName').notNullable()      
      table.string('email').unique()
      table.string('contact').notNullable()
      table.string('password')
      table.string('userType')
      table.string('profileImage')      
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
  };