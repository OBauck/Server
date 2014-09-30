var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/send', jsonParser, function(req, res) {
  if (req.body && req.body.number) {
    // tweets.push(req.body.tweet)
    // tweets.push(req.body.message)
    console.log("received number", req.body.number)
    //tweets.push(req.body.number)
    res.send({status:"ok", message:"Tweet received"})
  } else {
    //no tweet?
    res.send({status:"nok", message:"No tweet received"})
  }
})

module.exports = router;
