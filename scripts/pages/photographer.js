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

// Récupère les médias et infos du photographe et lance les fonctions pour les afficher
async function initPhotographer() {

    displayMedia();
    displayProfile();

}

//Factory qui traite l'affichage des médias d'un photographe
function mediaFactory(data) {
    const { id, photographerId, video, title, image, likes, date, price, alt } = data;
    const media = `./assets/photographers/${photographerId}/${image}`;

    function MediaDOM() {
        const mediaList = document.createElement("div");
        mediaList.setAttribute("class","media_card");

        let card = "";
        card += `<a href="#" data-mediaid="${id}" role="button">`;

        if (image !== undefined) {
            card += `<img src="${media}" alt="${alt}">`;
        } else if (video !== undefined) {
            card += `<video>
                <source src="./assets/photographers/${photographerId}/${video}" type="video/mp4">
            </video>`;            
        }

        card += `
            </a>
            <div class="media_info">
                <div>
                    <h3>${title}</h3>
                </div>
                <div class="media_likes">
                    <h3>${likes}</h3>
                    <button>
                        <i class="fas fa-heart like" role="button"></i>
                    </button>
                </div>
            </div>`;

        mediaList.innerHTML = card;

        return mediaList;
    }
    return {
        id,
        photographerId,
        video,
        title,
        image,
        likes,
        date,
        price,
        alt,
        MediaDOM,
    };
}

initPhotographer();


