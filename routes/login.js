var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.render('login', {title: 'Login Form Validation', success: req.session.success, errors: req.session.errors});
  req.session.errors = null;
});

router.post('/submit', function(req, res, next){
  /*
    CHECK VALIDATORS
    https://github.com/chriso/validator.js#validators
   */
  req.check('email', 'Invalid Email Address').isEmail();
  req.check('password', 'Password is Invalid').isLength({min: 4}).equals(req.body.confirmPassword);
  
  var errors = req.validationErrors();
  if(errors){
    req.session.errors = errors;
    req.session.success = false;
  }else{
    req.session.success = true;
  }

  res.redirect('/login');
});

module.exports = router;