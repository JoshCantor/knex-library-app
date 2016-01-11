exports.up = function(knex, Promise) {
  	return knex.schema.createTable('history', function(table) {
  		table.increments().primary(); 
  		table.string('title');
  		table.integer('book_id').unsigned().index().references('id')
  		.inTable('books').onDelete('cascade');
  	})
};

exports.down = function(knex, Promise) {
  	 return knex.schema.dropTable('history');
};
