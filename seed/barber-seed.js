var Barber = require('../models/barber');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/barberapp');

var barbers = [
    new Barber({
        name: 'Bruno Lucas',
        photo: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    }),
    new Barber({
        name: 'Vitor Lucas',
        photo: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
    })
];

var done = 0;
for(var i = 0; i < barbers.length; i++){
    barbers[i].save(function(err, result) {
        done++;
        if(done === barbers.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}


