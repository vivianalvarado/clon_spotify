// Estado global
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let currentQueue = [];
let audioPlayer = new Audio();
let searchTerm = "";

const t = (key, vars) =>
  window.AppI18n ? window.AppI18n.t(key, vars) : key;

// Elementos DOM
const cardContainer = document.getElementById("card-container");
const searchInput = document.getElementById("search-input");
const sectionTitle = document.getElementById("section-title");
const noResultsDiv = document.getElementById("no-results");
const libraryContainer = document.getElementById("library-container");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const repeatBtn = document.getElementById("repeat-btn");
const progressBarBg = document.getElementById("progress-bar-bg");
const progressFill = document.getElementById("progress-fill");
const currentTimeSpan = document.getElementById("current-time");
const totalDurationSpan = document.getElementById("total-duration");
const volumeBar = document.getElementById("volume-bar");
const volumeFill = document.getElementById("volume-fill");
const volumeIcon = document.getElementById("volume-icon");
const footerSong = document.getElementById("footer-song");
const footerArtist = document.getElementById("footer-artist");
const footerThumb = document.getElementById("footer-thumb");
const panelSongTitle = document.getElementById("panel-song-title");
const panelArtistName = document.getElementById("panel-artist-name");
const panelAlbumImg = document.getElementById("panel-album-img");
const likeTrackBtn = document.getElementById("like-track");
const panelLikeBtn = document.getElementById("panel-like");
const queueList = document.getElementById("queue-list");
const navHome = document.getElementById("nav-home");
const navSearch = document.getElementById("nav-search");
const navLibrary = document.getElementById("nav-library");
const topBarHome = document.getElementById("top-bar-home");
const searchBrowseBtn = document.getElementById("search-browse-btn");
const closeLibrary = document.getElementById("close-library");
const createPlaylistBtn = document.getElementById("create-playlist-btn");

// Variables para filtros
let currentFilter = 'all';
let currentView = 'home'; // home, search, library, artists
const filterTabs = document.querySelectorAll('.filter-tab');
const filterTabsContainer = document.getElementById('filter-tabs');
const artistsContainer = document.getElementById('artists-container');
const exploreContainer = document.getElementById('explore-container');
const genresGrid = document.getElementById('genres-grid');
const greetingSection = document.getElementById('greeting-section');

// Datos de géneros musicales
const genres = [
    { name: 'Música', color: 'genre-pop', image: 'IMG/generos/musica.jpg' },
    { name: 'Podcasts', color: 'genre-urbano', image: 'IMG/generos/podcasts.jpg' },
    { name: 'Eventos en vivo', color: 'genre-latina', image: 'IMG/generos/eventos.jpg' },
    { name: 'Creado para ti', color: 'genre-rock', image: 'IMG/generos/parati.jpg' },
    { name: 'Nuevos lanzamientos', color: 'genre-indie', image: 'IMG/generos/nuevos.jpg' },
    { name: 'Spotify Sessions', color: 'genre-pop', image: 'IMG/generos/sessions.jpg' },
    { name: 'Latina', color: 'genre-latina', image: 'IMG/generos/latina.jpg' },
    { name: 'Pop', color: 'genre-electronic', image: 'IMG/generos/pop.jpg' },
    { name: 'Cumbia', color: 'genre-cumbia', image: 'IMG/generos/cumbia.jpg' },
    { name: 'Rankings', color: 'genre-reggaeton', image: 'IMG/generos/rankings.jpg' },
    { name: 'Ranking de podcasts', color: 'genre-urbano', image: 'IMG/generos/rankingpodcasts.jpg' },
    { name: 'Educación', color: 'genre-ballads', image: 'IMG/generos/educacion.jpg' },
    { name: 'Documentales', color: 'genre-metal', image: 'IMG/generos/documentales.jpg' },
    { name: 'Comedia', color: 'genre-salsa', image: 'IMG/generos/comedia.jpg' },
    { name: 'Salsa', color: 'genre-salsa', image: 'IMG/generos/salsa.jpg' },
    { name: 'Dance/Electrónica', color: 'genre-electronic', image: 'IMG/generos/dance.jpg' },
    { name: 'Rock', color: 'genre-rock', image: 'IMG/generos/rock.jpg' },
    { name: 'Reggaeton', color: 'genre-reggaeton', image: 'IMG/generos/reggaeton.jpg' },
    { name: 'Jazz', color: 'genre-jazz', image: 'IMG/generos/jazz.jpg' },
    { name: 'Clásica', color: 'genre-classical', image: 'IMG/generos/clasica.jpg' }
];

