const Urlparams = new URLSearchParams(window.location.search);
const artistId = Urlparams.get("id");
const centerBody = document.querySelector("#middleCol");
const containerCenterBody = document.createElement("div");
containerCenterBody.style = "width: 100%; display: flex; justify-content: space-between;";
const divPrefSong = document.createElement("div");
divPrefSong.style = "width: 40%; max-height: 280px; margin: 20px;";
const listContainer = document.createElement("div");
listContainer.style = "width: 60%; max-height: 280px; margin: 20px; overflow-y: hidden;";
const titleSongList = document.createElement("h3");
titleSongList.textContent = "Populars";
titleSongList.style = "color: white; margin: 0; padding-bottom: 10px; font-weight: bold;";
const songsList = document.createElement("ul");
songsList.style = "list-style: none; padding: 0; margin: 0;";
const buttonShowOther = document.createElement("button");
buttonShowOther.textContent = "Mostra altro";
buttonShowOther.style = "background-color: transparent; color: white; border: 0; margin: 10px;"
const buttonShowLess = document.createElement("button");
buttonShowLess.textContent = "Mostra meno";
buttonShowLess.style = "display: none; background-color: transparent; color: white; border: 0; margin: 10px;"





const prevBtn = document.querySelector('#prevBtn')
let playList = [];

buttonShowOther.addEventListener("click", () => {
    listContainer.style.maxHeight = "none";
    buttonShowOther.style.display = "none";
    buttonShowLess.style.display = "block";
});

buttonShowLess.addEventListener("click", () => {
    listContainer.style.maxHeight = "280px";
    buttonShowOther.style.display = "block";
    buttonShowLess.style.display = "none";
});


async function searchArtist() {
    try {
        const result = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`, {
        })
        const data = await result.json()
        document.title = data.name;
        searchSongs(data)

    } catch (e) {
        console.log(e)
    }
}

function playSong() {

    console.log('buttonPlay clicked');
    if (audio.paused)
        setPlayer(playList, 0)
    //setSongPreview(album, 0)
    //playPauseBtn.click()
    togglePlayPause();
    console.log(buttonPlay)
}

function togglePlayPause() {
    console.log(audio.paused);
    if (audio.paused) {
        audio.play();
        playPauseIcon.classList.remove('bi-play-circle-fill');
        playPauseIcon.classList.add('bi-pause-circle-fill');
    } else {
        audio.pause();
        console.log('STO PROVANDO A STOPPARLA')
        playPauseIcon.classList.remove('bi-pause-circle-fill');
        playPauseIcon.classList.add('bi-play-circle-fill');
    }
}


window.addEventListener('DOMContentLoaded', () => {
    audio.volume = 0.3
    volumeFill.style.width = `${parseFloat(audio.volume * 100)}%`;
    searchArtist();
})

async function fetchPlaylist() {
    console.log('[fetchPlaylist]start')
    console.log('[fetchPlaylist]idFirstAlbumSuggested', idFirstAlbumSuggested);

    const resp = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistData.name}`);
    const album = await resp.json();

    console.log('[fetchPlayist]', album);

    let playlist = [];
    album.tracks.data.forEach(song =>
        playlist.push(song.preview));

    console.log('[fetchPlaylist]playlist', playlist);

    const idx = generateIdx(playlist.length);

    setPlayer(playlist, idx);

    setSongPreview(album, idx);

    nextBtn.addEventListener('click', () => {
        let newIdx;
        const currentIdx = audio.getAttribute('data-song-idx');
        const totalSongs = audio.getAttribute('data-total-tracks');
        console.log('[newIdx]curridx', currentIdx, 'totalSongs', totalSongs);
        do
            newIdx = generateIdx(totalSongs);
        while (newIdx == parseInt(currentIdx));
        console.log('[newIdx]', newIdx);
        setPlayer(playlist, newIdx);
        setSongPreview(album, newIdx);
        playPauseBtn.click(); //così parte
    });
}


