// On récupère l'id du photographe dans l'url de la page et on le convertie en valeur décimale 
async function photographerID() {
    const url = new URL(window.document.location.href).searchParams.get('id');
    //const urlId = parseInt(url, 10);
    return (url);
}

async function getPhotographers() {
    let url = '../../data/photographers.json';
    try {
        let res = await fetch(url)
        let json = await res.json();
        const photographerId = await photographerID();
        const photographerData = json.photographers.find(photographer => photographer.id == photographerId);
        const photographerMedia = json.media.filter(data => data.photographerId == photographerId);
        console.log(photographerData);
        return [photographerData, photographerMedia];
    }
    catch (error) {
        console.log(error);
    }
}

async function displayProfile() {

    const photographerData = await getPhotographers(0);
    const photographerId = await photographerID();
    console.log('id = ' + photographerId);
    console.log (photographerData);
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


displayProfile();
