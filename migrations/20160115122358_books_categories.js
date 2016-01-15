exports.up = function(knex, Promise) {
  	return knex.schema.createTable('books_categories', function(table) {
  		table.increments().primary(); 
  		table.integer('book_id').unsigned().references('id')
  		.inTable('books').onDelete('cascade');
  		table.integer('category_id').unsigned().references('id')
  		.inTable('categories').onDelete('cascade');
  	});
};

exports.down = function(knex, Promise) {
  	 return knex.schema.dropTable('books_categories');
};


