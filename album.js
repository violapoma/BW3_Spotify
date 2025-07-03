//recupero parametro album
const queryParam = new URLSearchParams(window.location.search)
const id = queryParam.get('id')


//costanti HTML
const middleCol = document.getElementById('middleCol')

//funzione chiamata fetch per album
async function fetchAlbum(id) {

    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
        if (!response.ok) throw new Error('Errore nella fetch')
        const data = await response.json()
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
    middleCol.appendChild(containerImgTitleAlbum)

    //contenitore immagine album
    const containerImgAlbum = document.createElement('div')
    containerImgTitleAlbum.appendChild(containerImgAlbum)

    //immagine album
    const imgAlbum = document.createElement('img')
    imgAlbum.src = album.cover_medium
    containerImgAlbum.appendChild(imgAlbum)

    //contenitore titoli 
    const containerTitles = document.createElement('div')
    containerTitles.classList.add('mx-2', 'd-flex', 'flex-column', 'justify-content-end')
    containerImgTitleAlbum.appendChild(containerTitles)

    //paragrafo scritta album
    const albumWord = document.createElement('p')
    albumWord.innerText = 'Album'
    albumWord.className = 'fw-bold'
    containerTitles.appendChild(albumWord)

    //titolo album
    const albumTitle = document.createElement('h1')
    albumTitle.innerText = album.title
    albumTitle.style.fontSize = '4.5vw'
    albumTitle.className = 'fw-bold'
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
    infoAlbum.innerText = `${album.artist.name} - ${album.release_date} - ${album.nb_tracks}, ${album.duration}`
    infoAlbum.className = 'fw-bold'
    containerInfo.appendChild(infoAlbum)

    const hr = document.createElement('hr')
    hr.style.width = '120%'
    hr.style.marginLeft = '-10%'
    middleCol.appendChild(hr)

    //contenitore icone (play - preferiti - download - menu)
    const containerButtons = document.createElement('div')
    containerButtons.classList.add('d-flex', 'align-items-center', 'py-2')
    //containerButtons.style.borderTop = 'solid 1px rgba(110, 101, 14, 0.45)'
    middleCol.appendChild(containerButtons)


    //bottone play
    const buttonPlay = document.createElement('button')
    buttonPlay.style.border = 'none'
    buttonPlay.style.backgroundColor = 'transparent'
    buttonPlay.style.borderRadius = '50%'
    containerButtons.appendChild(buttonPlay)

    //immagine play
    const play = document.createElement('img')
    play.src = 'assets/assets_album/play_4a582asoqmm8_64.png'
    buttonPlay.appendChild(play)

    //preferiti
    const favourites = document.createElement('img')
    favourites.src = 'assets/assets_album/favourite_mhu3xoxe7eyz_64.png'
    favourites.style.width = '52px'
    favourites.style.height = '52px'
    favourites.style.marginLeft = '10px'
    favourites.style.marginRight = '10px'
    containerButtons.appendChild(favourites)

    //download
    const download = document.createElement('img')
    download.src = 'assets/assets_album/download_circular_button_gfl9d6bisaeu_64.png'
    download.style.width = '40px'
    download.style.height = '40px'
    download.style.marginLeft = '10px'
    download.style.marginRight = '10px'
    containerButtons.appendChild(download)

    //menu
    const menu = document.createElement('img')
    menu.src = 'assets/menu_9oxo0y8h65z5_64.png'
    containerButtons.appendChild(menu)


    //funzione per generare tabella
    createTable(album)

}


function createTable(album) {


    const tableSongs = document.createElement('table')
    tableSongs.classList.add('table')
    middleCol.appendChild(tableSongs)

    const tableHead = document.createElement('thead')
    tableSongs.appendChild(tableHead)

    const trThead = document.createElement('tr')
    tableHead.appendChild(trThead)

    const thNumberSong = document.createElement('th')
    thNumberSong.setAttribute('scope', 'col')
    thNumberSong.innerText = '#'
    trThead.appendChild(thNumberSong)

    const thtitleSong = document.createElement('th')
    thtitleSong.setAttribute('scope', 'col')
    thtitleSong.innerText = 'TITOLO'
    trThead.appendChild(thtitleSong)

    const thRiprodutions = document.createElement('th')
    thRiprodutions.setAttribute('scope', 'col')
    thRiprodutions.innerText = 'RANKING'
    trThead.appendChild(thRiprodutions)

    const thTimeSongs = document.createElement('th')
    thTimeSongs.setAttribute('scope', 'col')
    trThead.appendChild(thTimeSongs)

    const hour = document.createElement('img')
    hour.src = 'assets/assets_album/hour_bd34k7yasiil_16.png'
    thTimeSongs.appendChild(hour)

    const tableBody = document.createElement('tbody')
    tableSongs.appendChild(tableBody)

    album.tracks.data.forEach((element, index) => {

        const tableRow = document.createElement('tr')
        tableBody.appendChild(tableRow)

        const thNumber = document.createElement('th')
        thNumber.innerText = index + 1
        thNumber.style.verticalAlign = "middle"
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
        tableRow.appendChild(rank)

        const time = document.createElement('td')
        time.innerText = element.duration
        time.style.verticalAlign = "middle"
        tableRow.appendChild(time)

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
