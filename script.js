console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio('Alan Walker - Faded.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songitem'));
let playButtons = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    { songname: "Faded", filepath: "Alan Walker - Faded.mp3", coverpath: "cover1.jpg" },
    { songname: "Unravel", filepath: "Unravel.mp3", coverpath: "cover2.jpg" },
    { songname: "Shinunoga E-Wa", filepath: "Fujii Kaze - Shinunoga E-Wa (Not a MV).mp3", coverpath: "cover3.jpg" },
    { songname: "Treat You Better", filepath: "Shawn Mendes - Treat You Better.mp3", coverpath: "cover4.jpg" },
    { songname: "Dandelions", filepath: "Ruth B. - Dandelions (Audio).mp3", coverpath: "cover5.jpg" },
    { songname: "Life Goes On", filepath: "Oliver Tree - Life Goes On [Music Video].mp3", coverpath: "cover6.jpg" },
    { songname: "Ma Meilleure Ennemie", filepath: "Stromae, Pomme - Ma Meilleure Ennemie (from Arcane Season 2) [Official Music Video].mp3", coverpath: "cover7.jpg" },
    { songname: "Sailor Song", filepath: "Gigi Perez - Sailor Song [Official Music Video].mp3", coverpath: "cover8.jpg" },
    { songname: "505", filepath: "505.mp3", coverpath: "cover9.jpg" },
    { songname: "Moth To A Flame", filepath: "Swedish House Mafia and The Weeknd - Moth To A Flame (Official Video).mp3", coverpath: "cover10.jpg" }
];

// Update song info
function loadSong(index) {
    audioElement.src = songs[index].filepath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    document.querySelector('.songinfo').innerHTML = `<img src="playing.gif" width="42px" id="gif"> ${songs[index].songname}`;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    playButtons.forEach((el) => {
        el.classList.remove('fa-pause-circle');
        el.classList.add('fa-play-circle');
    });
    document.getElementById(index).classList.remove('fa-play-circle');
    document.getElementById(index).classList.add('fa-pause-circle');
}

// Handle master play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        document.getElementById(songIndex).classList.remove('fa-pause-circle');
        document.getElementById(songIndex).classList.add('fa-play-circle');
    }
});

// Handle progress bar update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 1000);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value / 1000) * audioElement.duration;
});

// Handle individual song play
playButtons.forEach((element) => {
    element.addEventListener('click', (e) => {
        let index = parseInt(e.target.id);
        songIndex = index;
        loadSong(songIndex);
    });
});

// Handle next
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
            gif.style.opacity = 1;

});

// Handle previous
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
            gif.style.opacity = 1;

});
