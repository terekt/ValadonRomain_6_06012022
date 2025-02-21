let cachedPath = "";
let mediaUrl = "";
let mediaCache = "";
let imageAlt = "";
let i = "";
let mediaLightbox = "";
let mediaType = "";
let links = "";
let lightbox = document.querySelector(".lightbox");
let closeButton = document.querySelector(".lightbox-close");
let prevButton = document.querySelector(".lightbox-prev");
let nextButton = document.querySelector(".lightbox-next");

// récupère les images dans la page et écoute quand on clique sur l'une d'entre elles
function LightboxCreate() {

    // récupère les médias dans la page
    links = document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')


    // écoute quand on clique sur l'un d'entre eux
    links.forEach(link => link.addEventListener('click', e => {
        e.preventDefault()
        if (e.currentTarget.getAttribute("class") == "medias media-video") { // vérifie si le média est une vidéo
            constructor(e.currentTarget.getAttribute('href'), e.currentTarget.getAttribute('href'), e.currentTarget);
        }
        else if (e.currentTarget.getAttribute("class") == "medias media-image") { // vérifie si le média est une image
            constructor(e.currentTarget.getAttribute('href'), e.currentTarget.querySelector("img").getAttribute('alt'), e.currentTarget);
        }
        closeButton = document.querySelector(".lightbox-close");
        prevButton = document.querySelector(".lightbox-prev");
        nextButton = document.querySelector(".lightbox-next");
        lightbox = document.querySelector(".lightbox");
        naviguation(e.currentTarget);
    }))
}

// assigne la lightbox au document avec pour donnée le média sur lequelle on a cliqué
function constructor(url, alt, media) {
    const element = this.lightboxDOM(url, alt, media);
    const child = document.querySelector(".scripts");
    document.body.insertBefore(element, child);
}


//créer la lightbox
function lightboxDOM(url, alt, media) {
    const mediaType = media.getAttribute("href").slice(media.getAttribute("href").length - 4);
    const dom = document.createElement("div");
    dom.classList.add("lightbox");

    if (mediaType === ".jpg") { // vérifie si le média est une image pour créer la lightbox correspondante
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
        <img src="${url}" alt="${alt}">
    </div>`;
    }

    else if (mediaType === ".mp4") { // vérifie si le média est une vidéo pour créer la lightbox correspondante
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
        <video controls>
            <source src="${url}" type="video/mp4">
        </video>
        </div>`;
    }

    return dom;
}

// permet de fermer la lightbox et passer d'un média à un autre
function naviguation(media) {
    mediaType = media.getAttribute("href").slice(media.getAttribute("href").length - 4); // récupère les 4 dernièrs caractères de l'url du média
    let mediaArray = Array.from(links); // converti la nodelist en array

    closeButton.addEventListener("click", () => { close(); });
    prevButton.addEventListener("click", () => { prev(mediaType, mediaArray, media); });
    nextButton.addEventListener("click", () => { next(mediaType, mediaArray, media); });
    document.addEventListener("keydown", function(event) { // écoute les touches du clavier pour naviguer dans la lightbox
        if (event.key == "Escape"){
            close();
        }
        else if (event.key == "ArrowLeft"){
            prev(mediaType, mediaArray);
        }
        else if (event.key == "ArrowRight"){
            next(mediaType, mediaArray);
        }
    })
}

function close() { //ferme la lightbox

    lightbox.style.display = "none";
    lightbox.remove();

}

