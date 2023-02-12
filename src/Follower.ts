export class Follower {
    posX: number
    posY: number
    color: string = "brown"
    size: number = 10
    speed: number = 4

    constructor(posX: number, posY: number) {
        this.posX = posX
        this.posY = posY
    }

    move(x: number, y: number) {
        x = x - this.posX
        y = -y + this.posY
        let z = Math.atan(y / x)
        if (z < 0 && y >= 0) {
            z = Math.PI + z
        } else if (z > 0 && y < 0) {
            z = Math.PI + z
        } else if (z < 0 && x > 0) {
            z = Math.PI * 2 + z
        }
        this.posX += this.speed * Math.cos(z)
        this.posY += -this.speed * Math.sin(z)
    }

    draw(ctx: any): void {
        ctx.fillStyle = this.color
        ctx.fillRect(this.posX - this.size / 2, this.posY - this.size / 2, this.size, this.size);
    }
}