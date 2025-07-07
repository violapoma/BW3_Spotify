const baseEndpoint = 'https://striveschool-api.herokuapp.com/api/deezer/';
const searchEndpoint = 'search?q=';
const albumEndpoint = 'album/'; // id
const artistEndpoint = 'artist/'; // id

const artistPage = '/artist.html?id=';
const albumPage = '/album.html?id=';

const firstArtist = 'sleep token';
const suggestedArtistStrings = ['rammstein', 'red hot chili peppers', 'nirvana', 'gorillaz', 'billie eilish', 'linkin park'];
const suggestedAlbumStrings = ['chapell roan', 'caparezza', 'tool', 'lorna shore', 'arctic monkeys', 'ren', 'paris paloma', 'la dispute'];

const mainContent = document.querySelector('#mainContent');
const firstSuggestionDiv = document.querySelector('#firstSuggestion');
const recentlyListenedDiv = document.querySelector('#recentlyListened');
const moreSuggestionsContent = document.querySelector('#moreSuggestionsContent');

let idFirstAlbumSuggested;


window.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    firstSuggestionFill(),
    recentlyListenedFill(),
    moreSuggestionFill(),
  ]);

  //qui per riempire il player
  audio.volume = 0.3;
  volumeFill.style.width = `${parseFloat(audio.volume * 100)}%`;
  console.log('idFirstAlbumSuggested', idFirstAlbumSuggested);
  fetchPlaylist();
});

async function fetchSearch(author) {
  const resp = await fetch(baseEndpoint + searchEndpoint + author);
  const authorAll = await resp.json(); //data[[]]

  console.log('[fetchSearch]', authorAll); //oppure vedi su postman la struttura
  return authorAll;
}

async function fetchArtist(id) {
  console.log('[fetchArtist]searching for', baseEndpoint + artistEndpoint + id);

  const resp = await fetch(baseEndpoint + artistEndpoint + id);
  const artist = await resp.json();

  console.log('[fetchArtist]', artist);
  return artist;
}

//ret un album random da un artista
function randomAlbumFormArtist(artist) {
  const length = artist.data.length;
  console.log('[randomAlbumFromArtist]author', artist);
  console.log('[randomAlbumFromArtist]length', length);

  //da 0 a length inclusi
  const songIDX = Math.floor((Math.random() * length));
  console.log('[randomAlbumFromArtist]songID', songIDX); //cambia ogni volta, ma sempre dello stesso autore
  console.log('[randomAlbumFromArtist]data[songIDX]', artist.data[songIDX]);

  return artist.data[songIDX];
}

//random album di un artista !!!TODO SISTEMA PER RICICLO
async function firstSuggestionFill() {
  const authorAll = await fetchSearch(firstArtist);
  const length = authorAll.data.length;
  console.log('[firstSuggested]length', length);

  const songIDX = Math.floor((Math.random() * length));
  console.log('songID', songIDX); //cambia ogni volta, ma sempre dello stesso autore
  console.log('data[songIDX]', authorAll.data[songIDX]);

  idFirstAlbumSuggested = authorAll.data[songIDX].album.id;

  buildBanner(authorAll.data[songIDX]);

}

function buildBanner(song) {
  const row = document.createElement('div');
  row.className = 'm-3 row align-items-center text-white fs-6 rounded p-2';

  const songImg = document.createElement('img');
  songImg.src = song.album.cover_medium;
  songImg.alt = song.album.title;
  songImg.className = 'col-3 object-fit-contain bannerImg';

  const infoCol = document.createElement('div');
  infoCol.className = 'col-9';

  const type = document.createElement('p');
  type.className = 'fw-bold text-uppercase ';
  type.innerText = 'album';

  const albumTitle = document.createElement('p');
  albumTitle.className = 'h1 fw-bolder bannerTitle';
  albumTitle.innerText = song.album.title;

  const author = document.createElement('p');
  author.innerText = song.artist.name;

  const catchPhrase = document.createElement('p');
  catchPhrase.innerText = "Ascolta ora";

  const buttonsRow = document.createElement('div');
  const playBtn = document.createElement('button');
  playBtn.className = 'btn bgGreen myBtn';
  playBtn.innerText = 'Play';
  playBtn.addEventListener('click', () => {
    playPauseBtn.click();
  }); //si collega al player sotto

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-outline-light myBtn';
  saveBtn.innerText = 'Salva';

  const moreBtn = document.createElement('button');
  moreBtn.className = 'btn text-white fs-4';
  moreBtn.innerHTML = '<i class="bi bi-three-dots"></i>';

  buttonsRow.append(playBtn, saveBtn, moreBtn);

  infoCol.append(type, albumTitle, author, catchPhrase, buttonsRow);
  row.append(songImg, infoCol);
  firstSuggestionDiv.append(row);
}

