var express = require('express'),
	router = express.Router(),
	knex = require('../db/knex');

router.get('/', function(req, res) {
	var fiction = [],
		nonFiction = [],
		science = [],
		history = [];
	knex('books').then(function(books) {
		res.render('../views/books/index', {books: books});
	});
});

router.get('/:id', function(req, res) {
	knex('books').where({id: req.params.id})
	.then(function(book) {
		res.render('../views/books/update', {book: book[0]});
	});	
});

router.post('/:id', function(req, res) {
	if (req.body.fiction) {
		knex('books').where({id: req.params.id})
		.then(function(bookList) {
			var book = bookList[0];
			console.log('boooooooooook', book);
			knex('fiction').insert({title: book.title, book_id: book.id})
			.then(function(){});
		});
	} 
	if (req.body.nonFiction) {
		knex('books').where({id: req.params.id})
		.then(function(bookList) {
			var book = bookList[0];
			knex('non_fiction').insert({title: book.title, book_id: book.id})
			.then(function(){});
		});
	} 
	if (req.body.science) {
		knex('books').where({id: req.params.id})
		.then(function(bookList) {
			var book = bookList[0];
			knex('science').insert({title: book.title, book_id: book.id})
			.then(function(){});
		});
	}
	if (req.body.history) {
		knex('books').where({id: req.params.id})
		.then(function(bookList) {
			var book = bookList[0];
			knex('history').insert({title: book.title, book_id: book.id})
			.then(function(){});
		});
	} 
	res.redirect('/books');
})


module.exports = router;