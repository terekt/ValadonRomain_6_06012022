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
    links = document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')


    //écoute quand on clique sur l'une d'entre elles et récupère les éléments créés
    links.forEach(link => link.addEventListener('click', e => {
        e.preventDefault()
        constructor(e.currentTarget.getAttribute('href'), e.currentTarget)
        closeButton = document.querySelector(".lightbox-close");
        prevButton = document.querySelector(".lightbox-prev");
        nextButton = document.querySelector(".lightbox-next");
        lightbox = document.querySelector(".lightbox");
        naviguation(e.currentTarget);
    }))
}

//permet de fermer la lightbox et passer d'un média à un autre
function naviguation(media) {
    var mediaType = media.getAttribute("href").slice(media.getAttribute("href").length - 4); //récupère les 4 dernièrs caractères de l'url du média
    let mediaArray = Array.from(links); //converti la nodelist en array
    let cachedPath = "";

    //ferme la lightbox
    closeButton.addEventListener("click", () => {
        lightbox.style.display = "none";
        lightbox.remove();
    })

    prevButton.addEventListener("click", () => {
        let i = "";
        let mediaLightbox = "";
        let mediaContainer = document.querySelector(".lightbox-container");
        let mediaUrl = "";
        let mediaCache = "";

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
        if (i === 0) {
            cachedPath = mediaArray[mediaArray.length - 1].getAttribute("href"); //obtiens l'url du média précédent dans la liste
            mediaType = cachedPath.slice(cachedPath.length - 4); //récupère les 4 dernièrs caractères de l'url

            if (mediaType === ".jpg") {  //si l'url fini par .jpg alors créer une image
                mediaContainer.innerHTML = `
                    <img src="${cachedPath}" alt="">`;
            }
            else if (mediaType === ".mp4") {  //si l'url fini par .mp4 alors créer une vidéo
                mediaContainer.innerHTML = `<video controls>
                    <source src="${cachedPath}" type="video/mp4">
                    </video>`;
            }

            mediaLightbox.remove();
        }

        //sinon renvois juste au précédent
        else if (i !== 0) {
            cachedPath = mediaArray[i - 1].getAttribute("href");
            mediaType = cachedPath.slice(cachedPath.length - 4);
            if (mediaType === ".jpg") {
                mediaContainer.innerHTML = `
                    <img src="${cachedPath}" alt="">`;
            }
            else if (mediaType === ".mp4") {
                mediaContainer.innerHTML = `<video controls>
                    <source src="${cachedPath}" type="video/mp4">
                    </video>`;
            }

            mediaLightbox.remove();
        }
    })

    nextButton.addEventListener("click", () => {
        let i = "";
        let mediaLightbox = "";
        let mediaContainer = document.querySelector(".lightbox-container");
        let mediaUrl = "";
        let mediaCache = "";

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


        if (i === mediaArray.length - 1) {
            cachedPath = mediaArray[0].getAttribute("href"); //obtiens l'url du média précédent dans la liste
            mediaType = cachedPath.slice(cachedPath.length - 4); //récupère les 4 dernièrs caractères de l'url

            if (mediaType === ".jpg") {  //si l'url fini par .jpg alors créer une image
                mediaContainer.innerHTML = `
                    <img src="${cachedPath}" alt="">`;
            }
            else if (mediaType === ".mp4") {  //si l'url fini par .mp4 alors créer une vidéo
                mediaContainer.innerHTML = `<video controls>
                    <source src="${cachedPath}" type="video/mp4">
                    </video>`;
            }

            mediaLightbox.remove();

        } else if (i !== mediaArray.length) {

            cachedPath = mediaArray[i + 1].getAttribute("href");
            mediaType = cachedPath.slice(cachedPath.length - 4); //récupère les 4 dernièrs caractères de l'url

            if (mediaType === ".jpg") {
                mediaContainer.innerHTML = `
                    <img src="${cachedPath}" alt="">`;
            }
            else if (mediaType === ".mp4") {
                mediaContainer.innerHTML = `<video controls>
                    <source src="${cachedPath}" type="video/mp4">
                    </video>`;
            }

            mediaLightbox.remove();

        }
    })
}

//assigne la lightbox au document avec pour donnée l'image sur laquelle on a cliqué
function constructor(url, media) {
    const element = this.lightboxDOM(url, media);
    const child = document.querySelector(".scripts");
    document.body.insertBefore(element, child);
}

//créer la lightbox
function lightboxDOM(url, media) {
    const mediaType = media.getAttribute("href").slice(media.getAttribute("href").length - 4);
    const dom = document.createElement("div");
    dom.classList.add("lightbox");

    if (mediaType === ".jpg") {
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
    }

    else if (mediaType === ".mp4") {
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