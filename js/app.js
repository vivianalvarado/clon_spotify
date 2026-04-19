// Estado global
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let currentQueue = [];
let audioPlayer = new Audio();
let searchTerm = '';

// Elementos DOM
const cardContainer = document.getElementById('card-container');
const searchInput = document.getElementById('search-input');
const sectionTitle = document.getElementById('section-title');
const noResultsDiv = document.getElementById('no-results');
const libraryContainer = document.getElementById('library-container');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const progressBarBg = document.getElementById('progress-bar-bg');
const progressFill = document.getElementById('progress-fill');
const currentTimeSpan = document.getElementById('current-time');
const totalDurationSpan = document.getElementById('total-duration');
const volumeBar = document.getElementById('volume-bar');
const volumeFill = document.getElementById('volume-fill');
const volumeIcon = document.getElementById('volume-icon');
const footerSong = document.getElementById('footer-song');
const footerArtist = document.getElementById('footer-artist');
const footerThumb = document.getElementById('footer-thumb');
const panelSongTitle = document.getElementById('panel-song-title');
const panelArtistName = document.getElementById('panel-artist-name');
const panelAlbumImg = document.getElementById('panel-album-img');
const likeTrackBtn = document.getElementById('like-track');
const panelLikeBtn = document.getElementById('panel-like');
const queueList = document.getElementById('queue-list');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
const navHome = document.getElementById('nav-home');
const navLibrary = document.getElementById('nav-library');
const closeLibrary = document.getElementById('close-library');
const createPlaylistBtn = document.getElementById('create-playlist-btn');

// Inicialización
function init() {
    loadSongsToCard(songs);
    setupEventListeners();
    loadSong(songs[0]);
    updateQueueDisplay();
}

function loadSongsToCard(songsToShow) {
    if (!cardContainer) return;
    
    if (songsToShow.length === 0 && searchTerm) {
        cardContainer.style.display = 'none';
        noResultsDiv.style.display = 'block';
        return;
    }
    
    cardContainer.style.display = 'grid';
    noResultsDiv.style.display = 'none';
    
    cardContainer.innerHTML = songsToShow.map((song, index) => `
        <div class="card" data-index="${index}" data-song-id="${song.id}">
            <div class="card-img">
                <img src="${song.cover || 'https://via.placeholder.com/180'}" alt="${song.title}">
                <button class="play-btn" data-index="${index}">
                    <i class="fa-solid fa-play"></i>
                </button>
            </div>
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        </div>
    `).join('');
    
    // Agregar event listeners a los botones de reproducción
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.index);
            playSongAtIndex(index);
        });
    });
    
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index);
            playSongAtIndex(index);
        });
    });
}

function playSongAtIndex(index) {
    currentSongIndex = index;
    loadSong(songs[currentSongIndex]);
    playSong();
}

function loadSong(song) {
    if (!song) return;
    if (!footerSong || !footerArtist || !footerThumb || !panelSongTitle || !panelArtistName || !panelAlbumImg) return;
    
    footerSong.innerText = song.title;
    footerArtist.innerText = song.artist;
    footerThumb.src = song.cover || 'https://via.placeholder.com/56';
    panelSongTitle.innerText = song.title;
    panelArtistName.innerText = song.artist;
    panelAlbumImg.src = song.cover || 'https://via.placeholder.com/200';
    
    audioPlayer.src = song.audio;
    audioPlayer.load();
    
    updateLikeButton(song.favorite);
    
    if (isPlaying) {
        audioPlayer.play().catch(() => {});
    }
}

function playSong() {
    isPlaying = true;
    audioPlayer.play().catch(() => {});
    playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
}

function pauseSong() {
    isPlaying = false;
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function nextSong() {
    if (isShuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === currentSongIndex && songs.length > 1);
        currentSongIndex = newIndex;
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) playSong();
}

