//import {enableBodyScroll, disableBodyScroll} from "./body-scroll-lock"

class lightbox {
    //stocke les medias dans une array et appel de la fonction de création de la lightbox quand on clique sur un des média
    static init() {
        console.log("init")
        const links = Array.from(document.querySelectorAll("medias"))
        console.log(links)
        const gallery = links.map(link => link.getAttribute("href"))
        links.forEach(link => link.addEventListener("click", e => {
                e.preventDefault()
                new lightbox(e.currentTarget.getAttribute('href'), gallery)
            }))
    }

    // appel le DOM et le loader de l'image
    constructor(url, gallery) {
        this.element = this.buildDOM(url)
        this.images = gallery
        this.loadImage(url)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        //disableBodyScroll(this.element)
        document.addEventListener("keyup", this.onKeyUp.bind(this))
    }

    //gère le chargement de l'image avec une animation et l'affiche une fois chargé
    loadImage(url) {
        this.url = null
        const image = new Image()
        const container = this.element.querySelector(".lightbox-container")
        const loader = document.createElement("div")
        loader.classList.add("lightbox-loader")
        container.innerHTML = ''
        container.appendChild(loader)
        image.onload = () => {
            console.log("chargé")
            container.removeChild(loader)
            container.appendChild(image)
            this.url = url
        }
        image.src = url
    }

    //Créé la lightbox en fonction de l'image cliqué et gère la naviguation
    buildDOM(url) {
        const dom = document.createElement("div")
        dom.classList.add("lightbox")
        dom.innerHTML = `<button class="lightbox-close">
            <i class="fas fa-times lightbox-exit"></i>
        </button>
        <button class="lightbox-prev">
            <i class="fas fa-chevron-left lightbox-nav"></i>
        </button>
        <button class="lightbox-next">
            <i class="fas fa-chevron-right lightbox-nav"></i>
        </button>
        <div class="lightbox-container">
            
        </div>`
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
        return dom
    }

    //ferme la lightbox via le bouton + clavier
    close(e) {
        e.preventDefault()
        this.element.classList.add("fadeout")
        //enableBodyScroll(this.element)
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener("keyup", this.onKeyUp)
    }

    //va à l'image suivante via le bouton + clavier
    next(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        if (i === this.images.length - 1) {
            i = -1
        }
        this.loadImage(this.images[i + 1])
    }

    //va à l'image précédente via le bouton + clavier
    prev(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        if (i === 0) {
            i = this.images.length
        }
        this.loadImage(this.images[i - 1])
    }

    //gère les input du clavier
    onKeyUp (e) {
        if (e.key == "escape") {
            this.close(e)
        } else if (e.key == "ArrowLeft") {
            this.prev(e)
        } else if (e.key == "ArrowRight") {
            this.next(e)
        }
    }

}


lightbox.init()