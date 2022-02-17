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
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const accroche = document.createElement('p');
    const img = document.createElement('img');

    infoProfile.setAttribute('class', 'infoProfile');
    h1.textContent = photographerData[0].name;
    h2.textContent = photographerData[0].city + ", " + photographerData[0].country;
    accroche.textContent = photographerData[0].tagline;
    img.setAttribute("src", picture);
    img.setAttribute("alt", photographerData[0].name);

    profileSection.appendChild(infoProfile)
    infoProfile.appendChild(h1);
    infoProfile.appendChild(h2);
    infoProfile.appendChild(accroche);
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

var optionSelected = document.querySelector(".selected").textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();


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
    optionsList.forEach(o => {
        o.addEventListener("click", () => {

            //met à jour l'option selectionnée
            optionsList = document.querySelectorAll(".option");
            optionSelected = document.querySelector(".selected").textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

            //filtre popularité
            if (optionSelected == "Popularité") {
                console.log("option du filtre : " + optionSelected);
                mediaFilter = mediasphotographer.sort((a, b) => {
                    return a.likes - b.likes;
                });
            }

            //filtre titre
            if (optionSelected == "Titre") {
                console.log("option du filtre : " + optionSelected);
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
            if (optionSelected == "Date") {
                console.log("option du filtre : " + optionSelected);
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
    });



    //affichage des médias via l'option de tri par défaut
    mediaSection.innerHTML = "";
    mediaFilter.forEach((media) => {
        const MediaModel = mediaFactory(media);
        const MediaDOM = MediaModel.MediaDOM();
        mediaSection.appendChild(MediaDOM);
    });

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