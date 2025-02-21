//Factory qui traite l'affichage des médias d'un photographe
function mediaFactory(data) {
    const { id, photographerId, video, title, image, likes, date, price, alt } = data;

    function MediaDOM() {
        const mediaList = document.createElement("div");
        mediaList.setAttribute("class","media_card");

        let card = "";

        if (image !== undefined) {
            
            card += `<a href="./assets/photographers/${photographerId}/${image}" data-mediaid="${id}" class="medias media-image">
            <img src="./assets/photographers/${photographerId}/${image}" alt="${title}">`;
        } else if (video !== undefined) {
            card += `<a href="./assets/photographers/${photographerId}/${video}" data-mediaid="${id}" class="medias media-video">
            <i class="fas fa-solid fa-play play"></i>
            <video alt="${title}">
                <source src="./assets/photographers/${photographerId}/${video}" alt="${title}" type="video/mp4">
            </video>`;   
        }

        card += `
            </a>
            <div class="media_info">
                <div>
                    <h3>${title}</h3>
                </div>
                <div class="media_likes">
                    <p>${likes}</p>
                    <button class="like" aria-label="like">
                        <i class="fas fa-heart like_img"></i>
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