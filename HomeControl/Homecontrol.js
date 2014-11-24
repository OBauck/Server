var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require('socket.io')(server);
var port = 8080;

//TODO: check if light is on
var lamp1On = false;
var lamp1Value = 0;
var clients = [];

/////////////Radio///////////////////////
var radio = require('nrf').connect('/dev/spidev0.0', 25, 24);
radio.dataRate('250kbps');
radio.channel(0x4c);
radio.crcBytes(1);
radio.autoRetransmit({count:15, delay:4000});
radio.begin();

var tx;
var b = new Buffer(1);

radio.on('ready', function () {

  console.log('Radio is ready, opening pipes for sending');

    //if autoack is true the pipe will fail
    tx = radio.openPipe('tx', 0x1212121212, {autoAck:false});

    tx.on('error', function (e) {
      console.log(e);
    })
});
///////////////Radio end///////////////////

server.listen(port);
console.log("Server listening on port", port);

app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/img", express.static(__dirname + '/img'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/page.html');
})

socket.on('connection', function(client) {
  console.log('client connected');
  clients.push(client);
  client.emit('lamp1', lamp1Value);

  client.on('lamp1Button', function(){
	if(lamp1Value != 0)
	{
		//turn off light
    b.fill(0);
    tx.write(b);
		lamp1Value = 0;
	}
	else
	{
		//turn on light
    b.fill(63);
    tx.write(b);
		lamp1Value = 63;
	}
	for(var i=0; i<clients.length; i++) {
      clients[i].emit('lamp1', lamp1Value);
    }
  })

  client.on('lamp1Dim', function(data){
  	//console.log('dim: ' + data);

  	//dim light
    b.fill(Number(data));
    //console.log('sending data: ', b);
    tx.write(b);
  	lamp1Value = data;

  	for(var i=0; i<clients.length; i++) {
      clients[i].emit('lamp1', lamp1Value);
    }

  })

  client.on('end', function(client){
  	clients.splice(clientList.indexOf(client), 1);
  })
});

