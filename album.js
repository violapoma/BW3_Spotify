//recupero parametro album
const queryParam = new URLSearchParams(window.location.search)
const id = queryParam.get('id')

let playList = []


//costanti HTML
const middleCol = document.getElementById('middleCol')

//funzione chiamata fetch per album
async function fetchAlbum(id) {

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
        if (!response.ok) throw new Error('Errore nella fetch')
        const data = await response.json()
        data.tracks.data.forEach(e => {
            playList.push(e.preview)
        })
        console.log(playList)
        nextBtn.addEventListener('click', () => {
            const currentIdx = parseInt(audio.getAttribute('data-song-idx') + 1);
            setPlayer(playList, currentIdx);
            setSongPreview(data, currentIdx)
            playPauseBtn.click(); //così parte
        });
        console.log(data)
        renderAlbum(data)
    } catch (error) {
        console.error(error)
    }

}

fetchAlbum(id)



//funzione costruzione layout album
function renderAlbum(album) {


    //contenitore immagine album e titoli
    const containerImgTitleAlbum = document.createElement('div')
    containerImgTitleAlbum.classList.add('d-flex', 'my-3')
    containerImgTitleAlbum.id = 'containerImgTitleAlbum'
    middleCol.appendChild(containerImgTitleAlbum)

    //contenitore immagine album
    const containerImgAlbum = document.createElement('div')
    containerImgAlbum.id = 'containerImgAlbum'
    containerImgTitleAlbum.appendChild(containerImgAlbum)

    //immagine album
    const imgAlbum = document.createElement('img')
    imgAlbum.src = album.cover_medium
    containerImgAlbum.appendChild(imgAlbum)

    //contenitore titoli 
    const containerTitles = document.createElement('div')
    containerTitles.classList.add('mx-2', 'd-flex', 'flex-column', 'justify-content-end')
    containerImgTitleAlbum.appendChild(containerTitles)

    //contenitore parola album
    const containerAlbumWord = document.createElement('div')
    containerAlbumWord.id = 'containerAlbumWord'
    containerTitles.appendChild(containerAlbumWord)

    //paragrafo scritta album
    const albumWord = document.createElement('p')
    albumWord.innerText = 'Album'
    albumWord.className = 'fw-bold'
    containerAlbumWord.appendChild(albumWord)

    //titolo album
    const albumTitle = document.createElement('h1')
    albumTitle.innerText = album.title
    albumTitle.style.fontSize = '4.5vw'
    albumTitle.className = 'fw-bold'
    albumTitle.id = 'albumTitle'
    containerTitles.appendChild(albumTitle)

    //contenitore icona artista e info
    const containerInfo = document.createElement('div')
    containerInfo.classList.add('d-flex')
    containerTitles.appendChild(containerInfo)

    //icona artista
    const imgIconSinger = document.createElement('img')
    imgIconSinger.src = album.artist.picture
    imgIconSinger.style.width = '25px'
    imgIconSinger.style.height = '25px'
    imgIconSinger.style.borderRadius = '50%'
    containerInfo.appendChild(imgIconSinger)

    //info album e artista
    const infoAlbum = document.createElement('p')
    infoAlbum.innerHTML = `${album.artist.name} <span id='spanDisplayNone'>- ${album.release_date} - ${album.nb_tracks}, ${album.duration}</span>`
    infoAlbum.className = 'fw-bold'
    infoAlbum.id = 'infoAlbum'
    containerInfo.appendChild(infoAlbum)

    const hr = document.createElement('hr')
    hr.style.width = '120%'
    hr.style.marginLeft = '-10%'
    hr.id = 'hr'
    middleCol.appendChild(hr)

    //container visibile sotto i 715px (album e data rilascio)
    const container715AlbumRelease = document.createElement('div')
    middleCol.appendChild(container715AlbumRelease)

    //testo container 715
    const text715 = document.createElement('span')
    text715.innerText = `Album - ${album.release_date}`
    container715AlbumRelease.appendChild(text715)

    //contenitore icone (play - preferiti - download - menu)
    const containerButtons = document.createElement('div')
    containerButtons.classList.add('d-flex', 'align-items-center', 'py-2')
    containerButtons.id = 'containerButtons'
    middleCol.appendChild(containerButtons)


    //bottone play
    const buttonPlay = document.createElement('button')
    buttonPlay.style.border = 'none'
    buttonPlay.style.backgroundColor = 'transparent'
    buttonPlay.style.borderRadius = '50%'
    buttonPlay.id = 'buttonPlay'
    containerButtons.appendChild(buttonPlay)

    //immagine play
    const play = document.createElement('img')
    play.src = 'assets/assets_album/play_4a582asoqmm8_64.png'
    buttonPlay.appendChild(play)

    //container 715 icone (preferiti - download - menu)
    const container715FavouriteDownloadMenu = document.createElement('div')
    containerButtons.appendChild(container715FavouriteDownloadMenu)

    //preferiti
    const favourites = document.createElement('img')
    favourites.src = 'assets/assets_album/favourite_mhu3xoxe7eyz_64.png'
    favourites.style.width = '52px'
    favourites.style.height = '52px'
    favourites.style.marginLeft = '10px'
    favourites.style.marginRight = '10px'
    container715FavouriteDownloadMenu.appendChild(favourites)

    //download
    const download = document.createElement('img')
    download.src = 'assets/assets_album/download_circular_button_gfl9d6bisaeu_64.png'
    download.style.width = '40px'
    download.style.height = '40px'
    download.style.marginLeft = '10px'
    download.style.marginRight = '10px'
    container715FavouriteDownloadMenu.appendChild(download)

    //menu
    const menu = document.createElement('img')
    menu.src = 'assets/menu_9oxo0y8h65z5_64.png'
    container715FavouriteDownloadMenu.appendChild(menu)


    //funzione per generare tabella
    createTable(album)

}


