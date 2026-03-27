// aura-plugin.js

// 1. Inject the Glassmorphic CSS for the Aura Sidebar
const auraStyles = document.createElement('style');
auraStyles.innerHTML = `
    /* ====== AURADISCOVERY STYLES ====== */
    :root {
      --aura-accent: #ff2a5f;
      --glass-bg: rgba(255, 255, 255, 0.05);
      --glass-border: rgba(255, 255, 255, 0.1);
      --glass-highlight: rgba(255, 255, 255, 0.2);
      --text-main: #ffffff;
      --player-h: 85px;
    }

    @keyframes auraGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    /* Fixed Sidebar Overlay */
    .music-sidebar {
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 340px;
        background: linear-gradient(-45deg, #1a0b2e, #4b1d52, #ff2a5f, #0f0f14);
        background-size: 400% 400%;
        animation: auraGradient 15s ease infinite;
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border-left: 1px solid var(--glass-border);
        display: flex;
        flex-direction: column;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 9999;
        transform: translateX(0); /* Open state */
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .music-sidebar.collapsed { transform: translateX(100%); /* Closed state */ }
    
    .music-header { padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--glass-border); }
    .music-header h2 { font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin: 0; letter-spacing: 0.5px; }
    .music-header h2 span { color: var(--aura-accent); font-weight: 800; }
    
    .header-actions { display: flex; align-items: center; gap: 15px; }
    .external-link-btn, .close-music-btn { background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; font-size: 1.2rem; transition: 0.2s; text-decoration: none; display: flex; align-items: center; justify-content: center; }
    .external-link-btn:hover, .close-music-btn:hover { color: white; transform: scale(1.1); }
    
    .music-search-container { padding: 15px 20px; }
    .music-search-container input { width: 100%; padding: 12px 15px; border-radius: 12px; border: 1px solid var(--glass-border); background: var(--glass-bg); color: var(--text-main); outline: none; transition: 0.2s; box-sizing: border-box; }
    .music-search-container input:focus { border-color: var(--glass-highlight); background: rgba(255,255,255,0.1); box-shadow: 0 0 15px rgba(255, 255, 255, 0.1); }
    
    .music-tabs { display: flex; gap: 10px; padding: 0 20px 10px; }
    .m-tab { background: var(--glass-bg); border: 1px solid transparent; color: rgba(255,255,255,0.6); cursor: pointer; font-weight: 600; font-size: 0.85rem; padding: 8px 14px; border-radius: 8px; transition: 0.2s; flex: 1; }
    .m-tab:hover { color: white; border-color: var(--glass-border); }
    .m-tab.active { background: var(--glass-highlight); color: white; border-color: var(--glass-border); }
    
    .music-results { flex: 1; overflow-y: auto; padding: 10px 20px 20px; display: flex; flex-direction: column; gap: 12px; scrollbar-width: none; }
    .music-results::-webkit-scrollbar { display: none; }
    
    .m-card { display: flex; align-items: center; gap: 12px; background: var(--glass-bg); padding: 10px; border-radius: 12px; border: 1px solid var(--glass-border); cursor: pointer; transition: transform 0.1s ease-out, background 0.2s, box-shadow 0.2s; }
    .m-card:hover { background: var(--glass-highlight); box-shadow: 0 15px 25px rgba(0,0,0,0.3); transform: translateY(-2px); }
    .m-card img { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; }
    .m-info { flex: 1; overflow: hidden; }
    .m-info h4 { margin: 0; font-size: 0.9rem; color: var(--text-main); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
    .m-info p { margin: 4px 0 0 0; font-size: 0.75rem; color: rgba(255,255,255,0.7); white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
    .m-like-btn { background: none; border: none; color: rgba(255,255,255,0.3); cursor: pointer; font-size: 1.1rem; transition: 0.2s; }
    .m-like-btn:hover { color: white; transform: scale(1.1); }
    .m-like-btn.saved { color: var(--aura-accent); text-shadow: 0 0 10px rgba(255,42,95,0.5); }
    
    /* Fixed Bottom Footer Player */
    .music-player-footer { position: fixed; bottom: 0; left: 0; width: 100%; height: var(--player-h); background: rgba(15, 15, 20, 0.85); backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px); border-top: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: space-between; padding: 0 30px; z-index: 9998; box-sizing: border-box; transition: transform 0.3s ease; }
    .music-player-footer.hidden { transform: translateY(100%); }
    .player-left { display: flex; align-items: center; gap: 15px; width: 30%; }
    .player-left img { width: 56px; height: 56px; border-radius: 10px; object-fit: cover; display: none; }
    .player-info h4 { margin: 0; font-size: 0.95rem; font-weight: 600; color: white; }
    .player-info p { margin: 4px 0 0 0; font-size: 0.8rem; color: rgba(255,255,255,0.6); }
    
    .player-center { display: flex; flex-direction: column; align-items: center; width: 40%; gap: 10px; }
    .player-controls { display: flex; align-items: center; gap: 24px; }
    .p-btn { background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; opacity: 0.7; transition: 0.2s; }
    .p-btn:hover { opacity: 1; transform: scale(1.1); }
    .play-btn { width: 44px; height: 44px; background: white; color: black; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; opacity: 1; }
    
    .progress-bar { width: 100%; max-width: 500px; display: flex; align-items: center; gap: 12px; font-size: 0.75rem; color: rgba(255,255,255,0.6); }
    .progress-track { flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; cursor: pointer; position: relative; }
    .progress-fill { height: 100%; background: var(--aura-accent); border-radius: 3px; width: 0%; pointer-events: none; }
    
    .player-right { display: flex; align-items: center; justify-content: flex-end; width: 30%; gap: 15px; }
    .volume-slider { width: 90px; -webkit-appearance: none; height: 4px; background: rgba(255,255,255,0.2); border-radius: 5px; outline: none; cursor: pointer;}
    .volume-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: white; }
    
    .toggle-music-overlay { position: fixed; right: 25px; bottom: 25px; background: var(--glass-bg); border: 1px solid var(--glass-border); backdrop-filter: blur(10px); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); z-index: 10000; transition: 0.2s; font-size: 1.2rem; }
    .toggle-music-overlay:hover { transform: scale(1.1); background: var(--glass-highlight); border-color: white; }
    .toggle-music-overlay.raised { bottom: calc(var(--player-h) + 25px); }
`;
document.head.appendChild(auraStyles);

