var express = require('express');
var bodyParser = require('body-parser');
var Panda = require('../models/panda');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


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

module.exports = router;