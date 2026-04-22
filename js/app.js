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
let currentFilter = 'all';
let recentSongIds = [];
let playCounts = {};
let homeSectionsExpanded = {};
let forYouAutoSlideTimer = null;
// Variables para Conectar Dispositivo
let currentDevice = 'this-computer';
let isConnecting = false;
let availableDevices = [];

const audioPlayer = new Audio();

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
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
    
    if (!songs || songs.length === 0) {
        console.error('❌ ERROR: El array songs está vacío');
        return;
    }
    
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
    const panelLikeBtn = document.getElementById('panel-like');
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
    const staticPreviewItems = document.querySelectorAll('.library-playlists-preview .preview-item');
    const staticLikedPreview = staticPreviewItems[0] || null;
    const staticRecentPreview = staticPreviewItems[1] || null;
    const languageSwitcher = document.getElementById('language-switcher');
    const langMenuBtn = document.getElementById('lang-menu-btn');
    const langDropdown = document.getElementById('lang-dropdown');
    const filterTabs = document.getElementById('filter-tabs');
    const artistsContainer = document.getElementById('artists-container');
    const artistsGrid = document.getElementById('artists-grid');
    const exploreContainer = document.getElementById('explore-container');
    const topBarHomeBtn = document.getElementById('top-bar-home');
    const homeSectionsContainer = document.getElementById('home-sections');
    
    // Elementos del Mini Reproductor
    const miniPlayerBtn = document.getElementById('mini-player-btn');
    const miniPlayerModal = document.getElementById('miniPlayerModal');
    const miniPlayerClose = document.getElementById('mini-player-close');
    const miniPlayerAlbum = document.getElementById('mini-player-album');
    const miniPlayerTitle = document.getElementById('mini-player-title');
    const miniPlayerArtist = document.getElementById('mini-player-artist');
    const miniPlayBtn = document.getElementById('mini-play-btn');
    const miniPrevBtn = document.getElementById('mini-prev-btn');
    const miniNextBtn = document.getElementById('mini-next-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    // elemento para letras 
    const lyricsBtn = document.getElementById('lyrics-btn');

    // Elementos para Conectar Dispositivo
    const connectDeviceBtn = document.getElementById('connect-device-btn');
    const connectDeviceModal = document.getElementById('connectDeviceModal');
    const connectDeviceClose = document.getElementById('connect-device-close');
    const devicesList = document.getElementById('devices-list');
    const refreshDevicesBtn = document.getElementById('refresh-devices-btn');
    
    // Menú contextual
    let activeMenu = null;
    let isLanguageMenuOpen = false;
    let isMiniPlayerOpen = false;
    let isMiniPlayerFullscreen = false;

    // Lista simulada de dispositivos disponibles
    const defaultDevices = [
        { id: 'this-computer', name: 'Este equipo', type: 'computer', icon: 'fa-desktop', status: 'Conectado' },
        { id: 'phone-1', name: 'Samsung Galaxy S23', type: 'phone', icon: 'fa-mobile-screen', status: 'Disponible' },
        { id: 'tablet-1', name: 'iPad Pro', type: 'tablet', icon: 'fa-tablet-screen-button', status: 'Disponible' },
        { id: 'speaker-1', name: 'Audiora Speaker', type: 'speaker', icon: 'fa-volume-high', status: 'Disponible' },
        { id: 'tv-1', name: 'Smart TV LG', type: 'tv', icon: 'fa-tv', status: 'Disponible' },
        { id: 'car-1', name: 'Android Auto', type: 'car', icon: 'fa-car', status: 'Disponible' }
    ];
    
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
            background: ${isError ? '#e74c3c' : '#9b4dff'};
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

    function hideHomeSections() {
        if (homeSectionsContainer) homeSectionsContainer.style.display = 'none';
    }

    function showHomeSections() {
        if (!homeSectionsContainer) return;
        homeSectionsContainer.style.display = 'block';
    }

    function stopForYouAutoSlide() {
        if (forYouAutoSlideTimer) {
            clearInterval(forYouAutoSlideTimer);
            forYouAutoSlideTimer = null;
        }
    }

    function startForYouAutoSlide() {
        stopForYouAutoSlide();
        const forYouGrid = homeSectionsContainer
            ? homeSectionsContainer.querySelector('.home-section--for-you .home-section-grid')
            : null;
        if (!forYouGrid) return;

        const loopWidth = Number(forYouGrid.dataset.loopWidth || 0);
        if (!loopWidth) return;

        forYouAutoSlideTimer = setInterval(() => {
            forYouGrid.scrollLeft += 2;
            if (forYouGrid.scrollLeft >= loopWidth) {
                forYouGrid.scrollLeft -= loopWidth;
            }
        }, 16);

        forYouGrid.onmouseenter = stopForYouAutoSlide;
        forYouGrid.onmouseleave = startForYouAutoSlide;
    }

    function getHomeGreetingTitle() {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) return 'Buenos días';
        if (currentHour >= 12 && currentHour < 19) return 'Buenas tardes';
        return 'Buenas noches';
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
        if (artistsContainer) artistsContainer.style.display = 'none';
        if (exploreContainer) exploreContainer.style.display = 'none';
        if (cardContainer) cardContainer.style.display = 'grid';
        hideHomeSections();
        
        // Limpiar búsqueda
        if (searchInput) searchInput.value = '';
        
        // Actualizar navegación activa
        if (viewType === 'home') {
            setActiveNav('home');
        }
    }

    function setActiveFilter(filterName) {
        currentFilter = filterName;
        if (!filterTabs) return;
        const tabs = filterTabs.querySelectorAll('.filter-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-filter') === filterName);
        });
    }

    function getUniqueArtists() {
        const uniqueMap = new Map();
        songs.forEach(song => {
            if (!uniqueMap.has(song.artist)) {
                const artistSongs = songs.filter(s => s.artist === song.artist);
                uniqueMap.set(song.artist, {
                    name: song.artist,
                    // Usar portada real para evitar rutas rotas de artistImage
                    image: artistSongs[0]?.cover || 'img/default.jpg',
                    songs: artistSongs
                });
            }
        });
        return Array.from(uniqueMap.values());
    }

    function renderArtists(artistsToRender) {
        if (!artistsGrid) return;
        artistsGrid.innerHTML = '';
        artistsToRender.forEach(artist => {
            const artistCard = document.createElement('div');
            artistCard.className = 'artist-card';
            const songsLabel = artist.songs.length === 1 ? '1 canción' : `${artist.songs.length} canciones`;
            artistCard.innerHTML = `
                <div class="artist-card__img-wrap">
                    <img src="${artist.image || artist.songs[0]?.cover || 'img/default.jpg'}" onerror="this.src='img/default.jpg'">
                    <button class="artist-card__play-btn" aria-label="Reproducir artista">
                        <i class="fa-solid fa-play"></i>
                    </button>
                </div>
                <h4 class="artist-card__name">${escapeHtml(artist.name)}</h4>
                <p class="artist-card__meta">${songsLabel}</p>
            `;
            artistCard.onclick = () => {
                setCurrentSongs(artist.songs, artist.name, 'home');
                setActiveFilter('music');
            };
            artistsGrid.appendChild(artistCard);
        });
    }

    function showArtistsView() {
        if (!artistsContainer || !artistsGrid) return;
        if (cardContainer) cardContainer.style.display = 'none';
        hideHomeSections();
        if (libraryView) libraryView.style.display = 'none';
        if (exploreContainer) exploreContainer.style.display = 'none';
        if (noResults) noResults.style.display = 'none';
        artistsContainer.style.display = 'block';
        if (sectionTitle) sectionTitle.textContent = 'Artistas';
        const artistsSubtitle = artistsContainer.querySelector('.section-subtitle');
        if (artistsSubtitle) artistsSubtitle.style.display = 'none';
        renderArtists(getUniqueArtists());
    }
    
    // Función de búsqueda contextual
    function searchSongs(query) {
        const normalized = query.trim().toLowerCase();

        if (currentFilter === 'artists' && artistsContainer && artistsContainer.style.display !== 'none') {
            const artists = getUniqueArtists();
            if (!normalized) {
                renderArtists(artists);
                if (noResults) noResults.style.display = 'none';
                artistsContainer.style.display = 'block';
                return;
            }

            const filteredArtists = artists.filter(artist =>
                artist.name.toLowerCase().includes(normalized)
            );
            renderArtists(filteredArtists);

            if (filteredArtists.length === 0) {
                if (noResults) noResults.style.display = 'block';
                artistsContainer.style.display = 'none';
            } else {
                if (noResults) noResults.style.display = 'none';
                artistsContainer.style.display = 'block';
            }
            return;
        }

        if (!query.trim()) {
            if (currentView === 'home' && currentFilter === 'all') {
                renderHomeSections();
            } else {
                // Si no hay query, mostrar todas las canciones del contexto actual
                renderCards(currentDisplayedSongs);
            }
            if (noResults) noResults.style.display = 'none';
            return;
        }

        hideHomeSections();
        
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

    function closeLanguageMenu() {
        if (!langDropdown || !langMenuBtn) return;
        langDropdown.hidden = true;
        langMenuBtn.setAttribute('aria-expanded', 'false');
        isLanguageMenuOpen = false;
    }

    function openLanguageMenu() {
        if (!langDropdown || !langMenuBtn) return;
        langDropdown.hidden = false;
        langMenuBtn.setAttribute('aria-expanded', 'true');
        isLanguageMenuOpen = true;
    }

    function initLanguageSwitcher() {
        if (!window.AppI18n || !langDropdown || !langMenuBtn) return;

        langDropdown.innerHTML = '';
        window.AppI18n.LANGS.forEach(langMeta => {
            const option = document.createElement('li');
            option.className = 'language-option';
            option.setAttribute('role', 'option');
            option.setAttribute('data-lang', langMeta.code);
            option.innerHTML = `
                <span class="language-option__badge">${langMeta.badge}</span>
                <span class="language-option__label">${escapeHtml(langMeta.label)}</span>
            `;
            option.addEventListener('click', () => {
                window.AppI18n.setLanguage(langMeta.code);
                closeLanguageMenu();
            });
            langDropdown.appendChild(option);
        });

        langMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (isLanguageMenuOpen) closeLanguageMenu();
            else openLanguageMenu();
        });

        document.addEventListener('click', (e) => {
            if (!languageSwitcher || !isLanguageMenuOpen) return;
            if (!languageSwitcher.contains(e.target)) closeLanguageMenu();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isLanguageMenuOpen) {
                closeLanguageMenu();
            }
        });

        window.AppI18n.applyToDocument();
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

    function getRegularPlaylists() {
        if (!Array.isArray(userPlaylists)) return [];
        return userPlaylists.filter(playlist =>
            playlist &&
            typeof playlist === 'object' &&
            typeof playlist.name === 'string' &&
            Array.isArray(playlist.songs) &&
            playlist.name !== "Canciones que me gustan"
        );
    }
    
    // Mostrar vista principal (Inicio)
    function showHomeView() {
        setCurrentSongs(songs, getHomeGreetingTitle(), 'home');
        renderHomeSections();
        setActiveNav('home');
    }

    function getDailyRecommendations(limit = 8) {
        const date = new Date();
        const seed = Number(`${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`);
        const orderedSongs = [...songs].sort((a, b) => ((a.id * 31 + seed) % 997) - ((b.id * 31 + seed) % 997));
        return orderedSongs.slice(0, limit);
    }

    function getMostPlayedSongs(limit = 8) {
        const ranked = songs
            .map(song => ({ ...song, plays: playCounts[song.id] || 0 }))
            .sort((a, b) => b.plays - a.plays);

        const listened = ranked.filter(song => song.plays > 0).slice(0, limit);
        if (listened.length === limit) return listened;

        const fallback = songs
            .filter(song => !listened.some(listenedSong => listenedSong.id === song.id))
            .slice(0, limit - listened.length);

        return [...listened, ...fallback];
    }

    function getFavoriteSongs(limit = 8) {
        return songs.filter(song => song.favorite).slice(0, limit);
    }

    function getLatestAddedSongs(limit = 8) {
        return [...songs]
            .sort((a, b) => b.id - a.id)
            .slice(0, limit);
    }

    function getArtistBasedSongs(limit = 8) {
        const artistPlayTotals = {};
        songs.forEach(song => {
            const plays = playCounts[song.id] || 0;
            artistPlayTotals[song.artist] = (artistPlayTotals[song.artist] || 0) + plays;
        });

        let targetArtist = Object.entries(artistPlayTotals)
            .sort((a, b) => b[1] - a[1])
            .map(entry => entry[0])[0];

        if (!targetArtist) {
            targetArtist = songs[0]?.artist || '';
        }

        const artistSongs = songs.filter(song => song.artist === targetArtist);
        if (artistSongs.length >= limit) {
            return artistSongs.slice(0, limit);
        }

        const fallbackSongs = songs
            .filter(song => song.artist !== targetArtist)
            .slice(0, limit - artistSongs.length);

        return [...artistSongs, ...fallbackSongs];
    }

    function normalizeText(text) {
        return (text || '')
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    function getSongCategory(song) {
        const searchable = normalizeText(`${song.artist} ${song.title} ${song.album}`);

        if (/(bts|blackpink|lisa|jennie|jungkook|rose|katseye)/.test(searchable)) return 'K-Pop';
        if (/(karol|anuel|balvin|ozuna|maluma|becky|bad bunny|shakira|romeo|daddy yankee|nicky jam|quevedo)/.test(searchable)) return 'Urbano latino';
        if (/(morat|mon laferte|sebastian yatra|aitana|jesse|joy|maite perroni|corazon serrano|agua marina|marco antonio|william luna|nabalez)/.test(searchable)) return 'Latino pop';
        if (/(adele|christina perri|lewis capaldi|lady gaga)/.test(searchable)) return 'Pop internacional';
        return 'Pop';
    }

    function buildUserTasteProfile() {
        const artistWeights = {};
        const categoryWeights = {};

        songs.forEach(song => {
            const plays = playCounts[song.id] || 0;
            if (plays > 0) {
                artistWeights[song.artist] = (artistWeights[song.artist] || 0) + (plays * 3);
                const category = getSongCategory(song);
                categoryWeights[category] = (categoryWeights[category] || 0) + (plays * 2);
            }
            if (song.favorite) {
                artistWeights[song.artist] = (artistWeights[song.artist] || 0) + 4;
                const category = getSongCategory(song);
                categoryWeights[category] = (categoryWeights[category] || 0) + 3;
            }
        });

        recentSongIds.slice(0, 12).forEach((songId, index) => {
            const song = songs.find(item => item.id === songId);
            if (!song) return;
            const recencyBoost = Math.max(1, 6 - index);
            artistWeights[song.artist] = (artistWeights[song.artist] || 0) + recencyBoost;
            const category = getSongCategory(song);
            categoryWeights[category] = (categoryWeights[category] || 0) + recencyBoost;
        });

        const totalWeight = Object.values(artistWeights).reduce((sum, value) => sum + value, 0)
            + Object.values(categoryWeights).reduce((sum, value) => sum + value, 0);

        return { artistWeights, categoryWeights, totalWeight };
    }

    function getRecommendationScore(song, profile) {
        const artistScore = profile.artistWeights[song.artist] || 0;
        const categoryScore = profile.categoryWeights[getSongCategory(song)] || 0;
        const playScore = playCounts[song.id] || 0;
        const favoriteBoost = song.favorite ? 2 : 0;
        return (artistScore * 2) + (categoryScore * 1.5) + playScore + favoriteBoost;
    }

    function getPersonalizedRecommendations(limit = 12) {
        const profile = buildUserTasteProfile();
        if (profile.totalWeight === 0) {
            return getDailyRecommendations(limit);
        }

        const sorted = [...songs]
            .sort((a, b) => getRecommendationScore(b, profile) - getRecommendationScore(a, profile));

        return sorted.slice(0, limit);
    }

    function renderHomeSections() {
        if (!homeSectionsContainer) return;
        const HOME_PREVIEW_LIMIT = 6;
        hideHomeSections();
        if (cardContainer) cardContainer.style.display = 'none';
        if (noResults) noResults.style.display = 'none';

        const sections = [
            { key: 'forYou', title: 'Recomendado para ti', items: getPersonalizedRecommendations(12) },
            { key: 'daily', title: 'Vuelve a tu música', items: getDailyRecommendations(12) },
            { key: 'mostPlayed', title: 'Tus mixes más escuchados', items: getMostPlayedSongs(12) },
            { key: 'recentlyPlayed', title: 'Escuchadas recientemente', items: getRecentSongs().slice(0, 12) },
            { key: 'artistBased', title: 'Porque escuchas este artista', items: getArtistBasedSongs(12) },
            { key: 'latest', title: 'Nuevos lanzamientos para ti', items: getLatestAddedSongs(12) }
        ];

        const favoriteSongs = getFavoriteSongs();
        if (favoriteSongs.length > 0) {
            sections.push({ key: 'favorites', title: 'Tus favoritas', items: favoriteSongs });
        }

        const visibleSections = sections.filter(section => Array.isArray(section.items) && section.items.length > 0);

        homeSectionsContainer.innerHTML = '';

        visibleSections.forEach(section => {
            const isExpanded = Boolean(homeSectionsExpanded[section.key]);
            const sectionPreviewLimit = section.key === 'forYou' ? 10 : HOME_PREVIEW_LIMIT;
            const visibleItems = isExpanded ? section.items : section.items.slice(0, sectionPreviewLimit);
            const renderItems = section.key === 'forYou' && !isExpanded
                ? [...visibleItems, ...visibleItems]
                : visibleItems;
            const sectionBlock = document.createElement('section');
            sectionBlock.className = 'home-section';
            if (section.key === 'forYou') {
                sectionBlock.classList.add('home-section--for-you');
            }

            const sectionHeader = document.createElement('div');
            sectionHeader.className = 'home-section-header';

            const sectionTitle = document.createElement('h2');
            sectionTitle.className = 'home-section-title';
            sectionTitle.textContent = section.title;
            sectionHeader.appendChild(sectionTitle);

            if (section.items.length > sectionPreviewLimit) {
                const sectionToggleBtn = document.createElement('button');
                sectionToggleBtn.type = 'button';
                sectionToggleBtn.className = 'home-section-more-btn';
                sectionToggleBtn.textContent = isExpanded ? 'Mostrar menos' : 'Mostrar todo';
                sectionToggleBtn.addEventListener('click', () => {
                    homeSectionsExpanded[section.key] = !isExpanded;
                    renderHomeSections();
                });
                sectionHeader.appendChild(sectionToggleBtn);
            }

            sectionBlock.appendChild(sectionHeader);

            const sectionGrid = document.createElement('div');
            sectionGrid.className = `home-section-grid ${isExpanded ? 'is-expanded' : ''}`.trim();
            if (section.key === 'forYou' && !isExpanded) {
                sectionGrid.dataset.loopWidth = String(visibleItems.length * 200);
            }

            renderItems.forEach(song => {
                const card = createSongCard(song, false, null);
                sectionGrid.appendChild(card);
            });

            sectionBlock.appendChild(sectionGrid);
            homeSectionsContainer.appendChild(sectionBlock);
        });

        showHomeSections();
        startForYouAutoSlide();
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

    function saveRecentSongs() {
        localStorage.setItem('recentSongs', JSON.stringify(recentSongIds));
    }

    function loadRecentSongs() {
        const savedRecent = localStorage.getItem('recentSongs');
        if (!savedRecent) {
            recentSongIds = [];
            return;
        }
        try {
            const parsed = JSON.parse(savedRecent);
            recentSongIds = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error('Error cargando recientes:', e);
            recentSongIds = [];
        }
    }

    function addToRecentSongs(songId) {
        if (!songId) return;
        recentSongIds = recentSongIds.filter(id => id !== songId);
        recentSongIds.unshift(songId);
        recentSongIds = recentSongIds.slice(0, 50);
        saveRecentSongs();
    }

    function savePlayCounts() {
        localStorage.setItem('songPlayCounts', JSON.stringify(playCounts));
    }

    function loadPlayCounts() {
        const savedPlayCounts = localStorage.getItem('songPlayCounts');
        if (!savedPlayCounts) {
            playCounts = {};
            return;
        }
        try {
            const parsed = JSON.parse(savedPlayCounts);
            playCounts = parsed && typeof parsed === 'object' ? parsed : {};
        } catch (e) {
            console.error('Error cargando conteo de reproducciones:', e);
            playCounts = {};
        }
    }

    function registerSongPlay(songId) {
        if (!songId) return;
        playCounts[songId] = (playCounts[songId] || 0) + 1;
        savePlayCounts();
    }

    function getRecentSongs() {
        return recentSongIds
            .map(id => songs.find(song => song.id === id))
            .filter(Boolean);
    }

    function showRecentSongs() {
        const recentSongs = getRecentSongs();
        if (recentSongs.length === 0) {
            showNotification('Aún no tienes canciones recientes', false);
            showHomeView();
            return;
        }
        setCurrentSongs(recentSongs, 'Recientes', 'recent');
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
        if (homeSectionsContainer) homeSectionsContainer.style.display = 'none';
        if (artistsContainer) artistsContainer.style.display = 'none';
        if (exploreContainer) exploreContainer.style.display = 'none';
        if (libraryView) libraryView.style.display = 'block';
        if (cardContainer) cardContainer.style.display = 'none';
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
        updateMiniPlayer();
    }
    
    function updateLikeButton(song) {
        const likedIcon = '<i class="fa-solid fa-heart" style="color: #9b4dff;"></i>';
        const unlikedIcon = '<i class="fa-regular fa-heart"></i>';

        if (song && song.favorite) {
            if (likeTrackBtn) likeTrackBtn.innerHTML = likedIcon;
            if (panelLikeBtn) panelLikeBtn.innerHTML = likedIcon;
        } else {
            if (likeTrackBtn) likeTrackBtn.innerHTML = unlikedIcon;
            if (panelLikeBtn) panelLikeBtn.innerHTML = unlikedIcon;
        }
    }
    
    function playSong() {
        if (!songs || songs.length === 0) {
            showNotification('No hay canciones disponibles', true);
            return;
        }
        const currentSong = songs[currentSongIndex];
        if (currentSong) {
            addToRecentSongs(currentSong.id);
            registerSongPlay(currentSong.id);
        }
        isPlaying = true;
        if (playPauseBtn) {
            const icon = playPauseBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-circle-pause';
        }
        updateMiniPlayer();
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
        updateMiniPlayer();
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
        updateMiniPlayer();
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
            updateMiniPlayer();
            if (isPlaying) playSong();
        }
    }
    
    function updateProgress() {
        if (audioPlayer.duration && !isNaN(audioPlayer.duration)) {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            if (progressFill) progressFill.style.width = `${progress}%`;
            if (currentTimeSpan) currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
            if (totalDurationSpan) totalDurationSpan.textContent = formatTime(audioPlayer.duration);

            // 🔥 NUEVO: Mover la bolita (handle) con el progreso
            const handle = document.querySelector('.progress-handle');
            if (handle) {
                // La bolita se coloca en el porcentaje exacto del progreso
                handle.style.left = `${progress}%`;
            }
        }

        if (typeof updateLyricsLine === 'function') {
            updateLyricsLine();
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
        if (shuffleBtn) shuffleBtn.style.color = isShuffle ? '#9b4dff' : '#b3b3b3';
        showNotification(isShuffle ? '🔀 Modo aleatorio activado' : 'Modo aleatorio desactivado');
    }
    
    function toggleRepeat() {
        isRepeat = !isRepeat;
        if (repeatBtn) repeatBtn.style.color = isRepeat ? '#9b4dff' : '#b3b3b3';
        showNotification(isRepeat ? '🔁 Repetición activada' : 'Repetición desactivada');
    }
    
    function toggleLike() {
        const currentSong = songs[currentSongIndex];
        if (currentSong) {
            currentSong.favorite = !currentSong.favorite;
            saveLikedSongs();
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

            // Si estamos en Inicio > Todo, refrescar secciones para mostrar/ocultar "Tus favoritas" al instante
            if (currentView === 'home' && currentFilter === 'all') {
                renderHomeSections();
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
            const card = createSongCard(song, isPlaylistView, currentPlaylist);
            cardContainer.appendChild(card);
        });
        
        console.log('✅ Tarjetas renderizadas:', songsToShow.length);
    }

    function createSongCard(song, isPlaylistView = false, currentPlaylist = null) {
        const originalIndex = songs.findIndex(s => s.id === song.id);
        const card = document.createElement('div');
        card.className = 'card';

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

        return card;
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
                <i class="fa-solid fa-heart" style="color: #9b4dff;"></i>
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

    function saveLikedSongs() {
        const likedSongIds = songs.filter(song => song.favorite).map(song => song.id);
        localStorage.setItem('likedSongs', JSON.stringify(likedSongIds));
    }

    function loadLikedSongs() {
        const savedLikes = localStorage.getItem('likedSongs');
        if (!savedLikes) {
            // Sin estado guardado: iniciar sin favoritos por defecto
            songs.forEach(song => {
                song.favorite = false;
            });
            return;
        }

        try {
            const likedSongIds = JSON.parse(savedLikes);
            songs.forEach(song => {
                song.favorite = Array.isArray(likedSongIds) && likedSongIds.includes(song.id);
            });
        } catch (e) {
            console.error('Error cargando favoritos:', e);
            songs.forEach(song => {
                song.favorite = false;
            });
        }
    }
    
    function loadSavedPlaylists() {
        const saved = localStorage.getItem('userPlaylists');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    userPlaylists = parsed.filter(playlist =>
                        playlist &&
                        typeof playlist === 'object' &&
                        typeof playlist.name === 'string' &&
                        Array.isArray(playlist.songs)
                    );
                } else if (parsed && Array.isArray(parsed.playlists)) {
                    userPlaylists = parsed.playlists.filter(playlist =>
                        playlist &&
                        typeof playlist === 'object' &&
                        typeof playlist.name === 'string' &&
                        Array.isArray(playlist.songs)
                    );
                } else {
                    userPlaylists = [];
                }
                updatePlaylistsList();
            } catch (e) {
                console.error('Error cargando playlists:', e);
                userPlaylists = [];
                updatePlaylistsList();
            }
        } else {
            userPlaylists = [];
            updatePlaylistsList();
        }
    }
    
    // ==================== MINI REPRODUCTOR ====================
    function openMiniPlayer() {
        if (!miniPlayerModal) return;
        isMiniPlayerOpen = true;
        isMiniPlayerFullscreen = false;
        miniPlayerModal.classList.add('active');
        const miniPlayerContainer = miniPlayerModal.querySelector('.mini-player-container');
        if (miniPlayerContainer) {
            miniPlayerContainer.classList.remove('fullscreen');
        }
        if (fullscreenBtn) {
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
            fullscreenBtn.title = 'Maximizar';
        }
        updateMiniPlayer();
    }
    
    function closeMiniPlayer() {
        if (!miniPlayerModal) return;
        isMiniPlayerOpen = false;
        isMiniPlayerFullscreen = false;
        miniPlayerModal.classList.remove('active');
        const miniPlayerContainer = miniPlayerModal.querySelector('.mini-player-container');
        if (miniPlayerContainer) {
            miniPlayerContainer.classList.remove('fullscreen');
        }
        if (fullscreenBtn) {
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
            fullscreenBtn.title = 'Maximizar';
        }
    }
    
    function updateMiniPlayer() {
        if (!isMiniPlayerOpen || currentSongIndex >= currentDisplayedSongs.length) return;
        
        const currentSong = currentDisplayedSongs[currentSongIndex];
        
        if (miniPlayerAlbum) miniPlayerAlbum.src = currentSong.cover;
        if (miniPlayerTitle) miniPlayerTitle.textContent = currentSong.title;
        if (miniPlayerArtist) miniPlayerArtist.textContent = currentSong.artist;
        
        // Actualizar ícono play/pause
        if (miniPlayBtn) {
            if (isPlaying) {
                miniPlayBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
            } else {
                miniPlayBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
            }
        }
    }

    function toggleMiniPlayerFullscreen() {
        if (!miniPlayerModal) return;
        const miniPlayerContainer = miniPlayerModal.querySelector('.mini-player-container');
        if (!miniPlayerContainer) return;

        isMiniPlayerFullscreen = !isMiniPlayerFullscreen;
        
        if (isMiniPlayerFullscreen) {
            miniPlayerContainer.classList.add('fullscreen');
            if (fullscreenBtn) {
                fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
                fullscreenBtn.title = 'Minimizar';
            }
        } else {
            miniPlayerContainer.classList.remove('fullscreen');
            if (fullscreenBtn) {
                fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
                fullscreenBtn.title = 'Maximizar';
            }
        }
    }
    
    function goToHome() {
        showHomeView();
        if (searchInput) searchInput.value = '';
        if (libraryView) libraryView.style.display = 'none';
        if (artistsContainer) artistsContainer.style.display = 'none';
        if (exploreContainer) exploreContainer.style.display = 'none';
        setActiveFilter('all');
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
                }
                setActiveNav('search');
                goToHome();
            });
        }

        if (topBarHomeBtn) {
            topBarHomeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                goToHome();
            });
        }
        
        if (navLibrary) {
            navLibrary.addEventListener('click', function(e) {
                e.preventDefault();
                try {
                    // Mostrar la biblioteca con pestañas (Playlists y Álbumes)
                    const filteredPlaylists = getRegularPlaylists();
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
                                    showLibraryView('Playlists', getRegularPlaylists(), 'playlists');
                                } else if (tabName === 'albums') {
                                    showLibraryView('Álbumes', getUniqueAlbums(), 'albums');
                                }
                            };
                        });
                    }
                } catch (error) {
                    console.error('Error abriendo Tu Biblioteca:', error);
                    showLibraryView('Playlists', [], 'playlists');
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
        if (panelLikeBtn) panelLikeBtn.addEventListener('click', toggleLike);
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

        if (lyricsBtn) {
            lyricsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentSong = songs[currentSongIndex];
                if (currentSong) {
                    openLyrics(currentSong);  // ← Función de lyrics.js
                } else {
                    showNotification('Selecciona una canción primero', true);
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

        if (filterTabs) {
            const tabs = filterTabs.querySelectorAll('.filter-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const filter = tab.getAttribute('data-filter');
                    setActiveFilter(filter);

                    if (filter === 'artists') {
                        showArtistsView();
                    } else {
                        if (artistsContainer) artistsContainer.style.display = 'none';
                        if (exploreContainer) exploreContainer.style.display = 'none';
                        if (filter === 'music') {
                            setCurrentSongs(songs, 'Música', 'home');
                        } else {
                            showHomeView();
                        }
                    }
                });
            });
        }
        
        if (createPlaylistBtn) {
            createPlaylistBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openCreatePlaylistModal();
            });
        }

        if (staticLikedPreview) {
            staticLikedPreview.addEventListener('click', () => {
                showLikedSongs();
                setActiveNav('library');
            });
        }

        if (staticRecentPreview) {
            staticRecentPreview.addEventListener('click', () => {
                showRecentSongs();
                setActiveNav('library');
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

        // Eventos del Mini Reproductor
        if (miniPlayerBtn) {
            miniPlayerBtn.addEventListener('click', () => {
                if (isMiniPlayerOpen) {
                    closeMiniPlayer();
                } else {
                    openMiniPlayer();
                }
            });
        }

        if (miniPlayerClose) {
            miniPlayerClose.addEventListener('click', closeMiniPlayer);
        }

        if (miniPlayerModal) {
            miniPlayerModal.addEventListener('click', (e) => {
                if (e.target === miniPlayerModal) closeMiniPlayer();
            });
        }

        if (miniPlayBtn) {
            miniPlayBtn.addEventListener('click', togglePlay);
        }

        if (miniPrevBtn) {
            miniPrevBtn.addEventListener('click', prevSong);
        }

        if (miniNextBtn) {
            miniNextBtn.addEventListener('click', nextSong);
        }

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', toggleMiniPlayerFullscreen);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMiniPlayerOpen) {
                closeMiniPlayer();
            }
        });
    }

    // ==================== CONECTAR DISPOSITIVO ====================
