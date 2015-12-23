var express = require('express'),
	app = express(),
	authors = require('./controllers/authors');

app.set('view engine', 'ejs');

app.use('/authors', authors);



app.listen(3000, function() {
	console.log('Listening on port 3000');
});