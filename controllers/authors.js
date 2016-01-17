var express = require('express'),
	router = express.Router(),
	knex = require('../db/knex');

router.get('/', function(req, res) {
	knex('authors').then(function(authors) {
		if (authors.length === 0) {
			res.redirect('/authors/new');
		}
		authors.forEach(function(author) {
			knex('books').where({author_id: author.id})
			.then(function(books) {
				console.log('auths', authors);
					res.render('../views/authors/index', {authors: authors, books: books});
			});
		});
		
	});
});	

router.get('/new', function(req, res) {
	res.render('../views/authors/new');
});

router.post('/new', function(req, res) {
	knex('authors').insert({name: req.body.name}).then(function(result) {
		res.redirect('/');
	});
});

router.get('/update/:id', function(req, res) {
	knex('authors').where({id: req.params.id}).then(function(author) {
		res.render('../views/authors/update', {author:author[0]});
	});
});

router.put('/:id', function(req, res) {
    knex('authors').where({id:req.params.id}).update(req.body)
    .then(function(){
        res.redirect('/authors');
    });
});

router.delete('/delete/:id', function(req, res) {
	knex('authors').where({id:req.params.id}).del()
    .then(function(result) {
    	console.log(result);
        res.redirect('/authors');
    });
});

router.post('/:id/new-book', function(req, res) {
	knex('books').insert({title: req.body.title, author_id: req.params.id})
	.then(function(){
		res.redirect('/authors');
	});
});

module.exports = router;