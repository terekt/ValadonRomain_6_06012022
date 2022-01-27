async function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";


    //récupère nom et id du photographe et créer les éléments correspondants
    const photographerData = await getPhotographers();
    const { name, id } = photographerData[0];
    const nameField = document.querySelector(".modal-top");
    const nameModal = document.createElement("h2");
    nameModal.setAttribute("class", "modal-name");

    //RegEX pour verifier la validité des champs
    regName = /^[a-zA-Z ]+$/;
    regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    //Messages d'erreurs
    const error1 = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    const error2 = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    const error3 = "Veuillez entrer une adresse mail valide.";
    const error4 = "Veuillez entrer 10 caractères ou plus pour le champ du message.";

    var nameDisplayed = false;
    let errorState = [false, false, false];
    const submitButton = document.querySelector(".submit");
    const formInput = document.querySelectorAll(".formData input");
    const formInputArea = document.querySelector(".formData textarea");
    const formData = document.querySelectorAll(".formData");

    submitButton.addEventListener("click", validateForm);

    //affiche le nom du photographe
    if (nameDisplayed == false) {
        nameModal.textContent = name;
        nameField.appendChild(nameModal);
        nameDisplayed = true;
    }


    function validateForm(x) {
        x.preventDefault();
        checkFields();
    }

    // Event de validation du formulaire
    function checkFields() {

        // On récupère la présence d'une donnée pour chaque champs dans une array
        let inputList = [];
        inputList.push(formInput[0].value.length, formInput[1].value.length, formInput[2].value.length, formInputArea.value.length);

        // On récupère les resultats de chaque champ dans une array
        let validList = [nameValid(), surnameValid(), emailValid(), messageValid()];

        // On vérifie si les champs sont vides et erronés
        if (inputList.includes(0) || validList.includes(false)) {
            return false;
        }
        else {
            modal.style.display = "none";
            return true;
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
        if (formInput[1].value.length > 1) {
            errorReset(formData[3], 3);
            return true;
        }
        else {
            errorMessage(error2, formData[3], 3);
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
        else {
        }

    }

    // Détruit l'erreur affichée
    function errorReset(formNumber, errorNumber) {

        if (errorState[errorNumber] == true) { // Si l'erreur est définie comme affichée
            formNumber.parentNode.removeChild(formNumber.nextSibling); // Enlève la div après l'input spécifié
            errorState[errorNumber] = false; // L'erreur est définie comme cachée
        }
        else {
        }

    }


}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    resetData();
}
