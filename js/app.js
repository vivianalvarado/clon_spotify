const songs = [
    {
        id: 1,
        title: 'La Camisa Negra',
        artist: 'Juanes',
        cover: 'assets/img/Juanes.jpg',
        audio: 'assets/audio/song1.mp3',
        favorite: false
    },
    {
        id: 2,
        title: 'Motor y Motivo',
        artist: 'Grupo 5',
        cover: 'assets/img/Grupo5.jpg',
        audio: 'assets/audio/song2.mp3',
        favorite: false
    },
    {
        id: 3,
        title: 'Canción 1',
        artist: 'Artista 1',
        cover: 'assets/img/song1.jpg',
        audio: 'assets/audio/song3.mp3',
        favorite: false
    },
    {
        id: 4,
        title: 'Canción 2',
        artist: 'Artista 2',
        cover: 'assets/img/song2.jpg',
        audio: 'assets/audio/song4.mp3',
        favorite: false
    }
];

// ============================================================
// VARIABLES GLOBALES
// ============================================================

let currentSongIndex = 0;
let isPlaying = false;
let shuffleMode = false;
let repeatMode = false;
const audio = new Audio();

// ============================================================
// ESPERAR A QUE EL DOM CARGUE
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    init();
});

// ============================================================
// FUNCIÓN PRINCIPAL
// ============================================================

