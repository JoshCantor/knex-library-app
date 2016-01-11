exports.up = function(knex, Promise) {
  	return knex.schema.createTable('books', function(table) {
  		table.increments().primary(); 
  		table.string('title');
  		table.integer('author_id').unsigned().references('id')
  		.inTable('authors').onDelete('cascade');
  	})
};

exports.down = function(knex, Promise) {
  	 return knex.schema.dropTable('books');
};