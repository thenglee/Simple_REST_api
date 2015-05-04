var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/panda-api');

var Panda = require('./models/panda');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

router.route('/')
	.get(function(req, res){
		Panda.find(function(err, pandas){
			if (err) res.send(err);

			res.json(pandas);
		});
	})
	.post(function(req, res){
		var panda = new Panda();

		panda.name = req.body.name;
		panda.description = req.body.description;

		panda.save(function(err){
			if (err) res.send(err);

			res.send('Panda created!');
		});
	});


router.route('/:panda_name')
	.get(function(req, res){
		Panda.findOne({name: req.params.panda_name}, function(err, panda){
			if (err) res.send(err);

			res.json(panda);
		});
	})
	.put(function(req, res){
		Panda.findOne({name: req.params.panda_name}, function(err, panda){
			if (err) res.send (err);

			panda.name = req.body.name;
			panda.save(function(err){
				if (err) throw err;
				res.send('Panda updated!');
			});
		});
	})
	.delete(function(req, res){
		Panda.remove({name: req.params.panda_name}, function(err, panda){
			if (err) res.send(err);

			res.send('Panda removed successfully');
		});
	});

app.use('/pandas', router);

app.listen(8000);

console.log('Listening on port 8000...');

