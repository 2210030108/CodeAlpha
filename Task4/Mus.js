// Select all the elements in the HTML page and assign them to variables
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");


let track_index = 0;
let isPlaying = false;
let updateTimer;


let curr_track = new Audio();

const tracks = {
    1: [
        { title: 'Track 1-1', artist: 'Artist 1', src: 'audio/track1-1.mp3', art: 'images/track1-1.jpg' },
        { title: 'Track 1-2', artist: 'Artist 1', src: 'audio/track1-2.mp3', art: 'images/track1-2.jpg' }
    ],
    2: [
        { title: 'Track 2-1', artist: 'Artist 2', src: 'audio/track2-1.mp3', art: 'images/track2-1.jpg' },
        { title: 'Track 2-2', artist: 'Artist 2', src: 'audio/track2-2.mp3', art: 'images/track2-2.jpg' }
    ],
    3: [
        { title: 'Track 3-1', artist: 'Artist 3', src: 'audio/track3-1.mp3', art: 'images/track3-1.jpg' },
        { title: 'Track 3-2', artist: 'Artist 3', src: 'audio/track3-2.mp3', art: 'images/track3-2.jpg' }
    ]
};


let currentAlbum = localStorage.getItem('selectedAlbum');
let track_list = tracks[currentAlbum] || [];


function updatePlayer() {
    if (track_list.length === 0) return; 

    let track = track_list[track_index];
    track_art.style.backgroundImage = `url(${track.art})`;
    track_name.textContent = track.title;
    track_artist.textContent = track.artist;
    curr_track.src = track.src;
    curr_track.load();
    curr_track.addEventListener('loadedmetadata', () => {
        updateTime(); 
        total_duration.textContent = formatTime(curr_track.duration);
    });
}


function playpauseTrack() {
    if (isPlaying) {
        curr_track.pause();
        playpause_btn.querySelector('i').className = 'fa fa-play-circle fa-5x';
    } else {
        curr_track.play();
        playpause_btn.querySelector('i').className = 'fa fa-pause-circle fa-5x';
    }
    isPlaying = !isPlaying;
}


function prevTrack() {
    track_index = (track_index > 0) ? track_index - 1 : track_list.length - 1;
    updatePlayer();
    curr_track.play();
}


function nextTrack() {
    track_index = (track_index < track_list.length - 1) ? track_index + 1 : 0;
    updatePlayer();
    curr_track.play();
}


function seekTo() {
    let seekTo = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekTo;
}

// Function to set the volume of the track
function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

// Function to format time from seconds to MM:SS
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update the UI to show current time and total duration
function updateTime() {
    curr_time.textContent = formatTime(curr_track.currentTime);
    seek_slider.value = (curr_track.currentTime / curr_track.duration) * 100;
}

// Set event listeners for the controls
playpause_btn.addEventListener('click', playpauseTrack);
next_btn.addEventListener('click', nextTrack);
prev_btn.addEventListener('click', prevTrack);

seek_slider.addEventListener('input', seekTo);
volume_slider.addEventListener('input', setVolume);

// Initialize the player with the first track
updatePlayer();

// Update the time and duration every second
curr_track.addEventListener('timeupdate', updateTime);
curr_track.addEventListener('ended', nextTrack);
