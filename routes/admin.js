var express = require('express');
var router = express.Router();

/* GET admins listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource (admin)');
});

router.get('/detail', function(req, res, next) {
  res.send('Detail (admin)');
});

module.exports = router;
