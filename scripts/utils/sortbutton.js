const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
var optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => { // au click de la souris lance la fonction qui gère le comportement du bouton de tri
    openSort(optionsContainer, selected, optionsList);
});

selected.addEventListener("keydown", function(event) { // pareil mais via la touche entrer du clavier
    if (event.key == "Enter"){
        openSort(optionsContainer, selected, optionsList);
    }
})

optionsList.forEach(o => { // gère l'interaction avec une option dans la liste
  o.addEventListener("click", () => {
    closeSort(optionsContainer, selected, optionsList, o);
  });

  o.addEventListener("keydown", function(event) {
    if (event.key == "Enter"){
        closeSort(optionsContainer, selected, optionsList, o);
    }
})
});

function openSort(optionsContainer, selected, optionsList) { 
    
  optionsContainer.classList.toggle("active"); // attribue une classe à un élément du bouton de tri
  selected.classList.toggle("clicked");
  optionsList[0].setAttribute("tabindex","0"); // rend les options du bouton de tri naviguable au clavier quand le bouton est actif
  optionsList[1].setAttribute("tabindex","0");
  optionsList[2].setAttribute("tabindex","0");
}

function closeSort(optionsContainer, selected, optionsList, o) {
    
    selected.innerHTML = o.querySelector("label").innerHTML; // change le label du bouton par l'option choisit 
    optionsContainer.classList.remove("active");
    selected.classList.remove("clicked");
    optionsList[0].setAttribute("tabindex","-1"); // empèche les options du bouton de tri naviguable au clavier une fois l'option choisit
    optionsList[1].setAttribute("tabindex","-1");
    optionsList[2].setAttribute("tabindex","-1");
  }