/*function profileFactory(data) {
    const { name, city, country, tagline, portrait } = data;

    const picture = `assets/photographers/profils/${portrait}`;

    function getUserCardDOMProfile() {
        const profile = document.createElement( 'div' );
        profile.setAttribute('class', 'profile');
        const infoProfile = document.createElement('div');
        infoProfile.setAttribute('class', 'infoProfile');
        const imageProfile = document.createElement('div');
        imageProfile.setAttribute('class', 'imageProfile');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = city+", "+country;
        const h4 = document.createElement( 'h4' );
        h4.textContent = tagline;
        profile.appendChild(infoProfile);
        profile.appendChild(imageProfile);
        infoProfile.appendChild(h2);
        infoProfile.appendChild(h3);
        infoProfile.appendChild(h4);
        imageProfile.appendChild(img);
        return (profile);
    }
    return { name, picture, getUserCardDOMProfile }
}*/