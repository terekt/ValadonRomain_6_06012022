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
    regEmail= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    //Messages d'erreurs
    const error1 = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    const error2 = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    const error3 = "Veuillez entrer une adresse mail valide.";
    const error4 = "Veuillez entrer 10 caractères ou plus pour le champ du message.";

    var nameDisplayed = false;

    //affiche le nom du photographe
    if (nameDisplayed == false) {
        nameModal.textContent = name;
        nameField.appendChild(nameModal);
        nameDisplayed = true;
    }



}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
