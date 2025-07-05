
//FUNZIONAMENTO TENDINA AMICI (COLONNA DESTRA)
document.addEventListener('DOMContentLoaded', () => {
    const rightCol = document.getElementById('rightCol')
    const middleCol = document.getElementById('middleCol')
    const closeBtn = document.getElementById('closeRightCol')
    const openBtn = document.getElementById('openRightCol')

    function closeRightCol() {
        rightCol.classList.add('d-none')
        rightCol.classList.remove('col-lg-2', 'col-md-3')

        middleCol.classList.replace('col-lg-7', 'col-lg-9')

        openBtn.style.display = 'block'
    }

    function openRightCol() {
        rightCol.classList.remove('d-none')

        if (window.matchMedia('(max-width: 1285px)').matches) {
            rightCol.classList.remove('col-lg-2')
            rightCol.classList.add('col-md-3')
        } else {
            rightCol.classList.remove('col-md-3')
            rightCol.classList.add('col-lg-2')
        }

        middleCol.classList.replace('col-lg-9', 'col-lg-7')

        openBtn.style.display = 'none'
    }

    closeBtn.addEventListener('click', closeRightCol)
    openBtn.addEventListener('click', openRightCol)


    //condizioni responsive

    function adjustRightCol() {
        if (window.matchMedia('(max-width: 1285px)').matches) {
            rightCol.classList.add('col-md-3')
            rightCol.classList.remove('col-lg-2')
        } else {
            rightCol.classList.add('col-lg-2')
            rightCol.classList.remove('col-md-3')
        }
    }

    adjustRightCol()


    window.addEventListener('resize', adjustRightCol)
});


