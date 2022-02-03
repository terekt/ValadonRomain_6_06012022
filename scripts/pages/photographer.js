var lightboxCreated = 0;
//var lightboxCreated_cached = lightboxCreated;

// Affiches les infos du photographe
async function displayProfile() {

    const photographerData = await getPhotographers();

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
    console.log(totallike);

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
async function displayMedia() {

    const photographerMedia = await getPhotographers();
    const mediaSection = document.querySelector(".media");

    mediaSection.innerHTML = "";
    photographerMedia[1].forEach((media) => {
        const MediaModel = mediaFactory(media);
        const MediaDOM = MediaModel.MediaDOM();
        mediaSection.appendChild(MediaDOM);
    });
}

//vient chercher les images et empèche la redirection vers l'image et renvois vers la lightbox
/*async function Lightbox() {
    const photographerMedia = await getPhotographers();
    const links = document.querySelectorAll('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]')
        .forEach(link => link.addEventListener('click', e => {
            e.preventDefault()
            constructor(e.currentTarget.getAttribute('href'))
        }))

    if (lightboxCreated == 1) {
        const close = document.querySelector(".lightbox-close");
        const prev = document.querySelector(".lightbox-prev");
        const next = document.querySelector(".lightbox-next");
        const lightbox = document.querySelector(".lightbox");
        console.log(close, prev, next);
        close.addEventListener("click", () => {
            lightbox.getElementsByClassName.display = "none";
            lightboxCreated = 0;
        })
    }
}

//assigne la lightbox au document avec pour donnée l'image sur laquelle on a cliqué
function constructor(url) {
    const element = this.lightboxDOM(url);
    const child = document.querySelector("scripts");
    document.body.insertBefore(element, child);
    lightboxCreated = 1;
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

//permet de fermer la lightbox et passer d'un média à un autre
function naviguation() {
    if (lightboxCreated == 1) {
        const close = document.querySelector(".lightbox-close");
        const prev = document.querySelector(".lightbox-prev");
        const next = document.querySelector(".lightbox-next");
        const lightbox = document.querySelector(".lightbox");
        console.log(close, prev, next);
        close.addEventListener("click", () => {
            lightbox.getElementsByClassName.display = "none";
            lightboxCreated = 0;
        })
    }
}*/

// Récupère les médias et infos du photographe et lance les fonctions pour les afficher
async function initPhotographer() {

    displayMedia();
    displayProfile();
    getFixedCounter();
    //Lightbox();
    //naviguation();
}


initPhotographer();


