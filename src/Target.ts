export class Target {
    posX : number = 0
    posY : number = 0
    color : string = "red"
    size : number = 5


    constructor(canvas : HTMLCanvasElement) {
        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect()
            this.posX = e.clientX - (canvas.offsetLeft - window.pageXOffset);
            this.posY = e.clientY - rect.top
        })
    }

    draw(ctx : any) : void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX - this.size / 2, this.posY - this.size / 2, this.size, this.size);
    }
}