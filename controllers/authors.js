var express = require('express'),
	router = express.Router(),
	knex = require('../db/knex');

router.get('/', function(req, res) {
	knex('authors').then(function(authors) {
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
});

router.get('/update/:id', function(req, res) {
	var id = req.params.id;
	knex('authors').where({id:id}).then(function(author) {
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
    .then(function() {
        res.redirect('/authors');
    });
});

module.exports = router;