// Función para obtener artistas únicos
function getUniqueArtists() {
    const artistsMap = new Map();
    songs.forEach(song => {
        if (!artistsMap.has(song.artist)) {
            artistsMap.set(song.artist, {
                name: song.artist,
                image: song.cover,
                songs: [song]
            });
        } else {
            artistsMap.get(song.artist).songs.push(song);
        }
    });
    return Array.from(artistsMap.values());
}

// Función para cargar artistas
function loadArtists() {
    const artists = getUniqueArtists();
    const artistsGrid = document.getElementById('artists-grid');
    
    if (!artistsGrid) return;
    
    artistsGrid.innerHTML = artists.map(artist => `
        <div class="artist-card" data-artist="${artist.name}">
            <img src="${artist.image || 'https://via.placeholder.com/200'}" alt="${artist.name}">
            <h4>${artist.name}</h4>
            <p>${t("song_count", { n: artist.songs.length })}</p>
        </div>
    `).join('');
    
    // Agregar event listeners
    document.querySelectorAll('.artist-card').forEach(card => {
        card.addEventListener('click', () => {
            const artistName = card.dataset.artist;
            filterByArtist(artistName);
        });
    });
}

// Función para filtrar por artista específico
function filterByArtist(artistName) {
    const artistSongs = songs.filter(s => s.artist === artistName);
    currentView = 'home';
    if (greetingSection) greetingSection.style.display = 'block';
    if (filterTabsContainer) filterTabsContainer.style.display = 'flex';
    if (exploreContainer) exploreContainer.style.display = 'none';
    sectionTitle.innerText = artistName;
    loadSongsToCard(artistSongs);
    
    // Resetear filtros visuales
    filterTabs.forEach(t => t.classList.remove('active'));
    
    // Mostrar solo canciones, no artistas
    if (artistsContainer) artistsContainer.style.display = 'none';
    cardContainer.style.display = 'grid';
}

// Función principal de filtrado
function applyFilter(filterType) {
    currentFilter = filterType;
    
    // Actualizar UI de tabs
    filterTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.filter === filterType);
    });
    
    switch(filterType) {
        case 'all':
            currentView = 'home';
            if (greetingSection) greetingSection.style.display = 'block';
            if (filterTabsContainer) filterTabsContainer.style.display = 'flex';
            if (exploreContainer) exploreContainer.style.display = 'none';
            sectionTitle.innerText = t("greeting");
            cardContainer.style.display = 'grid';
            if (artistsContainer) artistsContainer.style.display = 'none';
            if (libraryContainer) libraryContainer.style.display = 'none';
            loadSongsToCard(songs);
            break;
            
        case 'music':
            currentView = 'home';
            if (greetingSection) greetingSection.style.display = 'block';
            if (filterTabsContainer) filterTabsContainer.style.display = 'flex';
            if (exploreContainer) exploreContainer.style.display = 'none';
            sectionTitle.innerText = t("title_music");
            cardContainer.style.display = 'grid';
            if (artistsContainer) artistsContainer.style.display = 'none';
            if (libraryContainer) libraryContainer.style.display = 'none';
            loadSongsToCard(songs);
            break;
            
        case 'artists':
            currentView = 'artists';
            if (greetingSection) greetingSection.style.display = 'block';
            if (filterTabsContainer) filterTabsContainer.style.display = 'flex';
            if (exploreContainer) exploreContainer.style.display = 'none';
            sectionTitle.innerText = t("title_artists");
            cardContainer.style.display = 'none';
            if (artistsContainer) artistsContainer.style.display = 'block';
            if (libraryContainer) libraryContainer.style.display = 'none';
            loadArtists();
            break;
    }
}

// Agregar event listeners a los filtros
function setupFilterListeners() {
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            applyFilter(tab.dataset.filter);
        });
    });
}

// Función para cargar géneros
function loadGenres() {
    if (!genresGrid) return;
    
    genresGrid.innerHTML = genres.map(genre => `
        <div class="genre-card ${genre.color}" data-genre="${genre.name.toLowerCase()}">
            <h3>${genre.name}</h3>
            <img src="${genre.image}" alt="${genre.name}" onerror="this.style.display='none'">
        </div>
    `).join('');
    
    document.querySelectorAll('.genre-card').forEach(card => {
        card.addEventListener('click', () => {
            const genreName = card.dataset.genre;
            filterByGenre(genreName);
        });
    });
}

