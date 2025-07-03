
const divRow = document.getElementById('divRow')

function fetchsata() {
    fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=p')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            renderData(data.data)
        })
        .catch(error => console.log(error))
}
fetchsata()


function renderData(album) {

    album.forEach(album => {

        const linkToAlbum = document.createElement('a')
        linkToAlbum.href = `album.html?id=${album.album.id}`
        
        const immagine = document.createElement('img')
        immagine.style.width = '300px'
        immagine.src = album.album.cover_medium


        linkToAlbum.appendChild(immagine)
        divRow.appendChild(linkToAlbum)

    });

}