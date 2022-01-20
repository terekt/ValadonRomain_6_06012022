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

async function displayMedia(data) {

    const photographerId = await photographerID();
    const mediaSection = document.querySelector(".media");
    const mediaData = data.filter( media => media.photographerId == getPhotographerId() )

    mediaData.foreach((media) => {
        const mediaModel = mediaFactory(media, photographerId);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
    });
    
}

async function initPhotographer() {

    const photographerData = await getPhotographers(0);
    const photographerMedia = await getPhotographers(1);

    displayMedia(photographerMedia);
    displayProfile(photographerData);

}


initPhotographer();