function updateLikeButton(isFav) {
    const heartIcon = '<i class="fa-regular fa-heart"></i>';
    const solidHeart = '<i class="fa-solid fa-heart"></i>';
    
    likeTrackBtn.innerHTML = isFav ? solidHeart : heartIcon;
    if (panelLikeBtn) panelLikeBtn.innerHTML = isFav ? solidHeart : heartIcon;
}

function toggleLike() {
    const currentSong = songs[currentSongIndex];
    if (currentSong) {
        currentSong.favorite = !currentSong.favorite;
        updateLikeButton(currentSong.favorite);
    }
}

function updateQueueDisplay() {
    if (!queueList) return;
    
    if (songs.length === 0) {
        queueList.innerHTML = '<div class="queue-empty"><i class="fa-regular fa-music"></i><span>No hay canciones en cola</span></div>';
        return;
    }
    
    queueList.innerHTML = songs.map((song, idx) => `
        <div class="queue-item ${idx === currentSongIndex ? 'active' : ''}" data-index="${idx}">
            <img src="${song.cover || 'https://via.placeholder.com/40'}" alt="${song.title}">
            <div class="queue-info">
                <h6>${song.title}</h6>
                <p>${song.artist}</p>
            </div>
            <button class="queue-play-btn" data-index="${idx}"><i class="fa-solid fa-play"></i></button>
        </div>
    `).join('');
    
    // Agregar estilos para queue
    const style = document.createElement('style');
    style.textContent = `
        .queue-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            margin-bottom: 8px;
        }
        .queue-item:hover {
            background: #282828;
        }
        .queue-item.active {
            background: #1db95420;
            border-left: 3px solid #1db954;
        }
        .queue-item img {
            width: 40px;
            height: 40px;
            border-radius: 6px;
            object-fit: cover;
        }
        .queue-info {
            flex: 1;
        }
        .queue-info h6 {
            font-size: 0.85rem;
            margin: 0;
        }
        .queue-info p {
            font-size: 0.7rem;
            color: #b3b3b3;
            margin: 0;
        }
        .queue-play-btn {
            background: #1db954;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s;
        }
        .queue-item:hover .queue-play-btn {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    document.querySelectorAll('.queue-play-btn, .queue-item').forEach(el => {
        if (el.classList.contains('queue-play-btn')) {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(el.dataset.index);
                playSongAtIndex(idx);
            });
        } else if (el.classList.contains('queue-item')) {
            el.addEventListener('click', () => {
                const idx = parseInt(el.dataset.index);
                playSongAtIndex(idx);
            });
        }
    });
}

function searchSongs() {
    const term = searchInput.value.toLowerCase();
    searchTerm = term;
    
    if (!term) {
        sectionTitle.innerText = 'Buenas tardes';
        loadSongsToCard(songs);
        return;
    }
    
    const filtered = songs.filter(song => 
        song.title.toLowerCase().includes(term) || 
        song.artist.toLowerCase().includes(term)
    );
    
    sectionTitle.innerText = `Resultados para "${term}"`;
    loadSongsToCard(filtered);
}

function setupEventListeners() {
    // Reproducción
    playPauseBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);
    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.style.color = isShuffle ? '#1db954' : '#b3b3b3';
    });
    repeatBtn.addEventListener('click', () => {
        isRepeat = !isRepeat;
        repeatBtn.style.color = isRepeat ? '#1db954' : '#b3b3b3';
    });
    
    // Like
    likeTrackBtn.addEventListener('click', toggleLike);
    if (panelLikeBtn) panelLikeBtn.addEventListener('click', toggleLike);
    
    // Barra de progreso
    audioPlayer.addEventListener('timeupdate', updateProgress);
    progressBarBg.addEventListener('click', seek);
    
    // Volumen
    volumeBar.addEventListener('click', (e) => {
        const rect = volumeBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioPlayer.volume = Math.min(1, Math.max(0, percent));
        volumeFill.style.width = `${audioPlayer.volume * 100}%`;
        updateVolumeIcon();
    });
    
    audioPlayer.volume = 0.65;
    volumeFill.style.width = '65%';
    
    // Eventos de audio
    audioPlayer.addEventListener('ended', () => {
        if (isRepeat) {
            audioPlayer.currentTime = 0;
            playSong();
        } else {
            nextSong();
        }
    });
    
    audioPlayer.addEventListener('loadedmetadata', () => {
        totalDurationSpan.innerText = formatTime(audioPlayer.duration);
    });
    
    // Búsqueda
    if (searchInput) {
        searchInput.addEventListener('input', searchSongs);
    }
    
    // Sidebar
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('expanded');
        });
    }
    
    // Navegación
    if (navHome) {
        navHome.addEventListener('click', (e) => {
            e.preventDefault();
            searchInput.value = '';
            searchTerm = '';
            sectionTitle.innerText = 'Buenas tardes';
            loadSongsToCard(songs);
            libraryContainer.style.display = 'none';
        });
    }
    
    if (navLibrary) {
        navLibrary.addEventListener('click', (e) => {
            e.preventDefault();
            libraryContainer.style.display = libraryContainer.style.display === 'none' ? 'block' : 'none';
            if (libraryContainer.style.display === 'block') {
                loadLibraryContent();
            }
        });
    }
    
    if (closeLibrary) {
        closeLibrary.addEventListener('click', () => {
            libraryContainer.style.display = 'none';
        });
    }
    
    if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener('click', () => {
            alert('Funcionalidad de crear playlist en desarrollo');
        });
    }
    
    // Tabs de biblioteca
    document.querySelectorAll('.lib-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.lib-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const tabName = tab.dataset.tab;
            document.getElementById('playlists-section').style.display = tabName === 'playlists' ? 'block' : 'none';
            document.getElementById('artists-section').style.display = tabName === 'artists' ? 'block' : 'none';
        });
    });
}

function loadLibraryContent() {
    const playlistsList = document.getElementById('playlists-list');
    const artistsList = document.getElementById('artists-list');
    
    if (playlistsList) {
        playlistsList.innerHTML = `
            <div class="library-item">
                <div class="library-icon" style="background: #1db954;"><i class="fa-solid fa-heart"></i></div>
                <div class="library-info"><h4>Tus Me Gusta</h4><p>${songs.filter(s => s.favorite).length} canciones</p></div>
                <button class="library-play-btn"><i class="fa-solid fa-play"></i></button>
            </div>
            <div class="library-item">
                <div class="library-icon" style="background: #5038a0;"><i class="fa-solid fa-clock"></i></div>
                <div class="library-info"><h4>Recientes</h4><p>${Math.min(5, songs.length)} canciones</p></div>
                <button class="library-play-btn"><i class="fa-solid fa-play"></i></button>
            </div>
        `;
    }
    
    if (artistsList) {
        const uniqueArtists = [...new Map(songs.map(s => [s.artist, s])).values()];
        artistsList.innerHTML = uniqueArtists.map(artist => `
            <div class="library-item">
                <div class="library-img"><img src="${artist.cover}" alt="${artist.artist}"></div>
                <div class="library-info"><h4>${artist.artist}</h4><p>Artista</p></div>
                <button class="library-play-btn"><i class="fa-solid fa-play"></i></button>
            </div>
        `).join('');
    }
    
    document.querySelectorAll('.library-play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = btn.closest('.library-item');
            // Aquí puedes agregar lógica para reproducir desde la biblioteca
        });
    });
}

function updateProgress() {
    if (audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressFill.style.width = `${percent}%`;
        currentTimeSpan.innerText = formatTime(audioPlayer.currentTime);
    }
}

function seek(e) {
    const rect = progressBarBg.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = percent * audioPlayer.duration;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateVolumeIcon() {
    const vol = audioPlayer.volume;
    if (vol === 0) volumeIcon.className = 'fa-solid fa-volume-off';
    else if (vol < 0.5) volumeIcon.className = 'fa-solid fa-volume-low';
    else volumeIcon.className = 'fa-solid fa-volume-high';
}

// Iniciar aplicación
init();