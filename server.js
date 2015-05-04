var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/panda-api');

var pandasRouter = require('./routes/pandas.routes');

app.use(express.static('public'));

app.use('/pandas', pandasRouter);

app.listen(8000, function(){
	console.log('Listening on port 8000...');
});



