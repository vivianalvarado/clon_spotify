// Variables de estado
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let userPlaylists = [];
let currentVolume = 0.65;
let currentView = 'home'; // home, playlist, liked, album
let currentPlaylistId = null;
let currentSearchContext = []; // Array de canciones actuales para búsqueda
let currentDisplayedSongs = []; // Array de canciones actualmente mostradas
let currentQueue = [];
let audioPlayer = new Audio();
let searchTerm = "";

const audioPlayer = new Audio();
const t = (key, vars) =>
  window.AppI18n ? window.AppI18n.t(key, vars) : key;

// Elementos DOM
const btnCrearPlaylist = document.getElementById("create-playlist-btn");
const ListaPlayerPrevierw = document.querySelector('.library-playlist-preview');
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

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
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
    { name: 'Eventos en vivo', color: 'genre-latina', image: 'IMG/generos/eventos.jpg' },
    { name: 'Creado para ti', color: 'genre-rock', image: 'IMG/generos/parati.jpg' },
    { name: 'Nuevos lanzamientos', color: 'genre-indie', image: 'IMG/generos/nuevos.jpg' },
    { name: 'Spotify Sessions', color: 'genre-pop', image: 'IMG/generos/sessions.jpg' },
    { name: 'Latina', color: 'genre-latina', image: 'IMG/generos/latina.jpg' },
    { name: 'Pop', color: 'genre-electronic', image: 'IMG/generos/pop.jpg' },
    { name: 'Cumbia', color: 'genre-cumbia', image: 'IMG/generos/cumbia.jpg' },
    { name: 'Rankings', color: 'genre-reggaeton', image: 'IMG/generos/rankings.jpg' },
    { name: 'Ranking de podcasts', color: 'genre-urbano', image: 'IMG/generos/rankingpodcasts.jpg' },
    { name: 'Documentales', color: 'genre-metal', image: 'IMG/generos/documentales.jpg' },
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
    
    // Verificar si existe la variable songs
    if (typeof songs === 'undefined') {
        console.error('❌ ERROR: No se encontró la variable songs');
        const cardContainer = document.getElementById('card-container');
        if (cardContainer) {
            cardContainer.innerHTML = `
                <div style="text-align:center;padding:50px;color:#e74c3c;">
                    <i class="fa-solid fa-circle-exclamation" style="font-size:3rem;margin-bottom:16px;"></i>
                    <p>Error: No se encontraron las canciones.</p>
                    <p>Verifica que el archivo data.js esté cargado correctamente.</p>
                </div>
            `;
        }
        return;
    }
    if (!artistsGrid) return;
    
    if (!songs || songs.length === 0) {
        console.error('❌ ERROR: El array songs está vacío');
        return;
    }
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
    
    console.log('✅ App iniciada correctamente');
    console.log('📀 Canciones cargadas:', songs.length);
    
    // Elementos DOM
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const progressBarContainer = document.getElementById('progress-bar-bg');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeSpan = document.getElementById('current-time');
    const totalDurationSpan = document.getElementById('total-duration');
    const volumeBar = document.getElementById('volume-bar');
    const volumeFill = document.getElementById('volume-fill');
    const volumeIcon = document.getElementById('volume-icon');
    const footerThumb = document.getElementById('footer-thumb');
    const footerSong = document.getElementById('footer-song');
    const footerArtist = document.getElementById('footer-artist');
    const likeTrackBtn = document.getElementById('like-track');
    const panelAlbumImg = document.getElementById('panel-album-img');
    const panelSongTitle = document.getElementById('panel-song-title');
    const panelArtistName = document.getElementById('panel-artist-name');
    const queueList = document.getElementById('queue-list');
    const cardContainer = document.getElementById('card-container');
    const sectionTitle = document.getElementById('section-title');
    const searchInput = document.getElementById('search-input');
    const noResults = document.getElementById('no-results');
    const navHome = document.getElementById('nav-home');
    const navSearch = document.getElementById('nav-search');
    const navLibrary = document.getElementById('nav-library');
    const libraryView = document.getElementById('library-view');
    const libraryGridContainer = document.getElementById('library-grid-container');
    const libraryViewTitle = document.getElementById('library-view-title');
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    const createPlaylistBtn = document.getElementById('create-playlist-btn');
    const playlistModal = document.getElementById('playlistModal');
    const playlistNameInput = document.getElementById('playlistNameInput');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const confirmCreateBtn = document.getElementById('confirmCreateBtn');
    const playlistsContainer = document.getElementById('playlistsContainer');
    const libraryTabs = document.getElementById('library-tabs');
    
    // Menú contextual
    let activeMenu = null;
    
    // Funciones de utilidad
    function formatTime(seconds) {
        if (isNaN(seconds) || seconds === undefined) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: ${isError ? '#e74c3c' : '#1db954'};
            color: ${isError ? '#fff' : '#000'};
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 2000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        notification.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-triangle' : 'fa-check-circle'}"></i> ${escapeHtml(message)}`;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    function setActiveNav(activeId) {
        if (navHome) navHome.classList.remove('active');
        if (navSearch) navSearch.classList.remove('active');
        if (navLibrary) navLibrary.classList.remove('active');
        
        if (activeId === 'home' && navHome) navHome.classList.add('active');
        if (activeId === 'search' && navSearch) navSearch.classList.add('active');
        if (activeId === 'library' && navLibrary) navLibrary.classList.add('active');
    }
    
    // Actualizar el contexto de búsqueda y canciones mostradas
    function setCurrentSongs(songsArray, title, viewType, playlistId = null) {
        currentDisplayedSongs = songsArray;
        currentSearchContext = songsArray;
        currentView = viewType;
        currentPlaylistId = playlistId;
        
        // Actualizar el título
        if (sectionTitle) sectionTitle.textContent = title;
        
        // Renderizar las canciones
        renderCards(songsArray);
        
        // Ocultar la vista de biblioteca si está visible
        if (libraryView) libraryView.style.display = 'none';
        if (cardContainer) cardContainer.style.display = 'grid';
        
        // Limpiar búsqueda
        if (searchInput) searchInput.value = '';
        
        // Actualizar navegación activa
        if (viewType === 'home') {
            setActiveNav('home');
        }
    }
    
    // Función de búsqueda contextual
    function searchSongs(query) {
        if (!query.trim()) {
            // Si no hay query, mostrar todas las canciones del contexto actual
            renderCards(currentDisplayedSongs);
            return;
        }
        
        const filtered = currentDisplayedSongs.filter(song => 
            song.title.toLowerCase().includes(query.toLowerCase()) ||
            song.artist.toLowerCase().includes(query.toLowerCase())
        );
        renderCards(filtered);
        
        if (filtered.length === 0) {
            if (noResults) noResults.style.display = 'block';
            if (cardContainer) cardContainer.style.display = 'none';
        } else {
            if (noResults) noResults.style.display = 'none';
            if (cardContainer) cardContainer.style.display = 'grid';
        }
    }
    
    // Cerrar menú contextual
    function closeActiveMenu() {
        if (activeMenu) {
            activeMenu.remove();
            activeMenu = null;
        }
    }
    
    // Mostrar menú contextual para eliminar canción de playlist (aparece al hacer clic derecho o mantener presionado)
    function showRemoveFromPlaylistMenu(song, x, y, playlistId, playlistName) {
        closeActiveMenu();
        
        const menu = document.createElement('div');
        menu.className = 'add-to-playlist-menu';
        menu.style.position = 'fixed';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        
        // Opción para eliminar de la playlist
        const removeOption = document.createElement('div');
        removeOption.className = 'add-to-playlist-menu-item';
        removeOption.style.color = '#ff4444';
        removeOption.innerHTML = '<i class="fa-solid fa-trash"></i> <span>Eliminar de "' + escapeHtml(playlistName) + '"</span>';
        removeOption.onclick = () => {
            closeActiveMenu();
            removeSongFromPlaylist(playlistId, song);
        };
        menu.appendChild(removeOption);
        
        document.body.appendChild(menu);
        activeMenu = menu;
        
        // Cerrar al hacer clic fuera
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target)) {
                    closeActiveMenu();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 0);
    }
    
    // Eliminar canción de una playlist
    function removeSongFromPlaylist(playlistId, song) {
        const playlist = userPlaylists.find(p => p.id === playlistId);
        if (playlist) {
            // Filtrar la canción de la playlist
            const updatedSongs = playlist.songs.filter(s => s.id !== song.id);
            playlist.songs = updatedSongs;
            
            savePlaylists();
            updatePlaylistsList();
            
            showNotification(`"${song.title}" eliminada de "${playlist.name}"`);
            
            // Si estamos viendo esta playlist actualmente, actualizar la vista
            if (currentView === 'playlist' && currentPlaylistId === playlistId) {
                if (updatedSongs.length === 0) {
                    // Si la playlist quedó vacía, volver al inicio
                    showNotification(`La playlist "${playlist.name}" está vacía`, false);
                    showHomeView();
                } else {
                    // Actualizar la vista con las canciones restantes
                    setCurrentSongs(updatedSongs, playlist.name, 'playlist', playlistId);
                }
            }
        }
    }
    
    // Mostrar menú para agregar a playlist (clic normal)
    function showAddToPlaylistMenu(song, x, y) {
        closeActiveMenu();
        
        const menu = document.createElement('div');
        menu.className = 'add-to-playlist-menu';
        menu.style.position = 'fixed';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        
        // Opción para crear nueva playlist
        const createOption = document.createElement('div');
        createOption.className = 'add-to-playlist-menu-item';
        createOption.innerHTML = '<i class="fa-solid fa-plus-circle"></i> <span>Crear nueva playlist</span>';
        createOption.onclick = () => {
            closeActiveMenu();
            openCreatePlaylistModalWithSong(song);
        };
        menu.appendChild(createOption);
        
        // Separador
        const divider = document.createElement('div');
        divider.className = 'add-to-playlist-menu-divider';
        menu.appendChild(divider);
        
        // Playlists existentes (excluyendo "Canciones que me gustan" que es especial)
        const regularPlaylists = userPlaylists.filter(p => p.name !== "Canciones que me gustan");
        
        if (regularPlaylists.length === 0) {
            const emptyOption = document.createElement('div');
            emptyOption.className = 'add-to-playlist-menu-item';
            emptyOption.style.opacity = '0.6';
            emptyOption.innerHTML = '<i class="fa-regular fa-folder-open"></i> <span>No hay playlists</span>';
            menu.appendChild(emptyOption);
        } else {
            regularPlaylists.forEach(playlist => {
                const playlistOption = document.createElement('div');
                playlistOption.className = 'add-to-playlist-menu-item';
                playlistOption.innerHTML = `<i class="fa-solid fa-list"></i> <span>${escapeHtml(playlist.name)}</span>`;
                playlistOption.onclick = () => {
                    addSongToPlaylist(playlist.id, song);
                    closeActiveMenu();
                };
                menu.appendChild(playlistOption);
            });
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

/** Índice en el arreglo global `songs` (la cuadrícula puede ser un subconjunto: búsqueda, artista, etc.). */
function getMasterSongIndexFromCard(cardEl) {
  if (!cardEl) return -1;
  const id = cardEl.dataset.songId;
  if (id !== undefined && id !== "") {
    const idx = songs.findIndex((s) => String(s.id) === String(id));
    if (idx !== -1) return idx;
  }
  const local = parseInt(cardEl.dataset.index, 10);
  if (!Number.isNaN(local) && local >= 0 && local < songs.length) {
    return local;
  }
  return -1;
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

  document.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = getMasterSongIndexFromCard(btn.closest(".card"));
      if (idx >= 0) playSongAtIndex(idx);
    });
  });

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const idx = getMasterSongIndexFromCard(card);
      if (idx >= 0) playSongAtIndex(idx);
    });
  });
}