function openConnectDeviceModal() {
    if (!connectDeviceModal) return;
    availableDevices = JSON.parse(JSON.stringify(defaultDevices));
    connectDeviceModal.classList.add('active');
    renderDevicesList();
}

function closeConnectDeviceModal() {
    if (!connectDeviceModal) return;
    connectDeviceModal.classList.remove('active');
}

function renderDevicesList() {
    if (!devicesList) return;
    devicesList.innerHTML = '';
    
    availableDevices.forEach(device => {
        const deviceItem = document.createElement('div');
        deviceItem.className = `device-item ${device.id === currentDevice ? 'active' : ''}`;
        deviceItem.dataset.deviceId = device.id;
        deviceItem.innerHTML = `
            <i class="fa-solid ${device.icon}"></i>
            <div class="device-info">
                <div class="device-name">${escapeHtml(device.name)}</div>
                <div class="device-type">${device.type.charAt(0).toUpperCase() + device.type.slice(1)}</div>
            </div>
            <span class="device-status">${device.status}</span>
        `;
        deviceItem.addEventListener('click', () => connectToDevice(device));
        devicesList.appendChild(deviceItem);
    });
}

function connectToDevice(device) {
    if (isConnecting || device.id === currentDevice) return;
    isConnecting = true;
    
    const items = devicesList.querySelectorAll('.device-item');
    items.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.deviceId === device.id) {
            const status = item.querySelector('.device-status');
            if (status) {
                status.textContent = 'Conectando...';
                status.style.background = 'var(--primary-hover)';
            }
        }
    });
    
    setTimeout(() => {
        currentDevice = device.id;
        availableDevices.forEach(d => {
            d.status = d.id === device.id ? 'Conectado' : 'Disponible';
        });
        renderDevicesList();
        showNotification(`🔊 Conectado a: ${device.name}`);
        isConnecting = false;
        
        if (volumeIcon && device.id !== 'this-computer') {
            volumeIcon.title = `Reproduciendo en: ${device.name}`;
        } else if (volumeIcon) {
            volumeIcon.title = 'Volumen';
        }
    }, 1500);
}