async function recentlyListenedFill() {

  const timestamp = new Date();
  const hour = timestamp.getHours();

  const msg = document.createElement('p');
  msg.innerText = hour < 13 ? 'Buongiorno' : 'Buonasera';
  msg.className = 'text-white fs-4 fw-bolder'

  recentlyListenedDiv.append(msg);
  buildRecently();

}

//da suggestedArtists
async function buildRecently() {
  const cardsDiv = document.createElement('div');
  cardsDiv.className = 'row';

  //da stringa ad oggetto artista con i brani suoi
  const suggestedArtists = await Promise.all(
    suggestedArtistStrings.map(artist => fetchSearch(artist))
  );

  //da oggetto a canzone random
  const suggestedRandom = suggestedArtists.map(artist => randomAlbumFormArtist(artist)); console.log('suggestedRandom', suggestedRandom);

  const cards = suggestedRandom.map(artist => buildOneRecent(artist));
  console.log('cards', cards);

  cardsDiv.append(...cards);
  recentlyListenedDiv.append(cardsDiv)
}

function buildOneRecent(artist) {

  const albumBanner = document.createElement('div');
  albumBanner.className = 'col-12 col-sm-6 col-lg-4 mb-3 albumBanner';

  const linkTo = document.createElement('a');
  linkTo.href = albumPage + artist.album.id;

  const cardInner = document.createElement('div');
  cardInner.className = 'rounded darkGreyBg d-flex align-items-center h-100 overflow-hidden';

  const img = document.createElement('img');
  img.src = artist.album.cover_medium;
  img.alt = artist.album.title;
  img.className = 'squareImg';

  const title = document.createElement('div');
  title.innerText = `${artist.album.title} - ${artist.artist.name}`;
  title.className = 'text-white fs-6 multiline-ellipsis ps-3 pe-1';

  cardInner.append(img, title);

  linkTo.append(cardInner);
  albumBanner.append(linkTo);
  return albumBanner;
}

async function moreSuggestionFill() {

  const converted = await Promise.all(
    suggestedAlbumStrings.map(artist => fetchSearch(artist))
  );
  console.log('[more]converted', converted);

  converted.forEach(ele =>
    console.log('foreach converted', ele.data[0].artist.id));

  const artistArray = await Promise.all(
    converted.map(artist => fetchArtist(artist.data[0].artist.id))
  );

  console.log('[moreSuggestionFill]artistArray', artistArray);

  const cards = artistArray.map(album => squreCard(album));
  console.log('moresuggestion', cards);

  moreSuggestionsContent.append(...cards);

  const containerEmpty = document.createElement('div');
  containerEmpty.style.height = '180px';
  containerEmpty.style.backgroundColor = 'trasparent';
  middleCol.appendChild(containerEmpty);
}

//ritorna card di un artista
function squreCard(elem) {
  const col = document.createElement('div');
  col.className = 'col-6 col-lg-3 mb-sm-3';

  const card = document.createElement('div');
  card.className = 'card darkGreyBg h-100';

  const cardImg = document.createElement('img');
  cardImg.src = elem.picture_medium;
  cardImg.alt = elem.name;
  cardImg.className = 'card-img-top p-2 d-block rounded img-fluid';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body darkGreyBg';

  const artistName = document.createElement('a');
  artistName.className = 'h3 card-title fs-6 fw-bold text-white';
  artistName.innerText = `${elem.name}`;
  artistName.href = artistPage + elem.id;

  cardBody.append(artistName);
  card.append(cardImg, cardBody);
  col.append(card);
  return col;
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