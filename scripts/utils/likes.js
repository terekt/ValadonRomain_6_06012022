
// Affiche le prix et les likes en bas de l'écran
async function getFixedCounter() {

    const photographerMedia = await getPhotographers();
    const price = photographerMedia[0].price; // récupère le prix du photographe en question
    let likes = photographerMedia[1].map(a => a.likes); // récupère les likes du photographe dans un tableau

    const TotalLikes = likes.reduce((partialSum, a) => partialSum + a, 0); // fait la somme de tous les likes
    const fixedCounter = document.querySelector('.fixed-counter');
    const hourlyRate = document.createElement('p');

    // ajoute l'élément dans le html avec le nombre de like et le prix du photographe
    hourlyRate.innerHTML = `<span class="total-likes">${TotalLikes}</span> <i class="fas fa-heart total-heart"></i> <span class="daily-rate">${price}€ / jour</span>`;
    fixedCounter.appendChild(hourlyRate);

    manageLikes(hourlyRate); // envoie l'élément de bas de page en tant qu'argument dans la fonction qui gère le changement des likes au click
}

// incrémente les likes au clic sur les coeurs
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
    
    let siblingClick = clickHeart.parentNode.previousElementSibling; // récupère le nombre de like
    let state = clickHeart.getAttribute('data-state') || 0; // créé une variable pour définir l'état de chaque boutton like

    if (state == 0) { // si le bouton n'a pas été cliqué, alors on ajoute +1 au nombre contenu dans le html
        siblingClick.innerHTML = parseInt(siblingClick.innerHTML) + 1;
        totallike.innerHTML++;
        clickHeart.setAttribute('data-state', 1);
    } else { // à l'inverse, on retire 1 au nombre contenu dans le html
        siblingClick.innerHTML = parseInt(siblingClick.innerHTML) - 1;
        totallike.innerHTML--;
        clickHeart.setAttribute('data-state', 0);
    }
}