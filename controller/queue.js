var Barber = require('../models/barber');
var ObjectId = require('mongodb').ObjectID;
/* https://stackoverflow.com/questions/17120117/sharing-modifying-a-variable-between-multiple-files-node-js */
var Queue = module.exports = {
    barbersQueue: [],
    add: function(id, name) {
        for(var i = 0; i < barbersQueue.length; i++){
            if(barbersQueue[i].id == id){
                barbersQueue[i].queue.push({name: name});
            }
        }     
    },
    remove: function(barberID, pos) {
        for(var i = 0; i < barbersQueue.length; i++){
            if(barbersQueue[i].id == barberID){
                barbersQueue[i].queue.splice(pos,1);
            }
        }
    },
    start: function(){
        barbersQueue = [];
        Barber.find(function(err, docs){
            for(var i = 0; i < docs.length; i++){                
                console.log('adding queue to barber');
                var namee = docs.name;
                console.log('barberID MONGO: '+namee);
                barbersQueue.push({id: docs.id, queue: []});
            }
        });
    },
    clearArray: function(){
        barbersQueue.length = 0;
        start();
    },
    getQueue: function(barberID){
        var queue;
        for(var i = 0; i < barbersQueue.length; i++){
            if(barbersQueue[i].id == barberID){
                queue = barbersQueue[i].queue;
                break;
            }
        }
        console.log('queue: '+queue );
        return queue;
    }

}