function init() {
    // ============================================================
    // ELEMENTOS DEL DOM
    // ============================================================

    const playerCover = document.querySelector('.player-left img');
    const playerTitle = document.querySelector('.player-left h4');
    const playerArtist = document.querySelector('.player-left p');

    const playPauseBtn = document.querySelector('.player-center .play');
    const progressBar = document.querySelector('.progress-bar');
    const volumeSlider = document.querySelector('.volume');
    const playerCenter = document.querySelector('.player-center');

    const controlButtons = document.querySelectorAll('.player-center .control-btn');

    if (controlButtons.length < 3) {
        console.error('No se encontraron los botones del reproductor');
        return;
    }

    const prevBtn = controlButtons[0];
    const nextBtn = controlButtons[2];

    // Configurar inputs range
    progressBar.min = 0;
    progressBar.max = 100;
    progressBar.value = 0;

    volumeSlider.min = 0;
    volumeSlider.max = 1;
    volumeSlider.step = 0.1;
    volumeSlider.value = 0.7;

    audio.volume = 0.7;

    // ============================================================
    // CREAR CONTENEDOR DE TIEMPO
    // ============================================================

    const existingTimeContainer = document.querySelector('.time-container');

    if (!existingTimeContainer) {
        const timeContainer = document.createElement('div');
        timeContainer.className = 'time-container';

        timeContainer.style.display = 'flex';
        timeContainer.style.justifyContent = 'space-between';
        timeContainer.style.alignItems = 'center';
        timeContainer.style.width = '100%';
        timeContainer.style.marginTop = '5px';
        timeContainer.style.fontSize = '12px';
        timeContainer.style.color = '#b3b3b3';

        timeContainer.innerHTML = `
            <span id="currentTime">0:00</span>
            <span id="duration">0:00</span>
        `;

        playerCenter.appendChild(timeContainer);
    }

    const currentTimeDisplay = document.getElementById('currentTime');
    const durationDisplay = document.getElementById('duration');

    // ============================================================
    // FUNCIONES
    // ============================================================

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updatePlayerUI() {
        const song = songs[currentSongIndex];

        if (!song) return;

        playerCover.src = song.cover;
        playerTitle.textContent = song.title;
        playerArtist.textContent = song.artist;

        audio.src = song.audio;
    }

    function playCurrentSong() {
        audio.play()
            .then(() => {
                isPlaying = true;
                playPauseBtn.textContent = '⏸';
            })
            .catch(error => {
                console.error('Error al reproducir:', error);
            });
    }

    function pauseCurrentSong() {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = '▶';
    }

    function togglePlayPause() {
        if (isPlaying) {
            pauseCurrentSong();
        } else {
            playCurrentSong();
        }
    }

    function nextSong() {
        if (shuffleMode) {
            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() * songs.length);
            } while (randomIndex === currentSongIndex && songs.length > 1);

            currentSongIndex = randomIndex;
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }

        updatePlayerUI();

        if (isPlaying) {
            playCurrentSong();
        }
    }

    function prevSong() {
        if (shuffleMode) {
            let randomIndex;

            do {
                randomIndex = Math.floor(Math.random() * songs.length);
            } while (randomIndex === currentSongIndex && songs.length > 1);

            currentSongIndex = randomIndex;
        } else {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        }

        updatePlayerUI();

        if (isPlaying) {
            playCurrentSong();
        }
    }

    function updateProgress() {
        if (!audio.duration) return;

        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;

        currentTimeDisplay.textContent = formatTime(audio.currentTime);
        durationDisplay.textContent = formatTime(audio.duration);
    }

    function setProgress() {
        if (!audio.duration) return;

        const progressPercent = progressBar.value;
        audio.currentTime = (progressPercent / 100) * audio.duration;
    }

    function setVolume() {
        audio.volume = volumeSlider.value;
    }

    function toggleShuffle() {
        shuffleMode = !shuffleMode;

        shuffleBtn.style.color = shuffleMode ? '#1DB954' : 'white';
    }

    function toggleRepeat() {
        repeatMode = !repeatMode;

        repeatBtn.style.color = repeatMode ? '#1DB954' : 'white';
    }

    function selectSong(songId) {
        const index = songs.findIndex(song => song.id === songId);

        if (index === -1) return;

        currentSongIndex = index;
        updatePlayerUI();
        playCurrentSong();
    }

    // ============================================================
    // CREAR BOTONES SHUFFLE Y REPEAT
    // ============================================================

    let shuffleBtn = document.querySelector('.shuffle-btn');
    let repeatBtn = document.querySelector('.repeat-btn');

    if (!shuffleBtn) {
        shuffleBtn = document.createElement('button');
        shuffleBtn.className = 'control-btn shuffle-btn';
        shuffleBtn.textContent = '🔀';

        playerCenter.insertBefore(shuffleBtn, prevBtn);
    }

    if (!repeatBtn) {
        repeatBtn = document.createElement('button');
        repeatBtn.className = 'control-btn repeat-btn';
        repeatBtn.textContent = '🔁';

        playerCenter.insertBefore(repeatBtn, nextBtn.nextSibling);
    }

    // ============================================================
    // EVENTOS DE AUDIO
    // ============================================================

    audio.addEventListener('timeupdate', updateProgress);

    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', () => {
        if (repeatMode) {
            audio.currentTime = 0;
            playCurrentSong();
        } else {
            nextSong();
        }
    });

    // ============================================================
    // EVENTOS DE BOTONES
    // ============================================================

    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    progressBar.addEventListener('input', setProgress);
    volumeSlider.addEventListener('input', setVolume);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);

    // ============================================================
    // EVENTOS DE TARJETAS
    // ============================================================

    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        card.style.cursor = 'pointer';

        card.addEventListener('click', () => {
            if (songs[index]) {
                selectSong(songs[index].id);
            }
        });
    });

    const songCards = document.querySelectorAll('.song-card');

    songCards.forEach((songCard, index) => {
        const song = songs[index + 2];

        if (!song) return;

        songCard.style.cursor = 'pointer';

        songCard.addEventListener('click', () => {
            selectSong(song.id);
        });

        const playBtn = songCard.querySelector('.play-btn');

        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                selectSong(song.id);
            });
        }
    });

    // ============================================================
    // BÚSQUEDA
    // ============================================================

    const searchInput = document.querySelector('.search');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            songCards.forEach((card, index) => {
                const song = songs[index + 2];

                if (!song) return;

                const matches =
                    song.title.toLowerCase().includes(searchTerm) ||
                    song.artist.toLowerCase().includes(searchTerm);

                card.style.display = matches ? 'flex' : 'none';
            });
        });
    }

    // ============================================================
    // CARGAR PRIMERA CANCIÓN
    // ============================================================

    updatePlayerUI();

    console.log('Spotify Clone cargado correctamente');
}