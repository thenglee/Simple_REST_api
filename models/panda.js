var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PandaSchema = new Schema({
	name: String,
	description: String
});

module.exports = mongoose.model('Panda', PandaSchema);
