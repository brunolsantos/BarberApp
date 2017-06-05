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

router.get('/all', function(req, res, next){
  Barber.find(function(err, docs){
        var myJsonString = JSON.stringify(docs);
        console.log(myJsonString);
        res.send(myJsonString);
  });
});

router.get('/remove-barber/:id',function(req, res, next){
  var id = req.params.id;
  Barber.findByIdAndRemove(id, function(err, doc){
     if(err) { throw err; }
     else{res.redirect('/')}
  });
});

router.post('/edit-barber',function(req, res, next){
var item = {
  'name': req.body.name,
  'photo': req.body.photo
}
  var id = req.body.id;
  var name = req.body.name;
  var photo = req.body.photo;

  Barber.findById(id, function(err, doc){
    if(err) { throw err; }
    doc.name = name;
    doc.photo = photo;
    doc.save(function (err, updatedTank) {
    //if (err) return handleError(err);
      res.redirect('/');
    });
  });
});

module.exports = router;