// Función para filtrar por género
function filterByGenre(genreName) {
    sectionTitle.innerText = genreName.charAt(0).toUpperCase() + genreName.slice(1);
    const filtered = songs.filter(s => 
        s.genre && s.genre.toLowerCase().includes(genreName)
    );
    if (filtered.length === 0) {
        loadSongsToCard(songs);
    } else {
        loadSongsToCard(filtered);
    }
    showMainContent();
}

// Función para mostrar vista de Explorar (Buscar)
function showExploreView() {
    currentView = 'search';
    if (greetingSection) greetingSection.style.display = 'none';
    if (filterTabsContainer) filterTabsContainer.style.display = 'none';
    if (cardContainer) cardContainer.style.display = 'none';
    if (artistsContainer) artistsContainer.style.display = 'none';
    if (libraryContainer) libraryContainer.style.display = 'none';
    if (exploreContainer) exploreContainer.style.display = 'block';
    if (genresGrid && genresGrid.children.length === 0) {
        loadGenres();
    }
    if (searchInput) searchInput.value = '';
    searchTerm = '';
}

// Función para mostrar contenido principal (inicio)
function showHomeView() {
    currentView = 'home';
    if (greetingSection) greetingSection.style.display = 'block';
    if (filterTabsContainer) filterTabsContainer.style.display = 'flex';
    if (cardContainer) cardContainer.style.display = 'grid';
    if (exploreContainer) exploreContainer.style.display = 'none';
    if (artistsContainer) artistsContainer.style.display = 'none';
    if (libraryContainer) libraryContainer.style.display = 'none';
    sectionTitle.innerText = t("greeting");
    loadSongsToCard(songs);
}

// Función para mostrar vista de Artistas
function showArtistsView() {
    currentView = 'artists';
    if (greetingSection) greetingSection.style.display = 'block';
    if (filterTabsContainer) filterTabsContainer.style.display = 'flex';
    if (cardContainer) cardContainer.style.display = 'none';
    if (exploreContainer) exploreContainer.style.display = 'none';
    if (artistsContainer) artistsContainer.style.display = 'block';
    if (libraryContainer) libraryContainer.style.display = 'none';
    sectionTitle.innerText = t("title_artists");
    loadArtists();
}

// Función para mostrar vista principal genérica
function showMainContent() {
    if (greetingSection) greetingSection.style.display = 'block';
    if (filterTabsContainer) filterTabsContainer.style.display = 'flex';
    if (cardContainer) cardContainer.style.display = 'grid';
    if (exploreContainer) exploreContainer.style.display = 'none';
    if (artistsContainer) artistsContainer.style.display = 'none';
}

function setupLanguageMenu() {
  const btn = document.getElementById("lang-menu-btn");
  const dd = document.getElementById("lang-dropdown");
  if (!btn || !dd || !window.AppI18n) return;

  const lng = AppI18n.getLanguage();
  dd.innerHTML = AppI18n.LANGS.map(
    (l) =>
      `<li role="option" tabindex="0" data-lang="${l.code}" class="language-option${l.code === lng ? " is-selected" : ""}" aria-selected="${l.code === lng ? "true" : "false"}"><span>${l.label}</span><span class="lang-badge">${l.badge}</span></li>`,
  ).join("");

  const close = () => {
    btn.setAttribute("aria-expanded", "false");
    dd.hidden = true;
  };
  const open = () => {
    btn.setAttribute("aria-expanded", "true");
    dd.hidden = false;
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.getAttribute("aria-expanded") === "true" ? close() : open();
  });

  dd.querySelectorAll(".language-option").forEach((li) => {
    li.addEventListener("click", (e) => {
      e.stopPropagation();
      AppI18n.setLanguage(li.dataset.lang);
      close();
    });
  });

  document.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  window.addEventListener("app:languagechange", () => {
    const exploreOpen =
      exploreContainer && exploreContainer.style.display === "block";
    if (!exploreOpen) {
      const active = document.querySelector(".filter-tab.active");
      if (active) applyFilter(active.dataset.filter);
      else if (searchInput && searchInput.value.trim()) searchSongs();
    }
    const visArtists =
      artistsContainer &&
      (artistsContainer.style.display === "block" ||
        artistsContainer.style.display === "grid") &&
      currentView === "artists";
    if (visArtists) loadArtists();
    updateQueueDisplay();
  });
}

