
var radio = require('nrf').connect('/dev/spidev0.0', 25, 24);

radio.dataRate('250kbps');
radio.channel(0x4c);
radio.crcBytes(1);
radio.autoRetransmit({count:15, delay:4000});

radio.begin();

var b = new Buffer(1);

radio.on('ready', function () {

	console.log('Radio is ready, opening pipes for listening');

    var rx = radio.openPipe('rx', 0x1212121212, {size:2});
    //if autoack is true the pipe will fail
    var tx = radio.openPipe('tx', 0x1212121212, {autoAck:false});

    setInterval(function () {
		b.fill(100);
		console.log("Sending", b);
		tx.write(b);
	}, 1e3); // transmit every 5 seconds

    tx.on('error', function (e) {
    	console.log(e);
    })

    rx.on('data', function (data) {
    	console.log('Received message: ', data.readUInt16BE(0));
    })
    rx.on('error', function (e) {
    	console.log(e);
    })
});