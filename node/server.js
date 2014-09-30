/*var port = 8888;
var http = require('http'),
io = require('socket.io')

server = http.createServer()
server.on('request', function(request, response) {
	console.log(request.method, request.url, request.httpVersion)
  	response.writeHead(200, {"Content-Type": "text/plain"})
  	response.write("Hello World")
  	response.end()
})

server.listen(port)
console.log("Server listening on port", port)

var socket = io.listen(server)
socket.on('connection', function(client){
  console.log("client connected")
})*/

var express = require('express')
var bodyParser = require('body-parser')
var port = 8888

var app = express();
app.listen(port)
console.log("Server listening on port", port)

var jsonParser = bodyParser.json()
var tweets = []

app.get('/', function(req, res) {
  //res.send('Welcome to Node Twitter')
  
  //gives 404 error not found:
  res.sendFile('/index.html')
})

app.post('/send', jsonParser, function(req, res) {
  if (req.body && req.body.number) {
    // tweets.push(req.body.tweet)
    // tweets.push(req.body.message)
    console.log("received number")
    tweets.push(req.body.number)
    //res.send({status:"ok", message:"Tweet received"})
  } else {
    //no tweet?
    res.send({status:"nok", message:"No tweet received"})
  }
})

app.get('/tweets', function(req,res) {
  res.send(tweets)
})