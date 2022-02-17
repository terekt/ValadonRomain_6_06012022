    async function getAllPhotographers() {
        let url = './data/photographers.json';
        //let url = 'https://terekt.github.io/ValadonRomain_6_06012022/data/photographers.json';

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
    }

    async function initIndex() {
        // Récupère les datas des photographes
        const { photographers } = await getAllPhotographers();
        displayData(photographers);
    }
    
    initIndex();
    