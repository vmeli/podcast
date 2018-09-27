var seekbarInner = document.querySelector(".seekbarControl .inner");
var seekbarOuter = document.querySelector(".seekbarControl .outer");
var volumeControl = document.querySelector(".volumeControl .wrapper");
var btnPlay = document.getElementById("play");
var btnStop = document.getElementById("stop");
var length, interval, seekbarPercentage;

var audio =document.getElementById('audio');
length = audio.duration;

btnPlay.addEventListener('click', demo);
btnStop.addEventListener('click', demo1);

function demo(e) {
	//document.querySelector('#play i').classList.toggle('fa-stop');
	audio.play();
}

function demo1(e) {
	audio.pause();
}

interval = setInterval(function(){
	if(!audio.paused) {
		updateSeekBar();
	}
},250);

function updateSeekBar() {
	seekbarPercentage = getPercentage(audio.currentTime.toFixed(2), length.toFixed(2));
	seekbarInner.style.width = seekbarPercentage + '%';
	console.log("update");
}

function getPercentage(presentTime, totalLength) {
	var clacPercentage = (presentTime / totalLength)*100;
	return parseFloat(clacPercentage.toString());
}
