const Urlparams = new URLSearchParams(window.location.search);
const artistId = 412//Urlparams.get("id");
const centerBody = document.querySelector("#middleCol");
const listContainer = document.createElement("div");
listContainer.style = "max-height: 330px; margin: 20px; overflow-y: hidden;";
const songsList = document.createElement("ul");
songsList.style = "list-style: none; padding: 0; margin: 0;";
const buttonShowOther = document.createElement("button");
buttonShowOther.textContent = "Mostra altro";
buttonShowOther.style = "background-color: transparent; color: white; border: 0; margin: 10px;"
const buttonShowLess = document.createElement("button");
buttonShowLess.textContent = "Mostra meno";
buttonShowLess.style = "display: none; background-color: transparent; color: white; border: 0; margin: 10px;"

buttonShowOther.addEventListener("click", () => {
    listContainer.style.maxHeight = "none";
    buttonShowOther.style.display = "none";
    buttonShowLess.style.display = "block";
});

buttonShowLess.addEventListener("click", () => {
    listContainer.style.maxHeight = "330px";
    buttonShowOther.style.display = "block";
    buttonShowLess.style.display = "none";
});

searchArtist()
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

async function searchSongs(artistData) {
    try {
        const result = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistData.name}`, {
        })
        const data = await result.json()
        //console.log(data)
        createArtistPage(data.data)

    } catch (e) {
        console.log(e)
    }
}

function createArtistPage(songsData) {

    songsList.innerHTML = "";
    console.log(songsData[0].artist.picture_medium);
    let headerPage = document.innerHTML = `
        <div style="width: 100%; height: 400px; position: relative;">
                <img src="${songsData[0].artist.picture_xl}" alt="${songsData[0].artist.name}" style="width: 100%; height: 100%;">
                <h3 style="color: white; position: absolute; bottom: 10px; left: 20px;">${songsData[0].artist.name}</h3>
        </div>`;
    console.log(headerPage)
    centerBody.innerHTML = headerPage;
    const songElement = songsData.map((song) => {
        const songDuration = song.duration;
        const duration = calcDuration(songDuration);
        return `
        <li class="song" style = "width:100%; margin-top: 10px; margin-bottom: 10px;">
            <div class="song-info" style="display: flex; align-items: center; justify-content: start;">
                <img src="${song.album.cover_small}" alt="${song.title}" style="margin-right: 50px;">
                <p style="color: white; margin: 0; padding-right: 100px;">${song.title}</p>
                <p style="color: white; margin: 0;">${duration}</p>
            </div>
        </li>
        `;
    }).join("");

    songsList.innerHTML = songElement;
    listContainer.appendChild(songsList);
    centerBody.append(listContainer, buttonShowOther, buttonShowLess);
}

function calcDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
