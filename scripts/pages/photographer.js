/*global mediaFactory, getPhotographers, getFixedCounter, LightboxCreate*/
/*eslint no-undef: "error"*/

let optionSelected = document.querySelector(".selected").textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();

// Affiches les infos du photographe
async function displayProfile(photographerData) {


    const picture = './assets/photographers/Profils/' + photographerData[0].portrait;
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

    profileSection.appendChild(infoProfile);
    infoProfile.appendChild(h1);
    infoProfile.appendChild(h2);
    infoProfile.appendChild(accroche);
    profileSection.appendChild(infoProfile.previousElementSibling);
    profileSection.appendChild(img);

}

function sortupdate(mediaFilter, mediaSection, mediasphotographer){
    
            //met à jour l'option selectionnée
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
}

// Affiches les médias du photographe
async function displayMedia(photographerMedia) {

    const mediaSection = document.querySelector(".media");
    var mediaFilter = null;
    var optionsList = document.querySelectorAll(".option");
    var selected = document.querySelector(".selected")
    const mediasphotographer = photographerMedia[1];

    //filtre popularité par défaut
    mediaFilter = mediasphotographer.sort((a, b) => {
        return a.likes - b.likes;
    });

    //écoute quand on clique sur le bouton de filtre
    optionsList.forEach(o => {
        o.addEventListener("click", () => {
            sortupdate(mediaFilter, mediaSection, mediasphotographer);
        });
        o.addEventListener("keydown", function(event) {
            if (event.key == "Enter"){
                sortupdate(mediaFilter, mediaSection, mediasphotographer);
                selected.focus();
            }
        })    
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
    LightboxCreate();
}


initPhotographer();