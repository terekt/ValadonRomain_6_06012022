const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

var optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
    openSort(optionsContainer, selected, optionsList);
});

selected.addEventListener("keydown", function(event) {
    if (event.key == "Enter"){
        openSort(optionsContainer, selected, optionsList);
    }
})

optionsList.forEach(o => {
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
    
  optionsContainer.classList.toggle("active");
  selected.classList.toggle("clicked");
  optionsList[0].setAttribute("tabindex","0");
  optionsList[1].setAttribute("tabindex","0");
  optionsList[2].setAttribute("tabindex","0");
}

function closeSort(optionsContainer, selected, optionsList, o) {
    
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
    selected.classList.remove("clicked");
    optionsList[0].setAttribute("tabindex","");
    optionsList[1].setAttribute("tabindex","");
    optionsList[2].setAttribute("tabindex","");
  }