export class Bullet {
    speedX: number
    speedY: number
    posX: number
    posY: number
    minX: number
    maxX: number
    minY: number
    maxY: number
    color: string
    size: number
    speed: number
    damage: number

    constructor(speedX: number, speedY: number, posX: number, posY: number, color: string, size: number, speed: number, damage: number, canvas: HTMLCanvasElement) {
        this.speedX = speedX
        this.speedY = speedY
        this.posX = posX
        this.posY = posY
        this.color = color
        this.size = size
        this.speed = speed
        this.damage = damage
        this.minX = -this.size / 2
        this.minY = -this.size / 2
        this.maxX = canvas.width + this.size / 2
        this.maxY = canvas.height + this.size / 2
    }

    draw(ctx: any): void {
        ctx.fillStyle = this.color
        ctx.fillRect(this.posX - this.size / 2, this.posY - this.size / 2, this.size, this.size);
    }

    move(): boolean {
        this.posX += this.speedX
        this.posY += this.speedY
        return this.checkPosition()
    }

    private checkPosition(): boolean {
        if (this.posX < this.minX || this.posX > this.maxX || this.posY < this.minY || this.posY > this.maxY) {
            return false
        } else {
            return true
        }
    }
}