async function searchSongs(artistData) {
    try {
        const result = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistData.name}`, {
        })
        const data = await result.json()
        console.log(data)
        data.data.forEach(e => {
            playList.push(e.preview)
        })
        console.log(playList)
        createArtistPage(data.data, artistData, playList);
        prevBtn.addEventListener('click', () => {
            const currentIdx = parseInt(audio.getAttribute('data-song-idx')) - 1;
            console.log(typeof currentIdx)
            setPlayer(playList, currentIdx);
            setSongPreview(data, currentIdx)
            playPauseBtn.click();
        })
        nextBtn.addEventListener('click', () => {
            const currentIdx = parseInt(audio.getAttribute('data-song-idx')) + 1;
            console.log(typeof currentIdx)
            setPlayer(playList, currentIdx);
            setSongPreview(data, currentIdx)
            playPauseBtn.click(); //così parte
        });

    } catch (e) {
        console.log(e)
    }
}

function createArtistPage(songsData, artistData) {

    let idSong = 0;
    console.log(songsData[0].artist.picture_medium);
    let headerPage = document.innerHTML = `
        <div style="width: 100%; height: 400px; position: relative;">
                <img src="${songsData[0].artist.picture_xl}" alt="${songsData[0].artist.name}" style="width: 100%; height: 100%;">
                <p style="color: white; position: absolute; bottom: 85px; left: 20px;"><i class="bi bi-patch-check-fill" style="color: #4da0f6; margin-right:10px;"></i>Artista verificato</p>
                <h1 style="color: white; position: absolute; bottom: 25px; left: 20px;font-size: 4em;font-weight: bold;">${songsData[0].artist.name}</h1>
                <p style="color: white; position: absolute; bottom: -10px; left: 20px;">${artistData.nb_fan} fan</p>
        </div>`;
    console.log(headerPage)
    centerBody.innerHTML += headerPage;
    let buttonraw = document.innerHTML = `
        <div class="d-flex align-items-center" id="containerButtons" style="padding-left: 30px;padding-top: 20px;padding-bottom: 20px;"><button id="buttonPlay"
                        style="border: none; background-color: transparent; border-radius: 50%;margin-right: 10px;" onclick="playSong()"><img
                            src="assets/assets_album/play_4a582asoqmm8_64.png"></button>
                    <div><button style="background-color: transparent;color: white;border: 1px solid white;border-radius: 5px;
                        padding: 2px 9px;font-size: 0.8em;font-weight: bold;" id="buttonFollow" onclick="followArtist()">FOLLOW</button></div>
        </div>`;
    centerBody.innerHTML += buttonraw;
    const songElement = songsData.map((song) => {
        const songDuration = song.duration;
        const duration = calcDuration(songDuration);
        idSong++;
        return `
        <li class="song" style = "width:100%; margin-top: 10px; margin-bottom: 10px;">
            <div class="song-info" style="display: flex; align-items: center; justify-content: start;">
                <div id = "${idSong - 1}" class="imgSongList" style="background-image: url('${song.album.cover_small}'); background-size: cover; width: 45px; height: 45px; margin-right: 15px; display: flex; align-items: center; justify-content: center;" onclick = "contrPlayerSongs(${idSong - 1}, ${song.album.id})">
                    <i class="bi bi-play-fill iImgSongList" style="color: white;color: transparent;"></i>
                </div>
                <p style="color: white; margin: 0; padding-right: 100px;width: 70%; font-size:0.9em">${song.title}</p>
                <p style="color: white; margin: 0; font-size: 0.9em;">${duration}</p>
            </div>
        </li>
        `;
    }).join("");

    divPrefSong.innerHTML = `
        <h3 style='color: white; margin: 0; padding-bottom: 10px; font-weight: bold;'>Song you like</h3>
        <div class="d-flex justify-content-start" style="height: 100%; width: 100%; margin-top:10px;">
            <img src="${songsData[0].artist.picture_small}" alt="" style="width: 50px; height: 50px; overflow: hidden; border-radius: 50%; margin-left: 15px; margin-right: 10px;">
            <div>
                <h6 style="color: white; margin: 0;">You liked 11 songs</h6>
                <p style="color: white; margin: 0; font-size: 0.8em;">Of ${songsData[0].artist.name}</p>
            </div>
        </div>
        `;

    songsList.innerHTML = songElement;
    listContainer.append(titleSongList, songsList);
    containerCenterBody.append(listContainer, divPrefSong);
    centerBody.append(containerCenterBody, buttonShowOther, buttonShowLess);
}

function contrPlayerSongs(idx, albumId) {
    console.log(idx);
    if (audio.paused)
        setPlayer(playList, idx)
    loadFooter();
    async function loadFooter() {
        try {
            const result = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`, {
            })
            const data = await result.json()
            setSongPreview(data, idx)

        } catch (e) {
            console.log(e)
        }
    }
    //playPauseBtn.click()
    togglePlayPause();
    console.log(buttonPlay)
}


