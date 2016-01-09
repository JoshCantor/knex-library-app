var express = require('express'),
	app = express(),
	authors = require('./controllers/authors'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	methodOverride = require('method-override');

require('locus');

app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/authors', authors);


app.listen(3000, function() {
	console.log('Listening on port 3000');
});