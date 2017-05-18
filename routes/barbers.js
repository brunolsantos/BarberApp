var express = require('express');
var router = express.Router();

/* GET barbers listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource (barbers)');
});

router.get('/detail', function(req, res, next) {
  res.send('Detail (barbers)');
});

module.exports = router;
