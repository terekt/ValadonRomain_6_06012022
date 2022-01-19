// On récupère l'id du photographe dans l'url de la page et on le convertie en valeur décimale 
const url = new URL(window.document.location.href).searchParams.get('id');
const urlId = parseInt(url, 10);
console.log(urlId);

async function getPhotographers() {
    let url = '../../data/photographers.json';
    try {
        let res = await fetch(url)
        let json = await res.json();
        return json;
    }
    catch (error){
        console.log(error);
    } 
}

async function displayProfile() {
    const photographerData = await getPhotographers();

    photographerData.forEach(async (element) => {
        if (element.id === urlId) {
            const ProfileData = new Profile(
                element.name,
                element.city,
                element.country,
                element.tagline,
                element.portrait
              );
            const profile = document.createElement( 'div' );
            profile.setAttribute('class', 'profile');
            const infoProfile = document.createElement('div');
            infoProfile.setAttribute('class', 'infoProfile');
            const imageProfile = document.createElement('div');
            imageProfile.setAttribute('class', 'imageProfile');
            const img = document.createElement( 'img' );
            img.setAttribute("src", ProfileData.portrait);
            const h2 = document.createElement( 'h2' );
            h2.textContent = ProfileData.name;
            const h3 = document.createElement( 'h3' );
            h3.textContent = ProfileData.city+", "+ProfileData.country;
            const h4 = document.createElement( 'h4' );
            h4.textContent = ProfileData.tagline;
            profile.appendChild(infoProfile);
            profile.appendChild(imageProfile);
            infoProfile.appendChild(h2);
            infoProfile.appendChild(h3);
            infoProfile.appendChild(h4);
            imageProfile.appendChild(img);
        }
    })
};


displayProfile();