function playSongAtIndex(index) {
  if (index < 0 || index >= songs.length) return;
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
        
        document.body.appendChild(menu);
        activeMenu = menu;
        
        // Cerrar al hacer clic fuera
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target)) {
                    closeActiveMenu();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 0);
    }
    
    // Abrir modal para crear playlist con canción
    function openCreatePlaylistModalWithSong(song) {
        if (!playlistModal) return;
        playlistModal.classList.add('active');
        if (playlistNameInput) {
            playlistNameInput.value = '';
            playlistNameInput.focus();
        }
        
        const confirmHandler = () => {
            const name = playlistNameInput.value.trim();
            if (!name) {
                showNotification('Ingresa un nombre para la playlist', true);
                return;
            }
            const newPlaylist = { id: Date.now(), name: name, songs: [song] };
            userPlaylists.push(newPlaylist);
            updatePlaylistsList();
            closeCreatePlaylistModal();
            showNotification(`Playlist "${name}" creada y canción agregada`);
            savePlaylists();
            confirmCreateBtn.removeEventListener('click', confirmHandler);
        };
        
        confirmCreateBtn.removeEventListener('click', confirmHandler);
        confirmCreateBtn.addEventListener('click', confirmHandler);
    }
    
    // Agregar canción a playlist
    function addSongToPlaylist(playlistId, song) {
        const playlist = userPlaylists.find(p => p.id === playlistId);
        if (playlist) {
            const songExists = playlist.songs.some(s => s.id === song.id);
            if (songExists) {
                showNotification(`"${song.title}" ya está en "${playlist.name}"`);
            } else {
                playlist.songs.push(song);
                showNotification(`"${song.title}" agregada a "${playlist.name}"`);
                savePlaylists();
                updatePlaylistsList();
            }
        }
    }
    
    // Mostrar vista principal (Inicio)
    function showHomeView() {
        setCurrentSongs(songs, 'Buenas tardes', 'home');
        setActiveNav('home');
    }
    
    // Obtener canciones favoritas
    function getLikedSongs() {
        return songs.filter(song => song.favorite === true);
    }
    
    // Actualizar el contador de "Canciones que me gustan"
    function updateLikedSongsCounter() {
        const likedPreview = document.getElementById('liked-songs-preview');
        if (likedPreview) {
            const likedSongs = getLikedSongs();
            const existingCount = likedPreview.querySelector('.liked-count');
            if (likedSongs.length > 0) {
                if (existingCount) {
                    existingCount.textContent = likedSongs.length;
                } else {
                    const countSpan = document.createElement('span');
                    countSpan.className = 'liked-count';
                    countSpan.style.marginLeft = 'auto';
                    countSpan.style.fontSize = '0.7rem';
                    countSpan.style.color = 'var(--text-muted)';
                    countSpan.textContent = likedSongs.length;
                    likedPreview.appendChild(countSpan);
                }
            } else {
                if (existingCount) {
                    existingCount.remove();
                }
            }
        }
    }
    
    // Mostrar canciones que me gustan
    function showLikedSongs() {
        const likedSongs = getLikedSongs();
        
        if (likedSongs.length === 0) {
            showNotification('No tienes canciones marcadas como "Me gusta"', false);
            showHomeView();
            return;
        }
        
        setCurrentSongs(likedSongs, 'Canciones que me gustan ❤️', 'liked');
    }
    
    // Mostrar canciones de una playlist específica
    function showPlaylistSongs(playlistId, playlistName) {
        const playlist = userPlaylists.find(p => p.id === playlistId);
        if (playlist && playlist.songs) {
            if (playlist.songs.length === 0) {
                showNotification(`La playlist "${playlistName}" está vacía`, false);
                showHomeView();
                return;
            }
            setCurrentSongs(playlist.songs, playlistName, 'playlist', playlistId);
        } else {
            showNotification(`No se encontró la playlist "${playlistName}"`, true);
        }
    }
    
    // Mostrar vista de biblioteca (solo Playlists y Álbumes)
    function showLibraryView(title, items, type) {
        if (cardContainer) cardContainer.style.display = 'none';
        if (libraryView) libraryView.style.display = 'block';
        if (libraryViewTitle) libraryViewTitle.textContent = title;
        if (noResults) noResults.style.display = 'none';
        
        if (!libraryGridContainer) return;
        libraryGridContainer.innerHTML = '';
        
        if (!items || items.length === 0) {
            let emptyMessage = '';
            if (type === 'playlists') {
                emptyMessage = `
                    <div style="text-align:center;padding:50px;color:var(--text-sec);grid-column:1/-1;">
                        <i class="fa-solid fa-folder-open" style="font-size:3rem;margin-bottom:16px;"></i>
                        <p>No tienes playlists creadas</p>
                        <button id="create-playlist-from-library" class="modal-btn modal-btn-create" style="margin-top:16px;">+ Crear Playlist</button>
                    </div>
                `;
            } else {
                emptyMessage = `
                    <div style="text-align:center;padding:50px;color:var(--text-sec);grid-column:1/-1;">
                        <i class="fa-solid fa-folder-open" style="font-size:3rem;margin-bottom:16px;"></i>
                        <p>No hay álbumes disponibles</p>
                    </div>
                `;
            }
            libraryGridContainer.innerHTML = emptyMessage;
            
            const createBtn = document.getElementById('create-playlist-from-library');
            if (createBtn) {
                createBtn.onclick = () => openCreatePlaylistModal();
            }
            return;
        }
        
        items.forEach(item => {
            const gridItem = document.createElement('div');
            gridItem.className = 'library-grid-item';
            
            if (type === 'albums') {
                gridItem.innerHTML = `
                    <div class="item-image">
                        <img src="${item.cover}" onerror="this.src='img/default.jpg'">
                    </div>
                    <h4>${escapeHtml(item.name)}</h4>
                    <p>${escapeHtml(item.artist)} • ${item.count} canciones</p>
                `;
                gridItem.onclick = () => {
                    const albumSongs = songs.filter(song => (song.album || song.title) === item.name);
                    setCurrentSongs(albumSongs, item.name, 'album');
                };
            } else if (type === 'playlists') {
                gridItem.innerHTML = `
                    <div class="item-image">
                        <i class="fa-solid fa-list"></i>
                    </div>
                    <h4>${escapeHtml(item.name)}</h4>
                    <p>${item.songs.length} canciones</p>
                `;
                gridItem.onclick = () => {
                    showPlaylistSongs(item.id, item.name);
                };
            }
            
            libraryGridContainer.appendChild(gridItem);
        });
        
        currentView = type;
        setActiveNav('library');
    }
    
    // Obtener lista única de álbumes
    function getUniqueAlbums() {
        const albums = {};
        songs.forEach(song => {
            const albumName = song.album || song.title;
            if (!albums[albumName]) {
                albums[albumName] = {
                    name: albumName,
                    artist: song.artist,
                    cover: song.cover,
                    count: 0
                };
            }
            albums[albumName].count++;
        });
        return Object.values(albums);
    }
    
    // Funciones del reproductor
    function loadSong(song) {
        if (!song) return;
        console.log('🎵 Cargando:', song.title);
        
        if (footerSong) footerSong.innerText = song.title;
        if (footerArtist) footerArtist.innerText = song.artist;
        if (footerThumb) footerThumb.src = song.cover;
        
        if (panelSongTitle) panelSongTitle.innerText = song.title;
        if (panelArtistName) panelArtistName.innerText = song.artist;
        if (panelAlbumImg) panelAlbumImg.src = song.cover;
        
        audioPlayer.src = song.audio;
        audioPlayer.load();
        updateLikeButton(song);
        updateQueue();
    }
    
    function updateLikeButton(song) {
        if (!likeTrackBtn) return;
        if (song && song.favorite) {
            likeTrackBtn.innerHTML = '<i class="fa-solid fa-heart" style="color: #1db954;"></i>';
        } else {
            likeTrackBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        }
    }
    
    function playSong() {
        if (!songs || songs.length === 0) {
            showNotification('No hay canciones disponibles', true);
            return;
        }
        isPlaying = true;
        if (playPauseBtn) {
            const icon = playPauseBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-circle-pause';
        }
        audioPlayer.play().catch(error => {
            console.error('Error al reproducir:', error);
            showNotification('Error al reproducir la canción', true);
            isPlaying = false;
            if (playPauseBtn) {
                const icon = playPauseBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-circle-play';
            }
        });
    }
    
    function pauseSong() {
        isPlaying = false;
        if (playPauseBtn) {
            const icon = playPauseBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-circle-play';
        }
        audioPlayer.pause();
    }
    
    function togglePlay() {
        isPlaying ? pauseSong() : playSong();
    }
    
    function nextSong() {
        // Obtener las canciones actuales mostradas
        let currentSongs = currentDisplayedSongs;
        
        if (!currentSongs || currentSongs.length === 0) return;
        
        // Encontrar el índice actual dentro del contexto
        let currentContextIndex = currentSongs.findIndex(s => s.id === songs[currentSongIndex]?.id);
        if (currentContextIndex === -1) currentContextIndex = 0;
        
        if (isShuffle) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * currentSongs.length);
            } while (newIndex === currentContextIndex && currentSongs.length > 1);
            const newSong = currentSongs[newIndex];
            currentSongIndex = songs.findIndex(s => s.id === newSong.id);
        } else {
            currentContextIndex = (currentContextIndex + 1) % currentSongs.length;
            const newSong = currentSongs[currentContextIndex];
            currentSongIndex = songs.findIndex(s => s.id === newSong.id);
        }
        
        loadSong(songs[currentSongIndex]);
        if (isPlaying) playSong();
    }
    
    function prevSong() {
        // Obtener las canciones actuales mostradas
        let currentSongs = currentDisplayedSongs;
        
        if (!currentSongs || currentSongs.length === 0) return;
        
        // Encontrar el índice actual dentro del contexto
        let currentContextIndex = currentSongs.findIndex(s => s.id === songs[currentSongIndex]?.id);
        if (currentContextIndex === -1) currentContextIndex = 0;
        
        if (audioPlayer.currentTime > 3) {
            audioPlayer.currentTime = 0;
        } else {
            currentContextIndex = (currentContextIndex - 1 + currentSongs.length) % currentSongs.length;
            const newSong = currentSongs[currentContextIndex];
            currentSongIndex = songs.findIndex(s => s.id === newSong.id);
            loadSong(songs[currentSongIndex]);
            if (isPlaying) playSong();
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
    
    function updateProgress() {
        if (audioPlayer.duration && !isNaN(audioPlayer.duration)) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (currentTimeSpan) currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
            if (totalDurationSpan) totalDurationSpan.textContent = formatTime(audioPlayer.duration);
        }
    }
    
    function seekTo(e) {
        if (!progressBarContainer) return;
        const rect = progressBarContainer.getBoundingClientRect();
        const percentage = (e.clientX - rect.left) / rect.width;
        if (audioPlayer.duration) {
            audioPlayer.currentTime = percentage * audioPlayer.duration;
        }
    }
    
    function updateVolume(e) {
        if (!volumeBar) return;
        const rect = volumeBar.getBoundingClientRect();
        let percentage = (e.clientX - rect.left) / rect.width;
        percentage = Math.max(0, Math.min(1, percentage));
        currentVolume = percentage;
        audioPlayer.volume = currentVolume;
        if (volumeFill) volumeFill.style.width = `${percentage * 100}%`;
        
        if (volumeIcon) {
            if (percentage === 0) volumeIcon.className = 'fa-solid fa-volume-xmark';
            else if (percentage < 0.5) volumeIcon.className = 'fa-solid fa-volume-low';
            else volumeIcon.className = 'fa-solid fa-volume-high';
        }
    }
    
    function toggleShuffle() {
        isShuffle = !isShuffle;
        if (shuffleBtn) shuffleBtn.style.color = isShuffle ? '#1db954' : '#b3b3b3';
        showNotification(isShuffle ? '🔀 Modo aleatorio activado' : 'Modo aleatorio desactivado');
    }
    
    function toggleRepeat() {
        isRepeat = !isRepeat;
        if (repeatBtn) repeatBtn.style.color = isRepeat ? '#1db954' : '#b3b3b3';
        showNotification(isRepeat ? '🔁 Repetición activada' : 'Repetición desactivada');
    }
    
    function toggleLike() {
        const currentSong = songs[currentSongIndex];
        if (currentSong) {
            currentSong.favorite = !currentSong.favorite;
            updateLikeButton(currentSong);
            showNotification(currentSong.favorite ? '❤️ Añadido a Tus Me Gusta' : '💔 Eliminado de Tus Me Gusta');
            updateLikedSongsCounter();
            
            // Si estamos en la vista de "Canciones que me gustan", actualizar la vista
            if (currentView === 'liked') {
                const likedSongs = getLikedSongs();
                if (likedSongs.length === 0) {
                    showHomeView();
                } else {
                    setCurrentSongs(likedSongs, 'Canciones que me gustan ❤️', 'liked');
                }
            }
            
            // Si la canción está en una playlist, actualizar también esa playlist
            if (currentView === 'playlist' && currentPlaylistId) {
                const playlist = userPlaylists.find(p => p.id === currentPlaylistId);
                if (playlist) {
                    // Actualizar el estado de favorite en las canciones de la playlist
                    const updatedSongs = playlist.songs.map(s => {
                        if (s.id === currentSong.id) {
                            return { ...s, favorite: currentSong.favorite };
                        }
                        return s;
                    });
                    playlist.songs = updatedSongs;
                    savePlaylists();
                    // Actualizar la vista actual
                    setCurrentSongs(playlist.songs, playlist.name, 'playlist', currentPlaylistId);
                }
            }
        }
    }
    
    function updateQueue() {
        if (!queueList) return;
        queueList.innerHTML = '';
        let hasQueue = false;
        
        // Usar las canciones actualmente mostradas para la cola
        let currentSongs = currentDisplayedSongs;
        
        if (!currentSongs || currentSongs.length === 0) {
            queueList.innerHTML = '<div class="queue-empty"><i class="fa-regular fa-music"></i><span>No hay canciones</span></div>';
            return;
        }
        
        for (let i = 0; i < currentSongs.length; i++) {
            const song = currentSongs[i];
            if (song.id !== songs[currentSongIndex]?.id) {
                hasQueue = true;
                const queueItem = document.createElement('div');
                queueItem.className = 'queue-item';
                queueItem.innerHTML = `
                    <img src="${song.cover}" onerror="this.src='img/default.jpg'">
                    <div class="queue-item-info">
                        <h6>${escapeHtml(song.title)}</h6>
                        <p>${escapeHtml(song.artist)}</p>
                    </div>
                `;
                queueItem.onclick = () => {
                    currentSongIndex = songs.findIndex(s => s.id === song.id);
                    loadSong(songs[currentSongIndex]);
                    playSong();
                };
                queueList.appendChild(queueItem);
            }
        }
        
        if (!hasQueue) {
            queueList.innerHTML = '<div class="queue-empty"><i class="fa-regular fa-music"></i><span>No hay más canciones en cola</span></div>';
        }
    }
    
    // Renderizar tarjetas de canciones con botón de eliminar si está en modo playlist
    function renderCards(songsToShow) {
        if (!cardContainer) return;
        cardContainer.innerHTML = '';
        
        if (!songsToShow || songsToShow.length === 0) {
            if (noResults) noResults.style.display = 'block';
            if (cardContainer) cardContainer.style.display = 'none';
            return;
        }
        
        if (noResults) noResults.style.display = 'none';
        if (cardContainer) cardContainer.style.display = 'grid';
        
        const isPlaylistView = (currentView === 'playlist');
        const currentPlaylist = isPlaylistView ? userPlaylists.find(p => p.id === currentPlaylistId) : null;
        
        songsToShow.forEach((song) => {
            const originalIndex = songs.findIndex(s => s.id === song.id);
            const card = document.createElement('div');
            card.className = 'card';
            
            // Si estamos en una playlist, añadir botón de eliminar
            if (isPlaylistView && currentPlaylist) {
                card.innerHTML = `
                    <div class="card-img">
                        <img src="${song.cover}" onerror="this.src='img/default.jpg'">
                        <button class="play-btn"><i class="fa-solid fa-play"></i></button>
                        <button class="add-to-playlist-icon"><i class="fa-solid fa-plus"></i></button>
                        <button class="remove-from-playlist-icon"><i class="fa-solid fa-trash"></i></button>
                    </div>
                    <h4>${escapeHtml(song.title)}</h4>
                    <p>${escapeHtml(song.artist)}</p>
                `;
                
                const removeBtn = card.querySelector('.remove-from-playlist-icon');
                if (removeBtn) {
                    removeBtn.onclick = (e) => {
                        e.stopPropagation();
                        if (confirm(`¿Eliminar "${song.title}" de "${currentPlaylist.name}"?`)) {
                            removeSongFromPlaylist(currentPlaylistId, song);
                        }
                    };
                }
            } else {
                card.innerHTML = `
                    <div class="card-img">
                        <img src="${song.cover}" onerror="this.src='img/default.jpg'">
                        <button class="play-btn"><i class="fa-solid fa-play"></i></button>
                        <button class="add-to-playlist-icon"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <h4>${escapeHtml(song.title)}</h4>
                    <p>${escapeHtml(song.artist)}</p>
                `;
            }
            
            const playBtn = card.querySelector('.play-btn');
            if (playBtn) {
                playBtn.onclick = (e) => {
                    e.stopPropagation();
                    currentSongIndex = originalIndex;
                    loadSong(songs[currentSongIndex]);
                    playSong();
                    updateQueue();
                };
            }
            
            const addToPlaylistBtn = card.querySelector('.add-to-playlist-icon');
            if (addToPlaylistBtn) {
                addToPlaylistBtn.onclick = (e) => {
                    e.stopPropagation();
                    const rect = addToPlaylistBtn.getBoundingClientRect();
                    showAddToPlaylistMenu(song, rect.right + 10, rect.top);
                };
            }
            
            card.onclick = () => {
                currentSongIndex = originalIndex;
                loadSong(songs[currentSongIndex]);
                playSong();
                updateQueue();
            };
            
            cardContainer.appendChild(card);
        });
        
        console.log('✅ Tarjetas renderizadas:', songsToShow.length);
    }
    
    // Playlists
    function openCreatePlaylistModal() {
        if (!playlistModal) return;
        playlistModal.classList.add('active');
        if (playlistNameInput) playlistNameInput.value = '';
        if (playlistNameInput) playlistNameInput.focus();
        
        const confirmHandler = () => {
            const name = playlistNameInput.value.trim();
            if (!name) {
                showNotification('Ingresa un nombre para la playlist', true);
                return;
            }
            userPlaylists.push({ id: Date.now(), name: name, songs: [] });
            updatePlaylistsList();
            closeCreatePlaylistModal();
            showNotification(`Playlist "${name}" creada`);
            savePlaylists();
            confirmCreateBtn.removeEventListener('click', confirmHandler);
        };
        
        confirmCreateBtn.removeEventListener('click', confirmHandler);
        confirmCreateBtn.addEventListener('click', confirmHandler);
    }
    
    function closeCreatePlaylistModal() {
        if (playlistModal) playlistModal.classList.remove('active');
    }
    
    // Función para actualizar la lista de playlists en el sidebar (SIN DUPLICAR)
    function updatePlaylistsList() {
        if (!playlistsContainer) return;
        
        // Eliminar solo los elementos dinámicos (no eliminar el de "Canciones que me gustan")
        const dynamicItems = playlistsContainer.querySelectorAll('.dynamic-playlist');
        dynamicItems.forEach(el => el.remove());
        
        // Verificar si ya existe el elemento de "Canciones que me gustan"
        let likedPreview = document.getElementById('liked-songs-preview');
        
        if (!likedPreview) {
            // Crear "Canciones que me gustan" solo si no existe
            likedPreview = document.createElement('div');
            likedPreview.className = 'preview-item';
            likedPreview.id = 'liked-songs-preview';
            likedPreview.innerHTML = `
                <i class="fa-solid fa-heart" style="color: #1db954;"></i>
                <span>Canciones que me gustan</span>
            `;
            likedPreview.onclick = () => {
                showLikedSongs();
            };
            playlistsContainer.appendChild(likedPreview);
        }
        
        // Actualizar el contador
        const likedSongs = getLikedSongs();
        const existingCount = likedPreview.querySelector('.liked-count');
        if (likedSongs.length > 0) {
            if (existingCount) {
                existingCount.textContent = likedSongs.length;
            } else {
                const countSpan = document.createElement('span');
                countSpan.className = 'liked-count';
                countSpan.style.marginLeft = 'auto';
                countSpan.style.fontSize = '0.7rem';
                countSpan.style.color = 'var(--text-muted)';
                countSpan.textContent = likedSongs.length;
                likedPreview.appendChild(countSpan);
            }
        } else {
            if (existingCount) {
                existingCount.remove();
            }
        }
        
        // Filtrar playlists que no sean "Canciones que me gustan"
        const regularPlaylists = userPlaylists.filter(p => p.name !== "Canciones que me gustan");
        
        if (regularPlaylists.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'preview-item dynamic-playlist';
            empty.style.opacity = '0.6';
            empty.style.cursor = 'default';
            empty.innerHTML = '<i class="fa-solid fa-folder-open"></i><span>Sin playlists aún</span>';
            playlistsContainer.appendChild(empty);
            return;
        }
        
        regularPlaylists.forEach(playlist => {
            const item = document.createElement('div');
            item.className = 'preview-item dynamic-playlist';
            item.innerHTML = `
                <i class="fa-solid fa-music"></i>
                <span>${escapeHtml(playlist.name)}</span>
                <button class="delete-playlist-btn"><i class="fa-solid fa-trash"></i></button>
            `;
            item.onclick = (e) => {
                if (!e.target.closest('.delete-playlist-btn')) {
                    showPlaylistSongs(playlist.id, playlist.name);
                }
            };
            const deleteBtn = item.querySelector('.delete-playlist-btn');
            if (deleteBtn) {
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (confirm('¿Eliminar esta playlist?')) {
                        userPlaylists = userPlaylists.filter(p => p.id !== playlist.id);
                        updatePlaylistsList();
                        savePlaylists();
                        showNotification('Playlist eliminada');
                        // Si estábamos viendo esa playlist, volver al inicio
                        if (currentView === 'playlist' && currentPlaylistId === playlist.id) {
                            showHomeView();
                        }
                    }
                };
            }
            playlistsContainer.appendChild(item);
        });
    }
    
    function savePlaylists() {
        localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
    }
    
    function loadSavedPlaylists() {
        const saved = localStorage.getItem('userPlaylists');
        if (saved) {
            try {
                userPlaylists = JSON.parse(saved);
                updatePlaylistsList();
            } catch (e) {
                console.error('Error cargando playlists:', e);
            }
        }
    }
    
    function goToHome() {
        showHomeView();
        if (searchInput) searchInput.value = '';
        if (libraryView) libraryView.style.display = 'none';
        if (cardContainer) cardContainer.style.display = 'grid';
    }
    
    // Configurar eventos
    function setupEvents() {
        // Navegación
        if (navHome) {
            navHome.addEventListener('click', function(e) {
                e.preventDefault();
                goToHome();
            });
        }
        
        if (navSearch) {
            navSearch.addEventListener('click', function(e) {
                e.preventDefault();
                if (searchInput) {
                    searchInput.focus();
                    searchInput.scrollIntoView({ behavior: 'smooth' });
                }
                setActiveNav('search');
                goToHome();
            });
        }
        
        if (navLibrary) {
            navLibrary.addEventListener('click', function(e) {
                e.preventDefault();
                // Mostrar la biblioteca con pestañas (Playlists y Álbumes)
                const filteredPlaylists = userPlaylists.filter(p => p.name !== "Canciones que me gustan");
                showLibraryView('Playlists', filteredPlaylists, 'playlists');
                
                // Configurar pestañas
                if (libraryTabs) {
                    const tabs = libraryTabs.querySelectorAll('.lib-tab');
                    tabs.forEach(tab => {
                        tab.onclick = () => {
                            tabs.forEach(t => t.classList.remove('active'));
                            tab.classList.add('active');
                            const tabName = tab.getAttribute('data-tab');
                            if (tabName === 'playlists') {
                                const filtered = userPlaylists.filter(p => p.name !== "Canciones que me gustan");
                                showLibraryView('Playlists', filtered, 'playlists');
                            } else if (tabName === 'albums') {
                                showLibraryView('Álbumes', getUniqueAlbums(), 'albums');
                            }
                        };
                    });
                }
            });
        }
        
        // Botón volver
        if (backToHomeBtn) {
            backToHomeBtn.addEventListener('click', () => {
                goToHome();
            });
        }
        
        // Botones del reproductor
        if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
        if (prevBtn) prevBtn.addEventListener('click', prevSong);
        if (nextBtn) nextBtn.addEventListener('click', nextSong);
        if (shuffleBtn) shuffleBtn.addEventListener('click', toggleShuffle);
        if (repeatBtn) repeatBtn.addEventListener('click', toggleRepeat);
        if (likeTrackBtn) likeTrackBtn.addEventListener('click', toggleLike);
        if (progressBarContainer) progressBarContainer.addEventListener('click', seekTo);
        if (volumeBar) volumeBar.addEventListener('click', updateVolume);
        
        if (volumeIcon) {
            volumeIcon.addEventListener('click', () => {
                if (audioPlayer.volume > 0) {
                    audioPlayer.volume = 0;
                    if (volumeFill) volumeFill.style.width = '0%';
                    volumeIcon.className = 'fa-solid fa-volume-xmark';
                } else {
                    audioPlayer.volume = currentVolume;
                    if (volumeFill) volumeFill.style.width = `${currentVolume * 100}%`;
                    if (currentVolume < 0.5) volumeIcon.className = 'fa-solid fa-volume-low';
                    else volumeIcon.className = 'fa-solid fa-volume-high';
                }
            });
        }
        
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', () => {
            if (isRepeat) {
                audioPlayer.currentTime = 0;
                playSong();
            } else {
                nextSong();
            }
        });
        audioPlayer.addEventListener('loadedmetadata', () => {
            if (totalDurationSpan) totalDurationSpan.textContent = formatTime(audioPlayer.duration);
        });
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => searchSongs(e.target.value));
        }
        
        if (createPlaylistBtn) {
            createPlaylistBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openCreatePlaylistModal();
            });
        }
        
        if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeCreatePlaylistModal);
        
        if (playlistModal) {
            playlistModal.addEventListener('click', (e) => {
                if (e.target === playlistModal) closeCreatePlaylistModal();
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && playlistModal && playlistModal.classList.contains('active')) {
                closeCreatePlaylistModal();
            }
        });
    }
    
    // Inicializar
    function init() {
        console.log('🚀 Inicializando aplicación...');
        setupEvents();
        
        audioPlayer.volume = currentVolume;
        if (volumeFill) volumeFill.style.width = `${currentVolume * 100}%`;
        
        // Inicializar con todas las canciones
        currentDisplayedSongs = songs;
        currentSearchContext = songs;
        
        renderCards(songs);
        loadSong(songs[0]);
        loadSavedPlaylists();
        showHomeView();
        
        console.log('✅ App lista!');
    }
    
    init();
});
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
      const nombre = prompt("¿Cómo se llamará tu nueva playlist?");
      if (nombre && nombre.trim() !== "") {
        crarNuevaPlaylistUI(nombre);
        // Lógica para crear la nueva playlist
      }

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