// Inicialización
function init() {
  setupLanguageMenu();
  if (window.AppI18n) AppI18n.applyToDocument();
  setupEventListeners();
  setupFilterListeners();
  applyFilter("all"); // Vista inicio: saludo, filtros visibles, explorar oculto y canciones cargadas
  loadSong(songs[0]);
  updateQueueDisplay();
  loadGenres(); // Precargar géneros
}

function loadSongsToCard(songsToShow) {
  if (!cardContainer) return;

  if (songsToShow.length === 0 && searchTerm) {
    cardContainer.style.display = "none";
    noResultsDiv.style.display = "block";
    return;
  }

  cardContainer.style.display = "grid";
  noResultsDiv.style.display = "none";

  cardContainer.innerHTML = songsToShow
    .map(
      (song, index) => `
        <div class="card" data-index="${index}" data-song-id="${song.id}">
            <div class="card-img">
                <img src="${song.cover || "https://via.placeholder.com/180"}" alt="${song.title}">
                <button class="play-btn" data-index="${index}">
                    <i class="fa-solid fa-play"></i>
                </button>
            </div>
            <h4>${song.title}</h4>
            <p>${song.artist}</p>
        </div>
    `,
    )
    .join("");

  // Agregar event listeners a los botones de reproducción
  document.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index);
      playSongAtIndex(index);
    });
  });

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
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
  if (
    !footerSong ||
    !footerArtist ||
    !footerThumb ||
    !panelSongTitle ||
    !panelArtistName ||
    !panelAlbumImg
  )
    return;

  footerSong.innerText = song.title;
  footerArtist.innerText = song.artist;
  footerThumb.src = song.cover || "https://via.placeholder.com/56";
  panelSongTitle.innerText = song.title;
  panelArtistName.innerText = song.artist;
  panelAlbumImg.src = song.cover || "https://via.placeholder.com/200";

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
    queueList.innerHTML = `<div class="queue-empty"><i class="fa-regular fa-music"></i><span>${t("queue_empty")}</span></div>`;
    return;
  }

  queueList.innerHTML = songs
    .map(
      (song, idx) => `
        <div class="queue-item ${idx === currentSongIndex ? "active" : ""}" data-index="${idx}">
            <img src="${song.cover || "https://via.placeholder.com/40"}" alt="${song.title}">
            <div class="queue-info">
                <h6>${song.title}</h6>
                <p>${song.artist}</p>
            </div>
            <button class="queue-play-btn" data-index="${idx}"><i class="fa-solid fa-play"></i></button>
        </div>
    `,
    )
    .join("");

  // Agregar estilos para queue
  const style = document.createElement("style");
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

  document.querySelectorAll(".queue-play-btn, .queue-item").forEach((el) => {
    if (el.classList.contains("queue-play-btn")) {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(el.dataset.index);
        playSongAtIndex(idx);
      });
    } else if (el.classList.contains("queue-item")) {
      el.addEventListener("click", () => {
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
    sectionTitle.innerText = t("greeting");
    loadSongsToCard(songs);
    return;
  }

  const filtered = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term),
  );

  sectionTitle.innerText = t("search_results", { term });
  loadSongsToCard(filtered);
}

