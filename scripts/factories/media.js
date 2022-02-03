//Factory qui traite l'affichage des médias d'un photographe
function mediaFactory(data) {
    const { id, photographerId, video, title, image, likes, date, price, alt } = data;
    const media = `./assets/photographers/${photographerId}/${image}`;

    function MediaDOM() {
        const mediaList = document.createElement("div");
        mediaList.setAttribute("class","media_card");

        let card = "";
        card += `<a href="${media}" data-mediaid="${id}" class="medias">`;

        if (image !== undefined) {
            card += `<img src="${media}" alt="${alt}">`;
        } else if (video !== undefined) {
            card += `
            <video>
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