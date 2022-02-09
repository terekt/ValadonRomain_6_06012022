let filter = document.getElementById("sortingMenu");
let lightbox = document.querySelector(".lightbox");
let closeButton = document.querySelector(".lightbox-close");
let prevButton = document.querySelector(".lightbox-prev");
let nextButton = document.querySelector(".lightbox-next");

// Affiches les infos du photographe
async function displayProfile(photographerData) {


    const picture = 'assets/photographers/profils/' + photographerData[0].portrait;
    const profileSection = document.querySelector(".photograph-header");
    const infoProfile = document.createElement('div');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    const img = document.createElement('img');

    infoProfile.setAttribute('class', 'infoProfile');
    h2.textContent = photographerData[0].name;
    h3.textContent = photographerData[0].city + ", " + photographerData[0].country;
    h4.textContent = photographerData[0].tagline;
    img.setAttribute("src", picture);

    profileSection.appendChild(infoProfile)
    infoProfile.appendChild(h2);
    infoProfile.appendChild(h3);
    infoProfile.appendChild(h4);
    profileSection.appendChild(infoProfile.previousElementSibling);
    profileSection.appendChild(img);

};


//Affiche le prix et les likes en bas de l'écran
async function getFixedCounter() {

    const photographerMedia = await getPhotographers();
    const price = photographerMedia[0].price;
    let likes = photographerMedia[1].map(a => a.likes);

    const TotalLikes = likes.reduce((partialSum, a) => partialSum + a, 0);
    const fixedCounter = document.querySelector('.fixed-counter');
    const hourlyRate = document.createElement('p');

    hourlyRate.innerHTML = `<span class="total-likes">${TotalLikes}</span> <i class="fas fa-heart total-heart"></i> <span class="daily-rate">${price}€ / jour</span>`;
    fixedCounter.appendChild(hourlyRate);

    manageLikes(hourlyRate);
}

//incrémente les likes au clic sur les coeurs
async function manageLikes(totallikes) {
    await getPhotographers();
    const like = document.querySelectorAll(".like_img");
    const totallike = totallikes.querySelector(".total-likes");

    for (const clickHeart of like) {
        clickHeart.addEventListener("click", () => {
            //récupère le nombre de like
            let siblingClick = clickHeart.parentNode.previousElementSibling;
            //créé une variable pour définir l'état de chaque boutton like
            let state = clickHeart.getAttribute('data-state') || 0;

            if (state == 0) {
                siblingClick.innerHTML = parseInt(siblingClick.innerHTML) + 1;
                totallike.innerHTML++;
                clickHeart.setAttribute('data-state', 1);
            } else {
                siblingClick.innerHTML = parseInt(siblingClick.innerHTML) - 1;
                totallike.innerHTML--;
                clickHeart.setAttribute('data-state', 0);
            }
        });
    }
}




// Affiches les médias du photographe
async function displayMedia(photographerMedia) {


    const mediaSection = document.querySelector(".media");
    var mediaFilter = null;

    const mediasphotographer = photographerMedia[1];

    //filtre popularité par défaut
    mediaFilter = mediasphotographer.sort((a, b) => {
        return a.likes - b.likes;
    });

    //écoute quand on clique sur le bouton de filtre
    filter.addEventListener("click", () => {

        //met à jour l'option selectionnée
        filter = document.getElementById("sortingMenu");

        //filtre popularité
        if (filter.value == "popularity") {
            console.log("option du filtre : " + filter.value);
            mediaFilter = mediasphotographer.sort((a, b) => {
                return a.likes - b.likes;
            });
        }

        //filtre titre
        if (filter.value == "title") {
            console.log("option du filtre : " + filter.value);
            mediaFilter = mediasphotographer.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
        }

        //filtre date
        if (filter.value == "date") {
            console.log("option du filtre : " + filter.value);
            mediaFilter.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
        }

        //met à jour l'affichage des médias via la liste triée
        mediaSection.innerHTML = "";
        mediaFilter.forEach((media) => {
            const MediaModel = mediaFactory(media);
            const MediaDOM = MediaModel.MediaDOM();
            mediaSection.appendChild(MediaDOM);
        });
    });



    //affichage des médias via l'option de tri par défaut
    mediaSection.innerHTML = "";
    mediaFilter.forEach((media) => {
        const MediaModel = mediaFactory(media);
        const MediaDOM = MediaModel.MediaDOM();
        mediaSection.appendChild(MediaDOM);
    });

}


