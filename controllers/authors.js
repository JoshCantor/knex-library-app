var express = require('express'),
	router = express.Router(),
	knex = require('../db/knex');

router.get('/', function(req, res) {
	knex('authors').then(function(authors) {
		console.log('auth', authors);
		res.render('../views/authors/index', {authors: authors});
	});
});	

router.get('/new', function(req, res) {
	res.render('../views/authors/new');
});

router.post('/new', function(req, res) {
	var name = req.body.name;
	knex('authors').insert({name: name}).then(function(result) {
		res.redirect('/authors');
	});
})

router.get('/update', function(req, res) {
	res.render('../views/authors/update');
});

module.exports = router;