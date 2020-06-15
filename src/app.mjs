import constants from "./constants"

window.config = {
    acceleration: constants.acceleration,
    bounciness: constants.bounciness,
    titleHeight: 0,
    timeScale: constants.timeScale,
}

async function main() {
    let { default: Ball} = await import("./ball")
    let { default: Layout } = await import("./layout")

    const layout = new Layout()

    layout.fullScreen("world")

    const clickableArea = document.getElementById('world');
    
    clickableArea.addEventListener("click", e => {
        const ball = new Ball(
            e.clientX,
            e.clientY - window.config.titleHeight - 50,
            50
        )

        ball.init(document.getElementById("world"), layout)
    })

};

main()