function setupEventListeners() {
  // Reproducción
  playPauseBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", nextSong);
  prevBtn.addEventListener("click", prevSong);
  shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.style.color = isShuffle ? "#1db954" : "#b3b3b3";
  });
  repeatBtn.addEventListener("click", () => {
    isRepeat = !isRepeat;
    repeatBtn.style.color = isRepeat ? "#1db954" : "#b3b3b3";
  });

  // Like
  likeTrackBtn.addEventListener("click", toggleLike);
  if (panelLikeBtn) panelLikeBtn.addEventListener("click", toggleLike);

  // Barra de progreso
  audioPlayer.addEventListener("timeupdate", updateProgress);
  progressBarBg.addEventListener("click", seek);

  // Volumen
  volumeBar.addEventListener("click", (e) => {
    const rect = volumeBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioPlayer.volume = Math.min(1, Math.max(0, percent));
    volumeFill.style.width = `${audioPlayer.volume * 100}%`;
    updateVolumeIcon();
  });

  audioPlayer.volume = 0.65;
  volumeFill.style.width = "65%";

  // Eventos de audio
  audioPlayer.addEventListener("ended", () => {
    if (isRepeat) {
      audioPlayer.currentTime = 0;
      playSong();
    } else {
      nextSong();
    }
  });

  audioPlayer.addEventListener("loadedmetadata", () => {
    totalDurationSpan.innerText = formatTime(audioPlayer.duration);
  });

  // Búsqueda - MODIFICADO
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.trim();

      if (term === '') {
        showExploreView();
      } else {
        searchSongs();
        showMainContent();
      }
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim() === '') {
        showExploreView();
      }
    });
  }

  // Navegación - mejorado
  if (navHome) {
    navHome.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchInput) searchInput.value = '';
      searchTerm = '';
      sectionTitle.innerText = t("greeting");
      loadSongsToCard(songs);
      if (libraryContainer) libraryContainer.style.display = 'none';
      showHomeView();
    });
  }

  if (navSearch) {
    navSearch.addEventListener('click', (e) => {
      e.preventDefault();
      showExploreView();
      if (searchInput) searchInput.focus();
    });
  }

  if (topBarHome && navHome) {
    topBarHome.addEventListener('click', () => navHome.click());
  }

  if (searchBrowseBtn) {
    searchBrowseBtn.addEventListener('click', () => {
      showExploreView();
      if (searchInput) searchInput.focus();
    });
  }

  if (navLibrary) {
    navLibrary.addEventListener('click', (e) => {
      e.preventDefault();
      if (libraryContainer) {
        libraryContainer.style.display =
          libraryContainer.style.display === 'none' ? 'block' : 'none';
        if (libraryContainer.style.display === 'block') {
          loadLibraryContent();
        }
      }
    });
  }

  if (closeLibrary) {
    closeLibrary.addEventListener("click", () => {
      libraryContainer.style.display = "none";
    });
  }

  if (createPlaylistBtn) {
    createPlaylistBtn.addEventListener("click", () => {
      alert(t("playlist_dev"));
    });
  }

  // Tabs de biblioteca
  document.querySelectorAll(".lib-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".lib-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const tabName = tab.dataset.tab;
      document.getElementById("playlists-section").style.display =
        tabName === "playlists" ? "block" : "none";
      document.getElementById("artists-section").style.display =
        tabName === "artists" ? "block" : "none";
    });
  });
}

function loadLibraryContent() {
  const playlistsList = document.getElementById("playlists-list");
  const artistsList = document.getElementById("artists-list");

  if (playlistsList) {
    playlistsList.innerHTML = `
            <div class="library-item" data-library-id="likes">
                <div class="library-icon" style="background: #1db954;"><i class="fa-solid fa-heart"></i></div>
                <div class="library-info"><h4>${t("likes")}</h4><p>${t("song_count", { n: songs.filter((s) => s.favorite).length })}</p></div>
                <button class="library-play-btn"><i class="fa-solid fa-play"></i></button>
            </div>
            <div class="library-item" data-library-id="recent">
                <div class="library-icon" style="background: #5038a0;"><i class="fa-solid fa-clock"></i></div>
                <div class="library-info"><h4>${t("recent")}</h4><p>${t("song_count", { n: Math.min(5, songs.length) })}</p></div>
                <button class="library-play-btn"><i class="fa-solid fa-play"></i></button>
            </div>
        `;
  }

  if (artistsList) {
    const uniqueArtists = [
      ...new Map(songs.map((s) => [s.artist, s])).values(),
    ];
    artistsList.innerHTML = uniqueArtists
      .map(
        (artist) => `
            <div class="library-item">
                <div class="library-img"><img src="${artist.cover}" alt="${artist.artist}"></div>
                <div class="library-info"><h4>${artist.artist}</h4><p>${t("word_artist")}</p></div>
                <button class="library-play-btn"><i class="fa-solid fa-play"></i></button>
            </div>
        `,
      )
      .join("");
  }

  document.querySelectorAll(".library-play-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = btn.closest(".library-item");

      if (item?.dataset?.libraryId === "likes") {
        const favSongs = songs.filter((s) => s.favorite);
        if (favSongs.length > 0) {
          songs = favSongs; // Actualiza la cola con favoritos
          currentSongIndex = 0;
          loadSong(songs[0]);
          playSong();
          updateQueueDisplay();
        }
      }
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
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function updateVolumeIcon() {
  const vol = audioPlayer.volume;
  if (vol === 0) volumeIcon.className = "fa-solid fa-volume-off";
  else if (vol < 0.5) volumeIcon.className = "fa-solid fa-volume-low";
  else volumeIcon.className = "fa-solid fa-volume-high";
}

// Iniciar aplicación
init();
