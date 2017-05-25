var express = require('express');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var router = express.Router();
var queue = require('../controller/queue');

/* GET barbers listing. */
router.get('/', function(req, res, next) {
  queue.getQueue();
  res.redirect("/admin");
});

router.get('/:id',function(req, res, next){
  /* RETURN INFORMATIONS ABOUT BARBER */
});

router.get('/:id/queue',function(req, res, next){
  /* RETURN QUEUE OF BARBER */
});

router.post('/:id/insert',function(req, res, next){
  v

  res.redirect('admin');
});

router.post('/remove',function(req, res, next){
  /* REMOVE NAME FROM QUEUE
    NEED: BARBER ID, NAME POSITION */
});

module.exports = router;
