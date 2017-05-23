var express = require('express');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var router = express.Router();

/* GET barbers listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource (barbers)');
});

router.get('/detail', function(req, res, next) {
  res.send('Detail (barbers)');
});

router.get('/:id',function(req, res, next){
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('barbers').findOne({"_id": objectId(id)},function(err, result){
      assert.equal(null, err);
      db.close();
      res.json(result);
    });
  });
});

router.get('/all',function(){
  var resultArray = [];

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('barbers').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function(){
      db.close();
      res.json(resultArray);
    });
  });
});

router.post('/insert',function(req, res, next){
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('barbers').insertOne(item, function(err, result){
      assert.equal(null, err);
      console.log('Barber Inserted');
      db.close();
    });
  });

  res.redirect('/');
});

router.post('/update',function(req, res, next){
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('barbers').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result){
      assert.equal(null, err);
      console.log('Barber Updated');
      db.close();
    });
  });
});

router.post('/delete',function(req, res, next){
  var id = req.body.id;

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('barbers').deleteOne({"_id": objectId(id)}, function(err, result){
      assert.equal(null, err);
      console.log('Barber deleted');
      db.close();
    });
  });
});

module.exports = router;