// 2. Inject the HTML into the body
const auraHTML = `
  <aside class="music-sidebar collapsed" id="musicSidebar">
    <div class="music-header">
      <h2>AuraDiscovery <span>BY NEKO</span></h2>
      <div class="header-actions">
        <a href="https://auradiscovery.netlify.app/" target="_blank" class="external-link-btn" title="Open full Aura site"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        <button class="close-music-btn" onclick="toggleMusicSidebar()" title="Close Sidebar"><i class="fa-solid fa-xmark"></i></button>
      </div>
    </div>
    <div class="music-search-container">
      <input type="text" id="musicSearchInput" placeholder="Search any song..." onkeypress="if(event.key==='Enter') searchAuraMusic()" />
    </div>
    <div class="music-tabs">
      <button class="m-tab active" id="tab-search" onclick="switchMusicTab('search')">Trending</button>
      <button class="m-tab" id="tab-library" onclick="switchMusicTab('library')">My Library</button>
    </div>
    <div class="music-results" id="musicResultsArea">
       <p style="text-align: center; color: rgba(255,255,255,0.7); font-size: 0.85rem; margin-top: 20px;">Loading trending music...</p>
    </div>
  </aside>

  <footer class="music-player-footer hidden" id="musicPlayerFooter">
     <div class="player-left">
       <img id="playerArt" src="" alt="Art" />
       <div class="player-info">
         <h4 id="playerTitle">Not Playing</h4>
         <p id="playerArtist">-</p>
       </div>
     </div>
     <div class="player-center">
       <div class="player-controls">
         <button class="p-btn" onclick="playPrevSong()"><i class="fa-solid fa-backward-step"></i></button>
         <button class="p-btn play-btn" id="playPauseBtn" onclick="togglePlayPause()"><i class="fa-solid fa-play" style="margin-left:2px;"></i></button>
         <button class="p-btn" onclick="playNextSong()"><i class="fa-solid fa-forward-step"></i></button>
       </div>
       <div class="progress-bar">
         <span id="timeCurrent">0:00</span>
         <div class="progress-track" id="progressTrack" onclick="seekAudio(event)">
           <div class="progress-fill" id="progressFill"></div>
         </div>
         <span id="timeTotal">0:00</span>
       </div>
     </div>
     <div class="player-right">
       <i class="fa-solid fa-volume-high" style="color: rgba(255,255,255,0.6);"></i>
       <input type="range" class="volume-slider" id="volumeSlider" min="0" max="1" step="0.01" value="0.8" oninput="changeVolume()" />
     </div>
  </footer>

  <div class="toggle-music-overlay" id="musicToggleFloating" onclick="toggleMusicSidebar()">
    <i class="fa-solid fa-music"></i>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', auraHTML);

// 3. Aura Player and Sync Logic
window.auraAudio = new Audio(); // Attach to window so it persists across functions
window.auraAudio.volume = 0.8;

let isAuraLoggedIn = false;
let auraLibrary = [];
let currentResults = [];
let playQueue = [];
let playIndex = 0;
let isLibraryView = false;
let isFading = false; // Prevents overlapping fades

function loadSyncLibrary() {
  isAuraLoggedIn = localStorage.getItem('aura_user') !== null;
  if (isAuraLoggedIn) {
      const mainSitePlaylists = JSON.parse(localStorage.getItem('aura_playlists')) || {};
      let merged = [];
      let seenIds = new Set();
      Object.values(mainSitePlaylists).forEach(playlist => {
          playlist.forEach(song => {
              if(!seenIds.has(song.trackId)) {
                  merged.push(song);
                  seenIds.add(song.trackId);
              }
          });
      });
      auraLibrary = merged;
  } else {
      auraLibrary = JSON.parse(localStorage.getItem('aura_library_sstudy')) || [];
  }
}

window.addEventListener('storage', (e) => {
   if (e.key === 'aura_playlists' || e.key === 'aura_user') {
       loadSyncLibrary();
       if (isLibraryView) renderMusicList(auraLibrary, true);
   }
});

// Expose functions globally
window.toggleMusicSidebar = function() { document.getElementById('musicSidebar').classList.toggle('collapsed'); };

window.switchMusicTab = function(tab) {
  document.querySelectorAll('.m-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  isLibraryView = (tab === 'library');
  if (isLibraryView) renderMusicList(auraLibrary, true);
  else renderMusicList(currentResults, false);
};

window.loadTrendingMusic = async function() {
  const resArea = document.getElementById('musicResultsArea');
  resArea.innerHTML = '<p style="text-align:center; color:rgba(255,255,255,0.7); font-size: 0.85rem; margin-top:20px;">Loading trending hits...</p>';
  try {
    const res = await fetch(`https://itunes.apple.com/search?term=top+hits&entity=song&limit=15`);
    const json = await res.json();
    currentResults = json.results.map(song => ({
      trackId: song.trackId.toString(), trackName: song.trackName, artistName: song.artistName, artworkUrl100: song.artworkUrl100, previewUrl: song.previewUrl
    }));
    document.getElementById('tab-search').innerText = "Trending";
    renderMusicList(currentResults, false);
  } catch(e) {
    resArea.innerHTML = '<p style="text-align:center; color:var(--aura-accent); font-size: 0.85rem; margin-top:20px;">Failed to load trending music.</p>';
  }
};

