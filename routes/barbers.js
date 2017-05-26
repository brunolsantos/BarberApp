var express = require('express');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var router = express.Router();
var queue = require('../controller/queue');
var Barber = require('../models/barber');

/* GET barbers listing. */
router.get('/', function(req, res, next) {
  res.redirect("/admin");
});

/* RETURN INFORMATIONS ABOUT BARBER */
router.get('/:id',function(req, res, next){
  var id = req.params.id;
  var myJsonString;

  Barber.find(function(err, docs){
    for(var i = 0; i < docs.length; i++){
      if(docs[i].id == id){
        myJsonString = JSON.stringify(docs[i]);
        break;
      }
    }
    res.send(myJsonString);
  });
});

/* RETURN BARBER'S QUEUE */
router.get('/:id/queue',function(req, res, next){
  var id = req.params.id;

  console.log("id:"+id );
  var myJsonString = JSON.stringify(queue.getBarberQueue(id));
  res.send(myJsonString);
});

router.post('/:id/insert',function(req, res, next){
  var name = req.body.name;
  var id = req.params.id;
  queue.add(id, name);
  res.redirect('/barbers/'+id+"/queue");
});

router.post('/:id/remove',function(req, res, next){
  var pos = req.body.pos;
  var id = req.params.id;
});

module.exports = router;
