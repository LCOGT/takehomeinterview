var express = require('express');
var router = express.Router();
var data = require('../dataCtrl')

router.get('/', function(req, res, next) {
  // res.send('data');
  res.status(200).send(data.get())
});


router.post('/', function(req, res, next) {
  // res.send('data');
  check = data.add(req.body)
  if(check == 'Pass') {
    res.status(200).send(data.get())
  } else {
    res.status(400).send(check)
  }
});

module.exports = router;
