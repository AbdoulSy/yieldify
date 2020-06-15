export default class Layout {
    constructor() {
        this.resize();
    }

    fullScreen(elem) {
        this.width = window.innerWidth
        this.height = window.innerHeight //title

        const layoutElement = document.getElementById(elem)

        layoutElement.style.width = this.width
        layoutElement.style.height = this.height
    }

    resize() {
        this.fullScreen("resizableLayout")
    }
}