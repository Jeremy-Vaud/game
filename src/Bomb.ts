export class Bomb {
    posX: number
    posY: number
    size: number
    maxSize: number = 200

    constructor(posX: number, posY:number) {
        this.posX = posX
        this.posY = posY
        this.size = 0
    }

    expand() {
        if(this.size < this.maxSize) {
            this.size += 10
            return true
        }
        return false
    }

    draw(ctx: any) {
        ctx.beginPath();
        ctx.strokeStyle = "yellow";
        ctx.lineWidth=10;
        ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }
}