var mongoose = require('mongoose');
var InfosSchema = new mongoose.Schema({
	name: {type: String},
	 SortID: {type: String},
     Famile: {type: String},
     Sex: {type: String}
    
 });
var model=mongoose.model('u1',InfosSchema);
module.exports =model;