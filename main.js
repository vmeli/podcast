window.addEventListener('load', function(){
	var seekbarInner  = document.querySelector(".seekbarControl .inner");
	var seekbarOuter  = document.querySelector(".seekbarControl .outer");
	var volumeControl = document.querySelector(".volumeControl .wrapper");
	var btnPlay       = document.getElementById("play");
	var btnStop       = document.getElementById("stop");
	var btnUndo       = document.getElementById("undo");
	var btnBackward   = document.getElementById("backward");
	var btnForward    = document.getElementById("forward");
	var btnVolume 	  = document.getElementById("volume");
	var iconVolume    = document.getElementById("icon-volume");
	var endTime       = document.getElementById("end");
	var starTime      = document.getElementById("start");

	var length, interval, seekbarPercentage;

	var audio = document.getElementById('audio');
	length = audio.duration;

	endTime.innerHTML = convertTime(audio.duration);

	btnPlay.addEventListener('click', playing);
	btnStop.addEventListener('click', paused);
	btnUndo.addEventListener('click', undo);

	//iconVolume.addEventListener('click', changeIconVolume);
	btnVolume.addEventListener('mousemove', volume);
	btnVolume.addEventListener('touchmove', volume);

	seekbarOuter.addEventListener('click', progressSeekBarOuter);

	//audio.addEventListener('play', messagePlay);
	//audio.addEventListener('pause', messagePause);
	audio.addEventListener('ended', messageEnded);

	function messageEnded(e) {
		console.log("publicar un ads");
	}

	function convertTime(time) {
		var minute = Math.floor(time / 60 % 60).toString().padStart(2,"0");
		var second = Math.floor(time % 60).toString().padStart(2,"0");
		return minute + ":" + second; 
	}
	
	function volume(e) {
		e.stopPropagation();
		if( e.type === 'mousemove' || e.type === 'touchmove') {
			console.log(e.type);
			audio.volume = this.value * 0.01;
			if(audio.volume == 0) {
				iconVolume.setAttribute("class", "fa fa-volume-off");
			}else {
				iconVolume.setAttribute("class", "fa fa-volume-up");
			}
			console.log(audio.volume);
		}
	}

	//function changeIconVolume(e) {
	//  	e.stopPropagation();
	//  	btnVolume.value = 0;
	// 	iconVolume.setAttribute("class", "fa fa-volume-off");
	//}

	function playing(e) {
		if(document.querySelector("#play i").classList.value.includes("fa-play")) {
			audio.play();
			document.querySelector("#play i").classList.value = "fa fa-pause fa-stack";
		}else {
			audio.pause();
			document.querySelector("#play i").classList.value = "fa fa-play fa-stack";
		}
	}

	function paused() {
		if(document.querySelector("#play i").classList.value.includes("fa-pause")) {
			document.querySelector("#play i").classList.value = "fa fa-play fa-stack";
		}
		audio.pause();
	}

	function undo() {
		starTime.innerHTML = "00:00";
		if(document.querySelector("#play i").classList.value.includes("fa-pause")) {
			audio.play();
		}
		document.querySelector(".seekbarControl .inner").removeAttribute("style");
		audio.currentTime = 0;
	}

	function getPercentage(presentTime, totalLength) {
		var clacPercentage = (presentTime / totalLength)*100;
		return parseFloat(clacPercentage.toString());
	}
	
	function updateSeekBar() {
		starTime.innerHTML = convertTime(audio.currentTime);
		seekbarPercentage = getPercentage(audio.currentTime.toFixed(2), length.toFixed(2));
		seekbarInner.style.width = seekbarPercentage + '%';
	}

	function progressSeekBarOuter(e) {
		console.log(e.type, e.target);
		if(!audio.ended && length!== undefined) {
			var seekPosition = e.pageX - seekbarOuter.offsetLeft;
			if(seekPosition >=0 && seekPosition < seekbarOuter.offsetLeft) {
				audio.currentTime = (seekPosition * audio.duration) / seekbarOuter.offsetWidth; 
				updateSeekBar();
			}
			//console.log(seekPosition, seekbarOuter.offsetLeft);
		}
	}

	interval = setInterval(function(){
		if(!audio.paused) {
			updateSeekBar();
		}

		if(audio.ended) {
			starTime.innerHTML = "00:00";
			document.querySelector(".seekbarControl .inner").removeAttribute("style");
			paused();
			// 	clearInterval(interval);
		}
		console.log("setInterval");
	},0);

})
