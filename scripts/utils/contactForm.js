/*global getPhotographers*/
/*eslint no-undef: "error"*/

//affiche la modal
const modal = document.getElementById("contact_modal");
let nameDisplayed = false;
let closeArea = document.getElementsByClassName("modal-close");
let textAreas = document.getElementsByClassName("text-control");
let submitArea = document.getElementsByClassName("submit");

async function launchModal() {
    resetData();
    modal.style.display = "flex"; // affiche le formulaire
    closeArea[0].setAttribute("tabindex","2");  // permet de selectionner au clavier les champs et boutons du formulaire
    textAreas[0].setAttribute("tabindex","1");
    textAreas[1].setAttribute("tabindex","1");
    textAreas[2].setAttribute("tabindex","1");
    textAreas[3].setAttribute("tabindex","1");
    submitArea[0].setAttribute("tabindex","1");
    modal.setAttribute("aria-hidden", "false"); // indique que le formulaire est affiché via la balise aria correspondante
    textAreas[0].focus(); // met en focus le premier champ lors du lancement du formulaire


    document.addEventListener("keydown", function(event) { //ferme la modal si on utilise la touche échap
        if (event.key == "Escape"){
            closeModal();
        }
    })

    document.querySelector(".modal-close").addEventListener("keydown", function(event) { //ferme la modal avec entrer si on a pour focus l'icone le bouton de fermeture
        if (event.key == "Enter"){
            closeModal();
        }
    })

    //vérifie que le nom ne soit pas affiché et l'affiche
    if (nameDisplayed == false) {
    
        const photographerData = await getPhotographers();
        const { name } = photographerData[0];
        const nameField = document.querySelector(".modal-top");
        const nameModal = document.createElement("h2");
        
        nameModal.setAttribute("class", "modal-name");
        nameModal.textContent = name; 
        nameField.appendChild(nameModal);
        nameDisplayed = true;
    }
}

// RegEX pour verifier la validité des champs
const regName = /^[a-zA-Z ]+$/;
const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Messages d'erreurs
const error1 = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
const error2 = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const error3 = "Veuillez entrer une adresse mail valide.";
const error4 = "Veuillez entrer 10 caractères ou plus pour le champ du message.";


let errorState = [false, false, false, false]; // créer une array contenant l'état des erreurs pour chaque champ

const submitButton = document.querySelector(".submit");
const formInput = document.querySelectorAll(".formData input");
const formInputArea = document.querySelector(".formData textarea");
const formData = document.querySelectorAll(".formData");

submitButton.addEventListener("click", validateForm);


// Event pour quand on quitte chaque champ
document.getElementById("first").addEventListener("blur", nameValid);
document.getElementById("last").addEventListener("blur", surnameValid);
document.getElementById("email").addEventListener("blur", emailValid);
document.getElementById("message").addEventListener("blur", messageValid);



function validateForm(x) { // empèche le comportement par défaut du bouton d'envoi et vérifie si les données sont correctes
    x.preventDefault();
    checkFields();
}


function closeModal() {
    modal.style.display = "none"; // ferme le formulaire
    resetData(); // réinitialise les données
    closeArea[0].setAttribute("tabindex","-1"); //empèche la naviguation au clavier des élément du formulaire
    textAreas[0].setAttribute("tabindex","-1");
    textAreas[1].setAttribute("tabindex","-1");
    textAreas[2].setAttribute("tabindex","-1");
    textAreas[3].setAttribute("tabindex","-1");
    submitArea[0].setAttribute("tabindex","-1");
    modal.setAttribute("aria-hidden", "true"); // indique que le formulaire est caché via la balise aria correspondante
}

// Event de validation du formulaire
function checkFields() {

    // On récupère la présence d'une donnée pour chaque champs dans une array
    let inputList = [];
    inputList.push(formInput[0].value.length, formInput[1].value.length, formInput[2].value.length, formInputArea.value.length);

    // On récupère les resultats de chaque champ dans une array
    let validList = [nameValid(), surnameValid(), emailValid(), messageValid()];

    // On vérifie si les champs sont vides et erronés quand on clique sur le bouton d'envoi
    if (inputList.includes(0) || validList.includes(false)) {
        return false;
    }
    else { // quand tout est bon
        modal.style.display = "none"; // ferme le formulaire
        return console.log(formInput[0].value, formInput[1].value, formInput[2].value, formInputArea.value); // affiche le résultat du formulaire dans la console
    }
}

// Validation Prénom
function nameValid() {
    if (formInput[0].value.length > 1 && regName.test(formInput[0].value)) { // si le prénom fait plus de 1 charactère & est correct
        errorReset(formData[0], 0); // reset l'erreur 1
        return true; // la fonction retourne true
    }
    else { // sinon
        errorMessage(error1, formData[0], 0); // affiche le message d'erreur du prénom
        return false; // la fonction retourne false
    }
}

// Validation Nom de famille
function surnameValid() {
    if (formInput[1].value.length > 1 && regName.test(formInput[1].value)) {
        errorReset(formData[1], 1);
        return true;
    }
    else {
        errorMessage(error2, formData[1], 1);
        return false;
    }
}

// Validation email
function emailValid() {
    if (regEmail.test(formInput[2].value)) {
        errorReset(formData[2], 2);
        return true;
    }
    else {
        errorMessage(error3, formData[2], 2);
        return false;
    }
}

// Validation message
function messageValid() {
    if (formInputArea.value !== "") {
        errorReset(formData[3], 3);
        return true;
    }
    else {
        errorMessage(error4, formData[3], 3);
        return false;
    }
}

// Génération du message d'erreur
function errorMessage(errorText, formNumber, errorNumber) {

    var newDiv = document.createElement("div"); // Créé une variable contenant une création d'une div
    var newContent = document.createTextNode(errorText); // Créé une variable contenant une du texte reprenant la valeur spécifié

    if (errorState[errorNumber] == false) { // Si l'erreur avec le numéro spécifié n'est pas affiché
        newDiv.appendChild(newContent); // Assigne le texte à la div
        newDiv.setAttribute('class', 'data-error') // Donne la classe data-error à la div

        formNumber.parentNode.insertBefore(newDiv, formNumber.nextSibling); // Insère la div après l'input spécifié

        errorState[errorNumber] = true; // L'erreur est définie comme affichée
    }

}

// Détruit l'erreur affichée
function errorReset(formNumber, errorNumber) {

    if (errorState[errorNumber] == true) { // Si l'erreur est définie comme affichée
        formNumber.parentNode.removeChild(formNumber.nextSibling); // Enlève la div après l'input spécifié
        errorState[errorNumber] = false; // L'erreur est définie comme cachée
    }

}

// Reset les données du formulaire
function resetData() {
    document.getElementById("myForm").reset();
    errorReset(formData[0], 0);
    errorReset(formData[1], 1);
    errorReset(formData[2], 2);
    errorReset(formData[3], 3);
}
