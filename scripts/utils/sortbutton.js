const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

var optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
  selected.classList.toggle("clicked"); 
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
    selected.classList.remove("clicked");
  });
});


