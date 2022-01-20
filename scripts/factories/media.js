function mediaFactory(data, photographerId) {

    const Id = photographerId;

    const { title, image, video, id, likes, date, price } = data;
    const picture = `assets/photographers/${Id}/${image}`;
    const video = `assets/photographers/${Id}/${video}`;

    function getMediaCardDOM() {
        var media = undefined;

        if (image != undefined) {
            media = document.createElement('img');
            media.src = picture;
            media.alt = title;
            media.setAttribute("loading", "lazy");
        } else if (video != undefined) {
            media = document.createElement('video');
            media.src = video;
            media.title = title;
            media.setAttribute("preload", "metadata");
        }

        media.setAttribute("onclick", "lightbox(event)");
        media.setAttribute("tabindex", 0);
        media.dataset.date = date;
        media.className = 'img_cover';

        return media

    }


    return getMediaCardDOM;
}