function refreshDevicesList() {
    if (isConnecting || !refreshDevicesBtn) return;
    refreshDevicesBtn.classList.add('loading');
    refreshDevicesBtn.disabled = true;
    
    setTimeout(() => {
        renderDevicesList();
        refreshDevicesBtn.classList.remove('loading');
        refreshDevicesBtn.disabled = false;
        showNotification('🔍 Dispositivos actualizados');
    }, 1200);
}

function setupConnectDeviceEvents() {
    if (connectDeviceBtn) {
        connectDeviceBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openConnectDeviceModal();
        });
    }
    if (connectDeviceClose) {
        connectDeviceClose.addEventListener('click', closeConnectDeviceModal);
    }
    if (connectDeviceModal) {
        connectDeviceModal.addEventListener('click', (e) => {
            if (e.target === connectDeviceModal) closeConnectDeviceModal();
        });
    }
    if (refreshDevicesBtn) {
        refreshDevicesBtn.addEventListener('click', refreshDevicesList);
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && connectDeviceModal?.classList.contains('active')) {
            closeConnectDeviceModal();
        }
    });
}
    
    // Inicializar
    function init() {
        console.log('🚀 Inicializando aplicación...');
        setupEvents();
        initLanguageSwitcher();
        loadLikedSongs();
        loadRecentSongs();
        loadPlayCounts();
        // Eventos de Conectar Dispositivo
        setupConnectDeviceEvents();
        
        audioPlayer.volume = currentVolume;
        if (volumeFill) volumeFill.style.width = `${currentVolume * 100}%`;
        
        // Inicializar con todas las canciones
        currentDisplayedSongs = songs;
        currentSearchContext = songs;
        
        renderCards(songs);
        loadSong(songs[0]);
        loadSavedPlaylists();
        updateLikedSongsCounter();
        showHomeView();

        console.log('🎤 lyricsBtn:', lyricsBtn);
        console.log('📝 openLyrics:', typeof openLyrics);
        console.log('🔄 updateLyricsLine:', typeof updateLyricsLine);
        
        console.log('✅ App lista!');
    }
    
    init();
});
