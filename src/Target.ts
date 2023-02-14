export class Target {
    posX: number = 0
    posY: number = 0
    color: string = "red"
    size: number[] = [2, 20]

    constructor(canvas: HTMLCanvasElement) {
        canvas.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect()
            this.posX = e.clientX - (canvas.offsetLeft - window.pageXOffset);
            this.posY = e.clientY - rect.top
        })
    }

    draw(ctx: any): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX - this.size[0] / 2, this.posY - this.size[1] / 2, this.size[0], this.size[1]);
        ctx.fillRect(this.posX - this.size[1] / 2, this.posY - this.size[0] / 2, this.size[1], this.size[0]);
    }
}