function followArtist() {
    const buttonFollow = document.querySelector('#buttonFollow');
    if (buttonFollow.textContent === "FOLLOW") {
        buttonFollow.textContent = "FOLLOWING";
    } else {
        buttonFollow.textContent = "FOLLOW";
        buttonFollow.style.backgroundColor = "transparent";
    }
}

function calcDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

/************ GESTIONE PLAYER ************ */
const audio = document.querySelector('#audioPlayer');
const playPauseBtn = document.querySelector('#playPauseBtn');
const playPauseIcon = playPauseBtn.querySelector('i');
const progressFill = document.querySelector('#progressFill');
const progressContainer = document.querySelector('#progressionContainer');
const currentTimeSmall = document.querySelector('#currentTimeSmall');
const totalTime = document.querySelector('#totalTime');
const songPreviewDiv = document.querySelector('#songPreview');
const nextBtn = document.querySelector('#nextBtn');
const volumeContainer = document.querySelector('#volumeContainer');
const volumeFill = document.querySelector('#volumeFill');


function setPlayer(playlist, idx) {
    audio.src = playlist[idx];
    audio.setAttribute('data-song-idx', parseInt(idx));
    audio.setAttribute('data-total-tracks', playlist.length);
    console.log('[setPlayer]audio', audio);
}

//toggle play e pause
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseIcon.classList.remove('bi-play-circle-fill');
        playPauseIcon.classList.add('bi-pause-circle-fill');
    } else {
        audio.pause();
        playPauseIcon.classList.remove('bi-pause-circle-fill');
        playPauseIcon.classList.add('bi-play-circle-fill');
    }
});


audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = percent + '%';
    currentTimeSmall.textContent = formatTime(audio.currentTime);
});

progressContainer.addEventListener('click', (e) => {
    //rect contiene left, right, width, height, top, bottom della barra di progressione
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    audio.currentTime = percent * audio.duration;
});

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

audio.addEventListener('loadedmetadata', () => {
    totalTime.textContent = formatTime(audio.duration);
});

function setSongPreview(album, songIDX) {

    playPauseBtn.removeAttribute('disabled')

    if (songIDX == 0) {
        prevBtn.setAttribute('disabled', true)
    } else {
        prevBtn.removeAttribute('disabled')
    }

    if (songIDX == playList.length - 1) {
        nextBtn.setAttribute('disabled', true)
    } else {
        nextBtn.removeAttribute('disabled')
    }

    songPreviewDiv.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'h-75 w-100 d-flex my-auto '

    const imgDiv = document.createElement('div');
    imgDiv.className = 'pe-3';

    const img = document.createElement('img');
    img.src = album.cover_medium;
    img.alt = album.title;
    img.className = 'squareImg';

    imgDiv.appendChild(img);

    const songInfo = document.createElement('div');
    songInfo.className = 'text-white songInfo fs-6  pe-1';

    const title = document.createElement('h6');
    title.className = 'songTitle pe-1';
    title.innerText = album.tracks.data[songIDX].title;
    // title.innerText = 'titolo molto molto molto molto molto lungo';

    const artist = document.createElement('small');
    // artist.className('');
    artist.textContent = album.artist.name; //no innertext

    songInfo.append(title, artist);
    wrapper.append(imgDiv, songInfo);
    songPreviewDiv.append(wrapper);
    requestAnimationFrame(() => { //aspeto che l'elemento sia nel DOM e poi calcolo la width
        if (title.scrollWidth > songInfo.clientWidth) {
            title.classList.add('scrolling');
        }
    });
}


volumeContainer.addEventListener('click', (e) => {
    const rect = volumeContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;

    audio.volume = Math.min(Math.max(percent, 0), 1); // Clamp tra 0 e 1
    volumeFill.style.width = (audio.volume * 100) + '%';

});
