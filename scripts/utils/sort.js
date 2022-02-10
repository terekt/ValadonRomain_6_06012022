function sortMedia() {

    const header = document.querySelector("#main");
    const sortMedia = document.createElement("div");
    const label = document.createElement("label");
    const button = document.createElement("select");
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    const option3 = document.createElement("option");
    const icon = document.createElement("i");


    sortMedia.setAttribute("class", "sort-medias")
    label.setAttribute("class", "sort");
    label.textContent = "Trier par";
    button.setAttribute("id", "sortingMenu");
    button.setAttribute("aria-label", "trié par popularité")
    icon.setAttribute("id", "openMenuButton");
    icon.setAttribute("class", "fas fa-chevron-down arrow-down");
    option1.setAttribute("value", "popularity");
    option1.textContent = "Popularité";
    option2.setAttribute("value", "date");
    option2.textContent = "Date";
    option3.setAttribute("value", "title");
    option3.textContent = "Titre";

    header.appendChild(sortMedia);
    sortMedia.appendChild(label);
    sortMedia.appendChild(button);
    sortMedia.appendChild(icon);
    button.appendChild(option1);
    button.appendChild(option2);
    button.appendChild(option3);

    const sortByType = document.getElementById("sortingMenu");

      //change orientation arrow buttom sort by popularity/date/title
      sortByType.addEventListener("click", () => {
        const arrowUpDown = document.querySelector(".arrow-down");
        arrowUpDown.classList.toggle("rotated");
      });
}

sortMedia();



