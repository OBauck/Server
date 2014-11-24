
// var socket = io.connect('http://81.191.92.117');

// socket.on('connect', function(){
// 	console.log('connected to server')
// 	socket.send('hi')
// 	socket.on('error', function(e){ console.log('Error: ' + e) })
// 	socket.on('message', function(data){ console.log(data) }) 
// })

var socket = io.connect('192.168.0.110');
var image = document.getElementById('lamp1Image');
var dimmer = document.getElementById('lamp1Dim');
var dimVal = document.getElementById('dimVal');

socket.on('connect', function(){
	console.log('connected to server')
	socket.send('hi')
	socket.on('error', function(e){ console.log('Error: ' + e) })
	socket.on('lamp1', function(data){

		dimmer.value = data;
		dimVal.innerHTML = data;

		if(data == 0){
	        image.src = "img/bulb_off.jpg";
	    } else {
	        image.src = "img/bulb_on.jpg";
	    }
	}) 
})

function lamp1On() {
	
	//var textArea = document.getElementById('terminalWindow')
	socket.emit('lamp1Dim',63);
}
function lamp1Off() {

	socket.emit('lamp1Dim',0);
}

function lamp1Toggle() {

	socket.emit('lamp1Button');
}

function lamp1Dim() {
	var dimmer = document.getElementById("lamp1Dim");
	socket.emit('lamp1Dim',dimmer.value);
}
