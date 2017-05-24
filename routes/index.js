var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.success == true){
    res.redirect('/admin');
  }else{
    res.render('index');
  }
});

router.get('/', function(req, res, next) {
  if(req.session.success == true){
    res.redirect('/admin');
  }else{
    res.redirect('/index');
  }
});



module.exports = router;
