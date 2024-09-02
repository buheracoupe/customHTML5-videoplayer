const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]'); //the attribute selector is dynamic in its syntax.
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
    video.paused ? video.play() : video.pause()
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("progress", updateTime);
video.addEventListener("click", scrub);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip))
ranges.forEach((range) => range.addEventListener("change", updateRange))
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

function updateButton(){
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip(){
    console.log(this.dataset)
    video.currentTime += parseInt(this.dataset.skip)// the attribute number is a string converted it to a number with parseInt()
}

function updateRange(){
    if(this.name === "volume"){
        video.volume = this.value
        console.log(video.volume)
    }else if(this.name === "playbackRate"){
        video.playbackRate = this.value
        console.log(video.playbackRate)
    }
}
function updateTime(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`
}
function scrub(event){
    
const scrubTime = (event.offsetX/progress.offsetWidth)*video.duration
video.currentTime = scrubTime;
}
//still to add a fullscreen button
// stil to add the functionality of dragging the playback progress