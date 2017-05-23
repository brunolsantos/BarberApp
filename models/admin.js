var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email: {type: String},
    password: {type: String}
});

module.exports = mongoose.model('Admin', schema);