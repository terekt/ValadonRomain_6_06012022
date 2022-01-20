function mediaFactory(data, photographerId) {

    const Id = photographerId;

    const { id, title, image, video, likes, date, price } = data;
    const picture = `assets/photographers/${Id}/${image}`;
    const videoItem = `assets/photographers/${Id}/${video}`;

    function getMediaCardDOM() {
        var media = undefined;

        if (image != undefined) {
            media = document.createElement('img');
            media.setAttribute("src", picture);
            media.setAttribute("alt", title);
            media.setAttribute("loading", "lazy");
        } else if (videoItem != undefined) {
            media = document.createElement('video');
            media.setAttribute("src", videoItem);
            media.setAttribute("title", title);
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