window.searchAuraMusic = async function() {
  const q = document.getElementById('musicSearchInput').value.trim();
  if (!q) { loadTrendingMusic(); return; }
  switchMusicTab('search');
  document.getElementById('tab-search').innerText = "Results";
  const resArea = document.getElementById('musicResultsArea');
  resArea.innerHTML = '<p style="text-align:center; color:rgba(255,255,255,0.7); font-size: 0.85rem; margin-top:20px;">Searching...</p>';
  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=15`);
    const json = await res.json();
    currentResults = json.results.map(song => ({
      trackId: song.trackId.toString(), trackName: song.trackName, artistName: song.artistName, artworkUrl100: song.artworkUrl100, previewUrl: song.previewUrl
    }));
    renderMusicList(currentResults, false);
  } catch(e) {
    resArea.innerHTML = '<p style="text-align:center; color:var(--aura-accent); font-size: 0.85rem; margin-top:20px;">No results found.</p>';
  }
};

window.renderMusicList = function(list, fromLibrary) {
  const resArea = document.getElementById('musicResultsArea');
  resArea.innerHTML = '';
  if (list.length === 0) {
    let msg = fromLibrary ? (isAuraLoggedIn ? 'Your Aura library is empty.' : 'Your local library is empty.<br><br>Log into the main Aura site to sync!') : 'No results.';
    resArea.innerHTML = `<p style="text-align:center; color:rgba(255,255,255,0.7); font-size: 0.85rem; margin-top:20px;">${msg}</p>`;
    return;
  }
  list.forEach((song, idx) => {
    const isSaved = auraLibrary.some(s => s.trackId === song.trackId);
    const card = document.createElement('div');
    card.className = 'm-card';
    card.innerHTML = `
      <img src="${song.artworkUrl100}" alt="art" />
      <div class="m-info" onclick="startPlayback(${idx}, ${fromLibrary})">
        <h4>${song.trackName}</h4><p>${song.artistName}</p>
      </div>
      <button class="m-like-btn ${isSaved ? 'saved' : ''}" onclick="toggleAuraLibrary(event, ${idx}, ${fromLibrary})">
        <i class="fa-solid fa-heart"></i>
      </button>
    `;
    resArea.appendChild(card);
  });
};

window.toggleAuraLibrary = function(e, idx, fromLibrary) {
  e.stopPropagation();
  const list = fromLibrary ? auraLibrary : currentResults;
  const song = list[idx];
  const existingIdx = auraLibrary.findIndex(s => s.trackId === song.trackId);
  
  if (existingIdx >= 0) {
    auraLibrary.splice(existingIdx, 1);
    if (isAuraLoggedIn) {
       let mainSitePlaylists = JSON.parse(localStorage.getItem('aura_playlists')) || {};
       for (let key in mainSitePlaylists) mainSitePlaylists[key] = mainSitePlaylists[key].filter(s => s.trackId !== song.trackId);
       localStorage.setItem('aura_playlists', JSON.stringify(mainSitePlaylists));
    } else {
       localStorage.setItem('aura_library_sstudy', JSON.stringify(auraLibrary));
    }
  } else {
    auraLibrary.push(song);
    if (isAuraLoggedIn) {
       let mainSitePlaylists = JSON.parse(localStorage.getItem('aura_playlists')) || { "Favorites": [] };
       if (!mainSitePlaylists["Favorites"]) mainSitePlaylists["Favorites"] = [];
       if (!mainSitePlaylists["Favorites"].some(s => s.trackId === song.trackId)) mainSitePlaylists["Favorites"].push(song);
       localStorage.setItem('aura_playlists', JSON.stringify(mainSitePlaylists));
    } else {
       localStorage.setItem('aura_library_sstudy', JSON.stringify(auraLibrary));
    }
  }
  if (isLibraryView) renderMusicList(auraLibrary, true);
  else renderMusicList(currentResults, false);
};

// --- NEW FADE OUT LOGIC ---
window.fadeOutAudio = function() {
  return new Promise((resolve) => {
    // If it's already paused or nothing is playing, skip the fade
    if (window.auraAudio.paused || !window.auraAudio.src || isFading) {
        resolve();
        return;
    }
    isFading = true;
    let vol = window.auraAudio.volume;
    const step = vol / 15; // Break the fade down into 15 volume drops
    
    const fadeOutInterval = setInterval(() => {
      vol -= step;
      if (vol <= 0.05) {
        window.auraAudio.volume = 0;
        window.auraAudio.pause();
        clearInterval(fadeOutInterval);
        isFading = false;
        resolve();
      } else {
        window.auraAudio.volume = vol;
      }
    }, 30); // Drops the volume every 30ms (about half a second total fade time)
  });
};

window.startPlayback = async function(idx, fromLibrary) {
  playQueue = fromLibrary ? [...auraLibrary] : [...currentResults];
  playIndex = idx;
  await loadAndPlaySong();
};

window.loadAndPlaySong = async function() {
  if (playQueue.length === 0 || playIndex < 0 || playIndex >= playQueue.length) return;
  const song = playQueue[playIndex];
  
  // Trigger the smooth fade-out before switching tracks
  await window.fadeOutAudio();
  
  document.getElementById('musicPlayerFooter').classList.remove('hidden');
  document.getElementById('musicToggleFloating').classList.add('raised');
  document.getElementById('playerArt').src = song.artworkUrl100;
  document.getElementById('playerArt').style.display = 'block';
  document.getElementById('playerTitle').innerText = song.trackName;
  document.getElementById('playerArtist').innerText = song.artistName;
  
  window.auraAudio.src = song.previewUrl;
  
  // Snap the volume back to whatever the user set it to on the slider
  const targetVolume = document.getElementById('volumeSlider').value;
  window.auraAudio.volume = targetVolume;
  
  window.auraAudio.play();
  document.getElementById('playPauseBtn').innerHTML = '<i class="fa-solid fa-pause"></i>';
};

window.togglePlayPause = function() {
  if (!window.auraAudio.src) return;
  if (window.auraAudio.paused) {
    window.auraAudio.play();
    document.getElementById('playPauseBtn').innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    window.auraAudio.pause();
    document.getElementById('playPauseBtn').innerHTML = '<i class="fa-solid fa-play" style="margin-left:2px;"></i>';
  }
};

window.playNextSong = function() { 
  if (isFading) return; 
  playIndex++; 
  if (playIndex >= playQueue.length) playIndex = 0; 
  loadAndPlaySong(); 
};

window.playPrevSong = function() { 
  if (isFading) return;
  playIndex--; 
  if (playIndex < 0) playIndex = playQueue.length - 1; 
  loadAndPlaySong(); 
};

window.changeVolume = function() { 
  // Don't let the user mess with the slider while a fade is actively happening
  if (!isFading) {
    window.auraAudio.volume = document.getElementById('volumeSlider').value; 
  }
};

window.seekAudio = function(e) {
  const track = document.getElementById('progressTrack');
  const percent = e.offsetX / track.offsetWidth;
  if (window.auraAudio.duration) window.auraAudio.currentTime = percent * window.auraAudio.duration;
};

window.auraAudio.addEventListener('timeupdate', () => {
  const cur = window.auraAudio.currentTime;
  const tot = window.auraAudio.duration || 0;
  const format = (sec) => { if(isNaN(sec)) return "0:00"; const m = Math.floor(sec/60); const s = Math.floor(sec%60).toString().padStart(2, '0'); return `${m}:${s}`; };
  document.getElementById('timeCurrent').innerText = format(cur);
  document.getElementById('timeTotal').innerText = format(tot);
  if (tot > 0) document.getElementById('progressFill').style.width = ((cur / tot) * 100) + '%';
});

// Automatically trigger fade out and next song when a song finishes
window.auraAudio.addEventListener('ended', playNextSong);

// Startup sequence
loadSyncLibrary();
loadTrendingMusic();