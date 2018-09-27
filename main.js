var seekbarInner = document.querySelector(".seekbarControl .inner");
var seekbarOuter = document.querySelector(".seekbarControl .outer");
var volumeControl = document.querySelector(".volumeControl .wrapper");
var btnPlay = document.getElementById("play");
var btnStop = document.getElementById("stop");
var btnUndo = document.getElementById("undo");

var length, interval, seekbarPercentage;

var audio =document.getElementById('audio');
length = audio.duration;

btnPlay.addEventListener('click', playing);
btnStop.addEventListener('click', paused);
btnUndo.addEventListener('click', undo);

//audio.addEventListener('play', messagePlay);
//audio.addEventListener('pause', messagePause);
audio.addEventListener('ended', messageEnded);

function messageEnded() {
	console.log("publicar un ads");
}

function playing(e) {
	console.log(e.target);
	if(document.querySelector("#play i").classList.value.includes("fa-play")) {
		audio.play();
		document.querySelector("#play i").classList.value = "fa fa-pause fa-stack";
	}else {
		audio.pause();
		document.querySelector("#play i").classList.value = "fa fa-play fa-stack";
	}
}

function paused(e) {
	if(document.querySelector("#play i").classList.value.includes("fa-pause")) {
		document.querySelector("#play i").classList.value = "fa fa-play fa-stack";
	}
	audio.pause();
}

function undo(e) {
	if(document.querySelector("#play i").classList.value.includes("fa-pause")) {
		audio.play();
	}
	document.querySelector(".seekbarControl .inner").removeAttribute("style");
	audio.currentTime = 0;
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
