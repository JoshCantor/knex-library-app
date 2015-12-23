var express = require('express'),
	router = express.Router();

router.get('/', function(req, res) {
	res.render('../views/authors/index');
});	

router.get('/new', function(req, res) {
	res.render('../views/authors/new');
});

router.get('/update', function(req, res) {
	res.render('../views/authors/update');
});

module.exports = router;