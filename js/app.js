// solo es una referencia pero creo que falta (att. jose luis)

// 1. Variables de estado
let currentSongIndex = 0;
let isPlaying = false;
const audioPlayer = new Audio();

// 2. Referencias al DOM (Selectores basados en tu HTML)
const playBtn = document.querySelector('.control-btn.play');
const prevBtn = document.querySelector('.player-center .control-btn:first-child');
const nextBtn = document.querySelector('.player-center .control-btn:last-of-type');
const progressBar = document.querySelector('.progress-bar');
const volumeBar = document.querySelector('.volume');

const currentImg = document.querySelector('.player-left img');
const currentTitle = document.querySelector('.player-left h4');
const currentArtist = document.querySelector('.player-left p');

// Seleccionamos las tarjetas de canciones (puedes añadir más si generas el HTML dinámicamente)
const songCards = document.querySelectorAll('.song-card');

// 3. Funciones de Control

function loadSong(song) {
    currentTitle.innerText = song.title;
    currentArtist.innerText = song.artist;
    currentImg.src = song.cover;
    audioPlayer.src = song.audio;
}

function playSong() {
    isPlaying = true;
    playBtn.innerText = '⏸'; // Cambia el icono a pausa
    audioPlayer.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerText = '▶'; // Cambia el icono a play
    audioPlayer.pause();
}

function togglePlay() {
    isPlaying ? pauseSong() : playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
}

// 4. Event Listeners

// Botones principales
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Actualizar barra de progreso mientras suena la música
audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
    }
});

// Cambiar tiempo de la canción al arrastrar la barra
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value * audioPlayer.duration) / 100;
    audioPlayer.currentTime = seekTime;
});

// Control de volumen
volumeBar.addEventListener('input', () => {
    audioPlayer.volume = volumeBar.value / 100;
});

// Reproducir canción al hacer clic en las tarjetas de la lista (index-based)
songCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Asumiendo que las tarjetas en el HTML siguen el mismo orden que en data.js
        currentSongIndex = index; 
        loadSong(songs[currentSongIndex]);
        playSong();
    });
});

// Cuando la canción termina, pasar a la siguiente automáticamente
audioPlayer.addEventListener('ended', nextSong);

// 5. Inicialización
// Cargamos la primera canción del array al iniciar
loadSong(songs[currentSongIndex]);