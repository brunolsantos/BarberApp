var express = require('express');
var mongoose = require('mongoose');
var assert = require('assert');
var router = express.Router();
var Admin = require('../models/admin');

router.get('/', function(req, res, next){
  if(req.session.success == true){
    res.redirect('/admin');
  }else{
    res.render('login', {title: 'Login Form Validation', success: req.session.success, errors: req.session.errors});
    req.session.errors = null;
  }
});

router.post('/submit', function(req, res, next){
  /*
    CHECK VALIDATORS
    https://github.com/chriso/validator.js#validators
   */
  req.check('email', 'Invalid Email Address').isEmail();
  req.check('password', 'Password is Invalid').isLength({min: 4});

  
  var errors = req.validationErrors();
  if(errors){
    req.session.errors = errors;
    req.session.success = false;
    res.redirect('/login');
  }else{
    var password = req.body.password; 
    var email = req.body.email;
    checkAdmin(email,password, res, req);
  }      
  
});

function checkAdmin(email, password, res, req){
  Admin.find(function(err, docs){
    console.log('docs: '+docs);
    for(var i = 0; i < docs.length; i++){
      if((email == docs[i].email) && (password == docs[i].password)){
        console.log('email and password = true');
        req.session.success = true;
        res.redirect('/admin');
        break;
      }
    }
    if(req.session.success != true){
      req.session.success = false;
      res.redirect('/login');
    }
  });
}

module.exports = router;