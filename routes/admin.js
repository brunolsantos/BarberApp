var express = require('express');
var router = express.Router();
var Barber = require('../models/barber');
var Admin = require('../models/admin');
var queue = require('../controller/queue');

/* GET admins listing. */
router.get('/', function(req, res, next) {
  if(req.session.success == true){
    Barber.find(function(err, docs){
      res.render('admin', {success: req.session.success, errors: req.session.errors, barbers: docs });
      queue.start();
    });
    
  }else{
    req.session.errors = 'Log in first';
    res.redirect('/index');
  }
});


router.get('/exit', function(req, res, next){
  req.session.success = false;  
  res.redirect('/index');
});

router.post('/add-barber', function(req, res, next){
  var barbers = [
    new Barber({
        name: req.body.name,
        photo: req.body.photo
    })
  ];
  barbers[0].save(function(err, result){
    console.log('results: '+result);
  });
  res.redirect('/');
});

router.post('/add-admin', function(req, res, next){

  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);

  var errors = req.validationErrors();

  if (errors) {
    req.session.errors = errors;
    res.redirect('/admin');
  }else{
    var admin = [
      new Admin({
        email: req.body.email,
        password: req.body.password
      })
    ];
    admin[0].save(function(err, result){
      console.log('results: '+result);
    });
    console.log('req.body.email: '+req.body.email);
    console.log('req.body.password: '+req.body.password);
    res.redirect('/admin');
  }
  
});

module.exports = router;
