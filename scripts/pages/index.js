    async function getPhotographers() {
        //let url = '../../data/photographers.json';
        let url = 'https://drive.google.com/file/d/1R6njxtxPZbP4X5oeBplq4BjWo1Kw-Zhn/view';

        try {
            let res = await fetch(url)
            let json = await res.json();
            return json;
        }
        catch (error){
            console.log(error);
        } 
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function initIndex() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    initIndex();
    