import Point from "./point"

export default class Ball extends Point {
    constructor(x, y, r) {
        super(x, y)

        this.radius = r
        this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
        this.stroke = "black"
        this.potentialEnergy = 20
    }

    draw() {
        const xmlns = "http://www.w3.org/2000/svg";
        const circle = document.createElementNS(xmlns, "circle");

        circle.setAttributeNS(null, "r", this.radius)
        circle.setAttributeNS(null, "cx", this.x)
        circle.setAttributeNS(null, "cy", this.y)
        circle.setAttributeNS(null, "fill", this.color)

        // circle.setAttributeNS(null, "transform", `translate(${this.radius}, ${this.radius})`)


        return circle
    }

    init(domElement, layout) {
        const circle = this.draw()

        domElement.append(circle)

        this.born =  Date.now()

        this.applyForces(circle, layout)
    }

    velocity(circle) {
        this.x  = this.x + Math.random() * 10

        circle.setAttributeNS(null, "cx", this.x)
    }

    bounciness(circle, layout) {
        if(this.y >= layout.height && this.potentialEnergy > 0){
            const now = Date.now()
            const { acceleration, timeScale } =  window.config;

            this.y = this.y - acceleration * 1.119 * ((now - this.born ) / timeScale *2)

            this.potentialEnergy --;
            circle.setAttributeNS(null, "cy", this.y)

        }
        
        if(this.potentialEnergy === 0) {
            this.y = layout.height
        }
    }


    applyForces(circle, layout) {
        const self = this;


        function gravity() {
            const now = Date.now()
            const { acceleration, timeScale } =  window.config;
            self.y  = self.y + acceleration * ((now - self.born) / timeScale)

            circle.setAttributeNS(null, "cy", self.y)

            self.velocity(circle)

            self.bounciness(circle, layout)

            if (self.potentialEnergy > 0) requestAnimationFrame(gravity)
        }

        requestAnimationFrame(gravity)
    }

    lifecycle() {
        this.init()
    }
}