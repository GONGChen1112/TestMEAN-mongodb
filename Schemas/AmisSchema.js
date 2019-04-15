var mongoose = require('mongoose');
var AmisSchema = new mongoose.Schema({
	name:{type: String},
     nameamis: {type: String},
    
 });
var model=mongoose.model('u3',AmisSchema);
module.exports =model;