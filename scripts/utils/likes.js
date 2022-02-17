
//Affiche le prix et les likes en bas de l'écran
async function getFixedCounter() {

    const photographerMedia = await getPhotographers();
    const price = photographerMedia[0].price;
    let likes = photographerMedia[1].map(a => a.likes);

    const TotalLikes = likes.reduce((partialSum, a) => partialSum + a, 0);
    const fixedCounter = document.querySelector('.fixed-counter');
    const hourlyRate = document.createElement('p');

    hourlyRate.innerHTML = `<span class="total-likes">${TotalLikes}</span> <i class="fas fa-heart total-heart"></i> <span class="daily-rate">${price}€ / jour</span>`;
    fixedCounter.appendChild(hourlyRate);

    manageLikes(hourlyRate);
}

//incrémente les likes au clic sur les coeurs
async function manageLikes(totallikes) {
    await getPhotographers();
    const like = document.querySelectorAll(".like_img");
    const totallike = totallikes.querySelector(".total-likes");

    for (const clickHeart of like) {
        clickHeart.addEventListener("click", () => {
            likeUpdate(clickHeart, totallike)
        });
        clickHeart.addEventListener("keydown", function(event) {
            if (event.key == "Enter"){
                likeUpdate(clickHeart, totallike)
            }
        })  
    }
}

function likeUpdate(clickHeart, totallike) {
    //récupère le nombre de like
    let siblingClick = clickHeart.parentNode.previousElementSibling;
    //créé une variable pour définir l'état de chaque boutton like
    let state = clickHeart.getAttribute('data-state') || 0;

    if (state == 0) {
        siblingClick.innerHTML = parseInt(siblingClick.innerHTML) + 1;
        totallike.innerHTML++;
        clickHeart.setAttribute('data-state', 1);
    } else {
        siblingClick.innerHTML = parseInt(siblingClick.innerHTML) - 1;
        totallike.innerHTML--;
        clickHeart.setAttribute('data-state', 0);
    }
}