// Botón toggle del sidebar
const sidebarEl = document.getElementById('sidebar');
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');

function toggleSidebar() {
  sidebarEl.classList.toggle('expanded');
}

function closeSidebar() {
  sidebarEl.classList.remove('expanded');
}

// Botón toggle principal (dentro del sidebar)
if (sidebarToggleBtn && sidebarEl) {
  sidebarToggleBtn.addEventListener('click', toggleSidebar);
}

// Overlay (clic fuera cierra el sidebar en móvil)
if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', closeSidebar);
}

// Botón hamburger en top bar (visible solo en <480px)
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleSidebar);
}

// Mostrar/ocultar botón hamburger según tamaño
function handleMobileMenu() {
  if (!mobileMenuBtn) return;
  if (window.innerWidth <= 480) {
    mobileMenuBtn.style.display = 'flex';
  } else {
    mobileMenuBtn.style.display = 'none';
    // Cerrar drawer si se amplía la pantalla
    if (window.innerWidth > 480) closeSidebar();
  }
}

handleMobileMenu();
window.addEventListener('resize', handleMobileMenu);
// --- PARTE //3: Función para insertar la playlist en la interfaz ---
function crearNuevaPlaylistUI(nombre) {
    const listaPlaylistsPreview = document.querySelector('.library-playlists-preview');
    
    if (!listaPlaylistsPreview) return;

    const div = document.createElement('div');
    div.classList.add('preview-item');
    
    div.innerHTML = `
        <i class="fa-solid fa-music"></i>
        <span class="nav-text">${nombre}</span>
    `;

    listaPlaylistsPreview.appendChild(div);
}
// Iniciar aplicación
init();