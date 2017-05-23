var Admin = require('../models/admin');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/barberapp');

var admins = [
    new Admin({
        email: 'bruno.lucas14@hotmail.com',
        password: '11111'
    }),
    new Admin({
        email: 'phiineaskk@gmail.com',
        password: '11111'
    })
];

var done = 0;
for(var i = 0; i < admins.length; i++){
    admins[i].save(function(err, result) {
        done++;
        if(done === admins.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}


