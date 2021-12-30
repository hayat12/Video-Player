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

watchedBar.style.width = "0px";
videoControls.style.opacity = '0';
let controlTimeout;

/** Listing for keyboard activity */
document.addEventListener("keydown", (event) => {
    console.log(event.code)
    if (event.code == "Space") {
        playPause();
    }

    if (event.code == "KeyM") {
        toggleMute();
    }
    if (event.code == "KeyF") {
        toggleFullScreen();
    }
    if (event.code == "ArrowRight") {
        video.currentTime += 10;
    }
    if (event.code == "ArrowLeft") {
        video.currentTime -= 10;
    }
    displayControls();
});

/** Handle the video controller to toggle hide and show while there is no activity
 * hide the video controller section if there no keyboard activity after 5 seconds
 * if there any keyboard there is no activity show the video controller section 
 */
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

/** Show video controller  section when there and mouse activity*/
document.addEventListener('mousemove', () => {
    displayControls();
})

/**
 * - time timeupdate on the process bar
 * - show the remaining time on bottom left end of process bar
 */
video.addEventListener('timeupdate', (e) => {
    const _watchedTime = ((video.currentTime / video.duration) * 100) + "%";
    watchedBar.style.width = _watchedTime;
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

/**
 * play and pause the video
 * toggle the icons [play, pause]
 * default the pause is hide
 */
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

/**
 * Minimize and full screen the video
 * toggle the minimize and full screen icon 
 */
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

/**
 * toggle the mute volume
 * toggle the volume icons
 */
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

/**
 * when click the play/pause here will call the playPause function to toggle the video
 */
playPauseButton.addEventListener('click', playPause);

/**
 * when click here to backward the video by 10 seconds
 */
rewindButton.addEventListener('click', () => {
    video.currentTime -= 10;
});

/**
 * when click here to forward the video by 10 seconds
 */
fastForwardButton.addEventListener('click', () => {
    video.currentTime += 10;
});


/**
 * when click on volume there will call this method to toggle the toggleMute 
 */
volumeButton.addEventListener('click', toggleMute);

fullScreenButton.addEventListener('click', toggleFullScreen);

/**
 * this event listener when click on process bar the playhead to move the clicked place
 */
progressBar.addEventListener('click', (event) => {
    const pos = (event.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
    video.currentTime = pos * video.duration;
});