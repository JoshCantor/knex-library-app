var express = require('express'),
	router = express.Router(),
	knex = require('../db/knex');

router.get('/', function(req, res) {
	knex('books').then(function(books) {
		res.render('../views/books/index', {books: books});
	});
});

router.get('/:id', function(req, res) {
	var bookId = req.params.id;
	knex('books').where({id: bookId})
	.then(function(book) {
		knex('books_categories').where({book_id: bookId}).returning('id')
		.then(function(result) {
			var categoryIds = [];
			result.forEach(function(row) {
				categoryIds.push(row.category_id);	
			});
			knex('categories').whereIn('id', categoryIds)
			.then(function(categories) { 
					res.render('../views/books/update', {book: book[0], categories: categories});
			});
		});
		
	});	
});

router.post('/:id', function(req, res) {
	var newGenre = req.body.name,
		bookId = req.params.id;
	knex('categories').insert({name: newGenre}).returning('id')
	.then(function(id) {
		knex('books_categories').insert({book_id: bookId, category_id: id[0]})
		.then(function() {
			res.redirect('/books');
		});
	});
});

router.delete('/category/:bookId/:categoryId', function(req, res) {
	var bookId = req.params.bookId,
		categoryId = req.params.categoryId;
	knex('books_categories').where({book_id: bookId, category_id: categoryId}).del()
    .then(function() {
        res.redirect('/books/' + bookId);
    });
});


module.exports = router;