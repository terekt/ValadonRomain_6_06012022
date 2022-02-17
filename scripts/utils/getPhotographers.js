async function getPhotographers() {
    let url = '../../data/photographers.json';
    //let url = 'https://terekt.github.io/ValadonRomain_6_06012022/data/photographers.json';
    try {
        let res = await fetch(url)
        let json = await res.json();
        const photographerId = await photographerID();
        const photographerData = json.photographers.find(photographer => photographer.id == photographerId);
        const photographerMedia = json.media.filter(data => data.photographerId == photographerId);
        return [photographerData, photographerMedia];
    }
    catch (error) {
        console.log(error);
    }
}