//gère la création de lightbox en fonction du tri des médias
async function Lightbox() {
    const photographerMedia = await getPhotographers();

    LightboxCreate()

    filter.addEventListener("click", () => {
        LightboxCreate()
    })

}

let links = "";

//récupère les images dans la page et écoute quand on clique sur l'une d'entre elles
function LightboxCreate() {

    //récupère les images dans la page 
    links = document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]')


    //écoute quand on clique sur l'une d'entre elles et récupère les éléments créés
    links.forEach(link => link.addEventListener('click', e => {
        e.preventDefault()
        constructor(e.currentTarget.getAttribute('href'))
        closeButton = document.querySelector(".lightbox-close");
        prevButton = document.querySelector(".lightbox-prev");
        nextButton = document.querySelector(".lightbox-next");
        lightbox = document.querySelector(".lightbox");
        naviguation();
    }))
}

//permet de fermer la lightbox et passer d'un média à un autre
function naviguation() {
    let lightboxImage = document.querySelector(".lightbox-container").querySelector("img");
    let imageUrl = lightboxImage.getAttribute("src");
    let imageUrlCache = imageUrl.substring(1);
    let imageArray = Array.from(links);
    let cachedPath = "";


    closeButton.addEventListener("click", () => {
        console.log("exit");
        lightbox.style.display = "none";
        lightbox.remove();
    })

    prevButton.addEventListener("click", () => {
        lightboxImage = document.querySelector(".lightbox-container").querySelector("img");
        imageUrl = lightboxImage.getAttribute("src");
        imageUrlCache = imageUrl.substring(1);
        let i = imageArray.findIndex(element => element.pathname === imageUrlCache);

        if (i === 0) {
            cachedPath = imageArray[imageArray.length - 1].getAttribute("href");
            lightboxImage.setAttribute("src", cachedPath);
        } else if (i !== 0) {
            cachedPath = imageArray[i - 1].getAttribute("href");
            console.log(cachedPath)
            lightboxImage.setAttribute("src", cachedPath);
        }
    })

    nextButton.addEventListener("click", () => {
        console.log("next");
        lightboxImage = document.querySelector(".lightbox-container").querySelector("img");
        imageUrl = lightboxImage.getAttribute("src");
        imageUrlCache = imageUrl.substring(1);
        let i = imageArray.findIndex(element => element.pathname === imageUrlCache);

        if (i === imageArray.length - 1) {
            cachedPath = imageArray[0].getAttribute("href");
            console.log(cachedPath)
            lightboxImage.setAttribute("src", cachedPath);
        } else if (i !== imageArray.length) {
            cachedPath = imageArray[i + 1].getAttribute("href");
            console.log(cachedPath)
            lightboxImage.setAttribute("src", cachedPath);
        }


    })
}

//assigne la lightbox au document avec pour donnée l'image sur laquelle on a cliqué
function constructor(url) {
    const element = this.lightboxDOM(url);
    const child = document.querySelector(".scripts");
    document.body.insertBefore(element, child);
    console.log(url);
}

//créer la lightbox
function lightboxDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<button class="lightbox-close">
        <i class="fas fa-times lightbox-exit"></i>
    </button>
    <button class="lightbox-prev">
        <i class="fas fa-chevron-left lightbox-nav"></i>
    </button>
    <button class="lightbox-next">
        <i class="fas fa-chevron-right lightbox-nav"></i>
    </button>
    <div class="lightbox-container">
        <img src="${url}" alt="">
    </div>`;
    return dom;
}



// Récupère les médias et infos du photographe et lance les fonctions pour les afficher
async function initPhotographer() {

    const photographerMedia = await getPhotographers();

    displayMedia(photographerMedia);
    displayProfile(photographerMedia);
    getFixedCounter();
    Lightbox();
}


initPhotographer();


