var express = require('express');
var router = express.Router();

/* GET admins listing. */
router.get('/', function(req, res, next) {
  if(req.session.success == true){
    res.render('admin', {success: req.session.success, errors: req.session.errors});
  }else{
    req.session.errors = 'Log in first';
    res.redirect('/login');
  }
});


router.post('/exit', function(req, res, next){
  req.session.success = false;  
  res.redirect('/login');
});

module.exports = router;
