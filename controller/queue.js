var Barber = require('../models/barber');
/* https://stackoverflow.com/questions/17120117/sharing-modifying-a-variable-between-multiple-files-node-js */
var barbersQueue = new Array();
var Queue = module.exports = {
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
        Barber.find(function(err, docs){
            for(var i = 0; i < docs.length; i++){
                barbersQueue.push({id: docs[i].id, queue: []});
            }
        });
    },
    clearArray: function(){
        barbersQueue.length = 0;
        start();
    },
    getBarberQueue: function(barberID){
        var queue;
        for(var i = 0; i < barbersQueue.length; i++){
            if(barbersQueue[i].id == barberID){
                queue = barbersQueue[i].queue;
                break;
            }
        }
        return queue;
    },
    getAllQueues: function(){
        var queue = barbersQueue;
        return queue;
    }

}