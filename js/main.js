const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');

const videoControls = document.querySelector('.video-container .controls-container');

const playPauseButton = document.querySelector('.video-container .controls button.play-pause');
const playingIcon = playPauseButton.querySelector('.playing');
const PauseIcon = playPauseButton.querySelector('.paused');

const rewindButton = document.querySelector('.video-container .controls button.rewind');
const fastForwardButton = document.querySelector('.video-container .controls button.fast-forward');

const volumeButton = document.querySelector('.video-container .controls button.volume');
const volumeOnIcon = volumeButton.querySelector('.volume-on');
const volumeMutedIcon = volumeButton.querySelector('.volume-muted');

const fullScreenButton = document.querySelector('.video-container .controls button.full-screen');
const fullScreenIcon = fullScreenButton.querySelector('.full');
const minimizeScreenIcon = fullScreenButton.querySelector('.minimize');


const watchedBar = document.querySelector('.video-container .progress-controls .progress-bar .watched-bar');
const timeRemainig = document.querySelector('.video-container .progress-controls .time-remaining');
const progressBar = document.querySelector('.video-container .progress-controls .progress-bar');
console.log(video);
watchedBar.style.width = "0px";
// videoControls.style.display = "none";
videoControls.style.opacity = '0';
let controlTimeout;

dragElement(document.getElementById("pdiv"));

function dragElement(elmnt) {
    console.log(elmnt);
}

document.addEventListener("keydown", (event) => {
    if (event.code == "Space") {
        playPause();
    }

    if (event.code == "KeyM") {
        toggleMute();
    }
    if (event.code == "KeyF") {
        toggleFullScreen();
    }
    displayControls();
});

// video.addEventListener('ondrag', (e)=>{
//     console.log(e);
// })

const displayControls = () => {
    videoControls.style.opacity = '1';
    document.body.style.cursor = 'initial';
    if (controlTimeout) {
        clearTimeout(controlTimeout);
    }
    controlTimeout = setTimeout(() => {
        videoControls.style.opacity = '0';
        document.body.style.cursor = 'none';
    }, 5000);
}

document.addEventListener('mousemove', () => {
    displayControls();
})

video.addEventListener('timeupdate', (e) => {
    watchedBar.style.width = ((video.currentTime / video.duration) * 100) + "%";
    const remainingTime = video.duration - video.currentTime;
    const time = new Date(null);
    time.setSeconds(remainingTime);
    let hours = null;
    if (remainingTime >= 3600) {
        hours = (time.getHours().toString()).padStart('2', '0');
    }

    let minutes = (time.getMinutes().toString()).padStart('2', '0');
    let seconds = (time.getSeconds().toString()).padStart('2', '0');

    timeRemainig.textContent = `${hours ? hours : '00'}:${minutes}:${seconds}`;
})

PauseIcon.style.display = "none";
const playPause = () => {
    if (video.paused) {
        playingIcon.style.display = "none";
        PauseIcon.style.display = "";
        video.play();
    } else {
        PauseIcon.style.display = "none";
        playingIcon.style.display = "";
        video.pause();
    }
}
minimizeScreenIcon.style.display = "none";
const toggleFullScreen = () => {
    if (document.fullscreenElement) {
        minimizeScreenIcon.style.display = "none";
        fullScreenIcon.style.display = "";
        document.exitFullscreen();
    } else {
        minimizeScreenIcon.style.display = "";
        fullScreenIcon.style.display = "none";
        videoContainer.requestFullscreen();
    }
}

const toggleMute = () => {
    video.muted = !video.muted;
    if (video.muted) {
        volumeOnIcon.style.display = "none"
        volumeMutedIcon.style.display = ""
    } else {
        volumeOnIcon.style.display = ""
        volumeMutedIcon.style.display = "none"
    }
}

playPauseButton.addEventListener('click', playPause);

rewindButton.addEventListener('click', () => {
    video.currentTime -= 10;
});

fastForwardButton.addEventListener('click', () => {
    video.currentTime += 10;
});
volumeButton.addEventListener('click', toggleMute);

fullScreenButton.addEventListener('click', toggleFullScreen);

progressBar.addEventListener('click', (event) => {
    const pos = (event.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
    video.currentTime = pos * video.duration;
});