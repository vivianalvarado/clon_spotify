<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Spotify Clone - Reproductor Musical</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="app-container">
        <!-- SIDEBAR -->
        <aside class="sidebar" id="sidebar">
            <button class="sidebar-toggle" id="sidebar-toggle">
                <i class="fa-solid fa-bars"></i>
            </button>
            
            <div class="sidebar-logo">
                <i class="fa-brands fa-spotify"></i>
                <span class="logo-text">Spotify</span>
            </div>
            
            <nav class="nav-section">
                <ul>
                    <li><a href="#" id="nav-home" class="active"><i class="fa-solid fa-house"></i><span class="nav-text">Inicio</span></a></li>
                    <li><a href="#" id="nav-search"><i class="fa-solid fa-magnifying-glass"></i><span class="nav-text">Buscar</span></a></li>
                </ul>
            </nav>

            <div class="library-sidebar">
                <div class="library-header-sidebar">
                    <button id="nav-library" class="library-btn">
                        <i class="fa-solid fa-book"></i>
                        <span class="nav-text">Tu Biblioteca</span>
                    </button>
                    <button id="create-playlist-btn" class="add-playlist-btn">
                        <i class="fa-solid fa-plus"></i>
                        <span class="nav-text">Crear</span>
                    </button>
                </div>
                <div class="library-playlists-preview">
                    <div class="preview-item"><i class="fa-solid fa-heart"></i><span class="nav-text">Tus Me Gusta</span></div>
                    <div class="preview-item"><i class="fa-solid fa-clock"></i><span class="nav-text">Recientes</span></div>
                </div>
            </div>
            
            <div class="sidebar-footer">
                <a href="#" class="footer-link"><i class="fa-regular fa-globe"></i><span class="nav-text">Español</span></a>
            </div>
        </aside>

        <!-- MAIN CONTENT -->
        <main class="main-content">
            <header class="top-bar">
                <div class="navigation-buttons">
                    <button class="nav-arrow" id="back-btn"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="nav-arrow" id="forward-btn"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
                <div class="search-box">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" id="search-input" placeholder="¿Qué quieres reproducir?">
                </div>
                <div class="user-menu">
                    <button class="user-btn"><i class="fa-regular fa-user"></i><span>Usuario</span><i class="fa-solid fa-chevron-down"></i></button>
                </div>
            </header>
            
            <section class="content">
                <div class="greeting-section">
                    <h1 id="section-title">Buenas tardes</h1>
                </div>
                
                <div class="card-container" id="card-container"></div>
                
                <div class="library-container" id="library-container" style="display: none;">
                    <div class="library-header">
                        <h2><i class="fa-solid fa-book"></i> Tu Biblioteca</h2>
                        <button id="close-library" class="close-library-btn"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <div class="library-tabs">
                        <button class="lib-tab active" data-tab="playlists">Playlists</button>
                        <button class="lib-tab" data-tab="artists">Artistas</button>
                    </div>
                    <div class="library-grid">
                        <div class="library-section" id="playlists-section">
                            <div class="library-list" id="playlists-list"></div>
                        </div>
                        <div class="library-section" id="artists-section" style="display: none;">
                            <div class="library-list" id="artists-list"></div>
                        </div>
                    </div>
                </div>
                
                <div id="no-results" class="no-results-container" style="display: none;">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <p>No se encontraron resultados</p>
                </div>
            </section>
        </main>

        <!-- RIGHT PANEL -->
        <aside class="right-panel">
            <div class="now-playing-card">
                <div class="now-playing-header"><i class="fa-solid fa-chart-simple"></i><span>EN REPRODUCCIÓN</span></div>
                <div class="album-art-large">
                    <img id="panel-album-img" src="https://via.placeholder.com/200" alt="Portada">
                    <div class="album-overlay"><i class="fa-solid fa-play"></i></div>
                </div>
                <div class="track-details">
                    <h3 id="panel-song-title">Selecciona una canción</h3>
                    <p id="panel-artist-name">Artista</p>
                </div>
                <div class="track-actions">
                    <button class="track-action" id="panel-like"><i class="fa-regular fa-heart"></i></button>
                </div>
            </div>
            
            <div class="queue-preview">
                <p class="queue-title"><i class="fa-solid fa-list-ul"></i> Cola de reproducción</p>
                <div id="queue-list" class="queue-list"></div>
            </div>
        </aside>

        <!-- PLAYER BAR -->
        <footer class="player-bar">
            <div class="current-track-info">
                <img id="footer-thumb" src="https://via.placeholder.com/56" alt="Miniatura">
                <div class="track-meta">
                    <h5 id="footer-song">Sin reproducción</h5>
                    <p id="footer-artist">—</p>
                </div>
                <button id="like-track" class="mini-like"><i class="fa-regular fa-heart"></i></button>
            </div>
            
            <div class="player-controls-center">
                <div class="control-buttons">
                    <button id="shuffle-btn" class="ctrl-btn"><i class="fa-solid fa-shuffle"></i></button>
                    <button id="prev-btn" class="ctrl-btn"><i class="fa-solid fa-backward-step"></i></button>
                    <button id="play-pause-btn" class="play-pause-btn"><i class="fa-solid fa-circle-play"></i></button>
                    <button id="next-btn" class="ctrl-btn"><i class="fa-solid fa-forward-step"></i></button>
                    <button id="repeat-btn" class="ctrl-btn"><i class="fa-solid fa-repeat"></i></button>
                </div>
                
                <div class="playback-progress">
                    <span id="current-time">0:00</span>
                    <div class="progress-bar-container" id="progress-bar-bg">
                        <div class="progress-fill" id="progress-fill"></div>
                    </div>
                    <span id="total-duration">0:00</span>
                </div>
            </div>
            
            <div class="player-extras">
                <div class="volume-control">
                    <i class="fa-solid fa-volume-high" id="volume-icon"></i>
                    <div class="volume-slider" id="volume-bar">
                        <div class="volume-fill" id="volume-fill"></div>
                    </div>
                </div>
            </div>
        </footer>
    </div>

    <script src="js/data.js"></script>
    <script src="js/app.js"></script>
</body>
</html>