function prev(mediaType, mediaArray) { // affiche le média précédent
    let mediaContainer = document.querySelector(".lightbox-container");
    mediaType = document.querySelector(".lightbox-container").querySelectorAll('source[src$=".mp4"],img[src$=".jpg"]');
    mediaType = mediaType[0].getAttribute("src");
    mediaType = mediaType.slice(mediaType.length - 4);

    if (mediaType === ".mp4") { //si l'url du média fini par .mp4 alors on récupère l'url via l'objet html correspondant et on attribu son url à mediaUrl
        let lightboxVideo = mediaContainer.querySelector("video").querySelector("source");
        mediaLightbox = mediaContainer.querySelector("video");
        mediaUrl = lightboxVideo.getAttribute("src");
        mediaCache = mediaUrl.substring(1);
    }

    if (mediaType === ".jpg") {
        let lightboxImage = mediaContainer.querySelector("img");
        mediaLightbox = lightboxImage;
        mediaUrl = lightboxImage.getAttribute("src");
        mediaCache = mediaUrl.substring(1);
    }

    //cherche l'url dans la liste des média et retourne son id
    i = mediaArray.findIndex(element => element.pathname === mediaCache);

    //si on est sur le premier média, renvois au dernier
    if (i === 0) { // gère le cas ou on est au premier média dans la liste
        cachedPath = mediaArray[mediaArray.length - 1].getAttribute("href"); //obtiens l'url du média précédent dans la liste
        mediaType = cachedPath.slice(cachedPath.length - 4); //récupère les 4 dernièrs caractères de l'url

        if (mediaType === ".jpg") {  //si l'url fini par .jpg alors créer une image
            imageAlt = mediaArray[mediaArray.length - 1].querySelector("img").getAttribute("alt"); //obtiens l'attribut alt du média précédent dans la liste
            mediaContainer.innerHTML = `
                    <img src="${cachedPath}" alt="${imageAlt}">`;
        }
        else if (mediaType === ".mp4") {  //si l'url fini par .mp4 alors créer une vidéo
            mediaContainer.innerHTML = `<video controls>
                    <source src="${cachedPath}" type="video/mp4">
                    </video>`;
        }

        mediaLightbox.remove();
    }

    //sinon renvois juste au précédent
    else if (i !== 0) { // gère le cas normal
        cachedPath = mediaArray[i - 1].getAttribute("href");
        mediaType = cachedPath.slice(cachedPath.length - 4);
        if (mediaType === ".jpg") {
            imageAlt = mediaArray[i - 1].querySelector("img").getAttribute("alt");
            mediaContainer.innerHTML = `
                    <img src="${cachedPath}" alt="${imageAlt}">`;
        }
        else if (mediaType === ".mp4") {
            mediaContainer.innerHTML = `<video controls>
                    <source src="${cachedPath}" type="video/mp4">
                    </video>`;
        }

        mediaLightbox.remove();
    }
}

function next(mediaType, mediaArray) { // affiche le média suivant
    let mediaContainer = document.querySelector(".lightbox-container");
    mediaType = document.querySelector(".lightbox-container").querySelectorAll('source[src$=".mp4"],img[src$=".jpg"]');
    mediaType = mediaType[0].getAttribute("src");
    mediaType = mediaType.slice(mediaType.length - 4);

    if (mediaType === ".mp4") { //si l'url du média fini par .mp4 alors on récupère l'url via l'objet html correspondant et on attribu son url à mediaUrl
        let lightboxVideo = mediaContainer.querySelector("video").querySelector("source");
        mediaLightbox = mediaContainer.querySelector("video");
        mediaUrl = lightboxVideo.getAttribute("src");
        mediaCache = mediaUrl.substring(1);
    }

    if (mediaType === ".jpg") {
        let lightboxImage = mediaContainer.querySelector("img");
        mediaLightbox = lightboxImage;
        mediaUrl = lightboxImage.getAttribute("src");
        mediaCache = mediaUrl.substring(1);
    }

    // cherche l'url dans la liste des média et retourne son id
    i = mediaArray.findIndex(element => element.pathname === mediaCache);


    if (i === mediaArray.length - 1) { // gère le cas ou on est au dernier média dans la liste
        cachedPath = mediaArray[0].getAttribute("href"); //obtiens l'url du média précédent dans la liste
        mediaType = cachedPath.slice(cachedPath.length - 4); //récupère les 4 dernièrs caractères de l'url

        if (mediaType === ".jpg") {  //si l'url fini par .jpg alors créer une image
            imageAlt = mediaArray[0].querySelector("img").getAttribute("alt");
            mediaContainer.innerHTML = `
                    <img src="${cachedPath}" alt="${imageAlt}">`;
        }
        else if (mediaType === ".mp4") {  //si l'url fini par .mp4 alors créer une vidéo
            mediaContainer.innerHTML = `<video controls>
                    <source src="${cachedPath}" type="video/mp4">
                    </video>`;
        }

        mediaLightbox.remove();

    } else if (i !== mediaArray.length) { // gère le cas normal

        cachedPath = mediaArray[i + 1].getAttribute("href");
        mediaType = cachedPath.slice(cachedPath.length - 4); //récupère les 4 dernièrs caractères de l'url

        if (mediaType === ".jpg") {
            imageAlt = mediaArray[i + 1].querySelector("img").getAttribute("alt");
            mediaContainer.innerHTML = `
                    <img src="${cachedPath}" alt="${imageAlt}">`;
        }
        else if (mediaType === ".mp4") {
            mediaContainer.innerHTML = `<video controls>
                    <source src="${cachedPath}" type="video/mp4">
                    </video>`;
        }

        mediaLightbox.remove();

    }
}