function createTable(album) {


    const tableSongs = document.createElement('table')
    tableSongs.classList.add('table')
    tableSongs.id = 'tableSongs'
    middleCol.appendChild(tableSongs)

    const tableHead = document.createElement('thead')
    tableHead.id = 'tableHead'
    tableSongs.appendChild(tableHead)

    const trThead = document.createElement('tr')
    trThead.id = 'trThead'
    tableHead.appendChild(trThead)

    const thNumberSong = document.createElement('th')
    thNumberSong.setAttribute('scope', 'col')
    thNumberSong.innerText = '#'
    thNumberSong.id = 'thNumberSong'
    trThead.appendChild(thNumberSong)

    const thtitleSong = document.createElement('th')
    thtitleSong.setAttribute('scope', 'col')
    thtitleSong.innerText = 'TITOLO'
    thtitleSong.id = 'thtitleSong'
    trThead.appendChild(thtitleSong)

    const thRiprodutions = document.createElement('th')
    thRiprodutions.setAttribute('scope', 'col')
    thRiprodutions.innerText = 'RANKING'
    thRiprodutions.id = 'thRiprodutions'
    trThead.appendChild(thRiprodutions)

    const thTimeSongs = document.createElement('th')
    thTimeSongs.setAttribute('scope', 'col')
    thTimeSongs.id = 'thTimeSongs'
    trThead.appendChild(thTimeSongs)

    const hour = document.createElement('img')
    hour.src = 'assets/assets_album/hour_bd34k7yasiil_16.png'
    hour.id = 'hour'
    thTimeSongs.appendChild(hour)

    const tableBody = document.createElement('tbody')
    tableSongs.appendChild(tableBody)

    //conteiner trasparente per faciliare lo scroll
    const containerEmpty = document.createElement('div')
    containerEmpty.style.height = '180px'
    containerEmpty.style.backgroundColor = 'trasparent'
    middleCol.appendChild(containerEmpty)

    album.tracks.data.forEach((element, index) => {

        const tableRow = document.createElement('tr')
        tableBody.appendChild(tableRow)

        const thNumber = document.createElement('th')
        thNumber.innerText = index + 1
        thNumber.style.verticalAlign = "middle"
        thNumber.id = 'thNumber'
        thNumber.style.cursor = 'pointer'
        thNumber.addEventListener('click', () => {
            setPlayer(playList, index)
            setSongPreview(album, index)
            playPauseBtn.click()
        })

        tableRow.appendChild(thNumber)

        const tdContanier = document.createElement('td')
        tdContanier.style.verticalAlign = "middle"
        tableRow.appendChild(tdContanier)

        const containerSOngArtist = document.createElement('div')
        containerSOngArtist.classList.add('d-flex', 'flex-column', 'justify-content-center')
        tdContanier.appendChild(containerSOngArtist)

        const song = document.createElement('p')
        song.innerText = element.title
        song.classList.add('fw-bold', 'm-0')
        containerSOngArtist.appendChild(song)

        const artist = document.createElement('p')
        artist.innerText = element.artist.name
        artist.classList.add('m-0')
        containerSOngArtist.appendChild(artist)

        const rank = document.createElement('td')
        rank.innerText = element.rank
        rank.style.verticalAlign = "middle"
        rank.id = 'rank'
        tableRow.appendChild(rank)

        const time = document.createElement('td')
        time.innerText = element.duration
        time.style.verticalAlign = "middle"
        time.id = 'time'
        tableRow.appendChild(time)

        const tdMenu = document.createElement('td')
        tableRow.appendChild(tdMenu)

        //img menu sotto i 715px
        const menuImg = document.createElement('img')
        menuImg.src = 'assets/assets_album/istockphoto-1168504016-170667a.png'
        menuImg.style.width = '32px'
        menuImg.style.height = '32px'
        tdMenu.appendChild(menuImg)

    })

    tableSongs.style.backgroundColor = 'transparent'


    const allTableElements = tableSongs.querySelectorAll('thead, tbody, tr, th, td')
    allTableElements.forEach(el => {
        el.style.backgroundColor = 'transparent'
        el.style.color = 'rgb(242, 242, 242)'
        el.style.borderBottom = 'none'
    })

    tableHead.style.borderBottom = 'solid 1px rgb(71, 71, 71)'

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

async function fetchPlaylist() {
    console.log('[fetchPlaylist]start')
    console.log('[fetchPlaylist]idFirstAlbumSuggested', idFirstAlbumSuggested);

    const resp = await fetch(baseEndpoint + albumEndpoint + idFirstAlbumSuggested);
    const album = await resp.json();

    console.log('[fetchPlayist]', album);

    let playlist = [];
    album.tracks.data.forEach(song =>
        playlist.push(song.preview));

    console.log('[fetchPlaylist]playlist', playlist);

    // const idx = Math.floor(Math.random()*playlist.length);
    // console.log('[fetchPlaylist]idx', idx);
    const idx = generateIdx(playlist.length);

    // audio.src=playlist[idx];
    // audio.setAttribute('data-song-idx', idx);
    // audio.setAttribute('data-total-tracks', playlist.length);
    // console.log('[fetchPlaylist]audio', audio);
    setPlayer(playlist, idx, data);




}

function generateIdx(maxL) {
    const idx = Math.floor(Math.random() * maxL);
    console.log('[generateIdx]idx', idx);
    return idx;
}

function setPlayer(playlist, idx) {
    audio.src = playlist[idx];
    audio.setAttribute('data-song-idx', idx);
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