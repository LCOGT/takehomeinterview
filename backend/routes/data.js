var express = require('express');
var router = express.Router();
var data = require('../dataCtrl')

router.get('/', function(req, res, next) {
  res.status(200).send(data.get())
});


router.post('/', function(req, res, next) {
  rawData = Object.keys(req.body)[0]
  check = data.add(rawData)
  if(check == 'Pass') {
    res.status(200).send(data.get())
  } else {
    res.status(400).send(check)
  }
});

module.exports = router;
