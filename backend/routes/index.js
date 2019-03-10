var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*')
  next();
})

router.get('/', function(req, res, next) {
  res.status(200).send('Please hire Jiaxi Ye! Thank you!!!')
});

module.exports = router;
