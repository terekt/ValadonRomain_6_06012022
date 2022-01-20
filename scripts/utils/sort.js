function sortMedia() {

    const header = document.querySelector("#main");
    const sort = document.createElement("div")
    const button = document.createElement("button");
    const icon = document.createElement("i");
    const option1 = document.createElement("span");
    const option2 = document.createElement("span");
    const option3 = document.createElement("span");

    console.log(header);


    sort.setAttribute("class", "sort");
    sort.textContent = "Trier par";
    button.setAttribute("id", "sortingMenu");
    icon.setAttribute("id", "openMenuButton");
    icon.setAttribute("class", "fas fa-chevron-up openMenuButton");
    option1.setAttribute("id", "option1");
    option1.setAttribute("class", "option selected");
    option1.textContent = "Nom";
    option2.setAttribute("id", "option2");
    option2.setAttribute("class", "option");
    option2.textContent = "Date";
    option3.setAttribute("id", "option3");
    option3.setAttribute("class", "option last");
    option3.textContent = "Popularité";

    header.appendChild(sort);
    sort.appendChild(button);
    button.appendChild(icon);
    button.appendChild(option1);
    button.appendChild(option2);
    button.appendChild(option3);

}

sortMedia();



