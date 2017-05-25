var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var schema = new Schema({
    name: {type: String},
    photo: {type: String}
});

module.exports = mongoose.model('Barber', schema);