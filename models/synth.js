var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SynthSchema = new Schema({
	name: String,
	Polyphony: String,
	Keyboard_keys: Number,
	website: String
});

var Synth = mongoose.model('Synth', SynthSchema);

module.exports = Synth;
