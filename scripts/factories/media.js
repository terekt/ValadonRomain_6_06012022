function test2(data) {


    const { id, photographerId, video, title, image, likes, date, price, alt } = data;
    const picture = `./assets/photographers/${photographerId}/${image}`;
    const videoItem = `./assets/photographers/${photographerId}/${video}`;

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

        return media

    }


    return getMediaCardDOM;
}
