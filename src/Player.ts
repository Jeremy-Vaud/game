import { Target } from "./Target";
import { Bullet } from "./Bullet";

export class Player {
    // Canvas
    canvas: HTMLCanvasElement
    // Player
    life: number = 3
    posX: number
    posY: number
    minX: number
    minY: number
    maxX: number
    maxY: number
    color: string = "green"
    size: number = 20
    speed: number = 5
    direction: { up: boolean, down: boolean, left: boolean, right: boolean } = {
        up: false,
        down: false,
        right: false,
        left: false
    }
    // Target
    target: Target

    constructor(canvas: HTMLCanvasElement) {
        // Attributs
        this.posX = canvas.width/2
        this.posY = canvas.height/2
        this.minX = this.size / 2
        this.minY = this.size / 2
        this.maxX = canvas.width - this.size / 2
        this.maxY = canvas.height - this.size / 2
        this.canvas = canvas
        this.target = new Target(this.canvas)
        // Events
        document.addEventListener("keydown", this.addDirection.bind(this))
        document.addEventListener("keyup", this.deleteDirection.bind(this))

    }

    draw(ctx: any): void {     
        ctx.fillStyle = this.color
        ctx.fillRect(this.posX - this.size / 2, this.posY - this.size / 2, this.size, this.size);
        this.target.draw(ctx)
        ctx.font = "10pt Arial";
        ctx.fillStyle = "white"
        ctx.fillText(`Life: ${this.life}`, 10, 20);
    }

    private addDirection(e: KeyboardEvent): void {
        if (e.key === 'z') {
            this.direction.up = true
        } else if (e.key === 's') {
            this.direction.down = true
        } else if (e.key === 'd') {
            this.direction.right = true
        } else if (e.key === 'q') {
            this.direction.left = true
        }
    }

    move(): void {
        let twoDirectionSpeed = Math.sqrt((this.speed * this.speed) / 2)
        if (this.direction.up) {
            if (this.direction.left) {
                this.posY -= twoDirectionSpeed
                this.posX -= twoDirectionSpeed
            } else if (this.direction.right) {
                this.posY -= twoDirectionSpeed
                this.posX += twoDirectionSpeed
            } else {
                this.posY -= this.speed
            }
        } else if (this.direction.down) {
            if (this.direction.left) {
                this.posY += twoDirectionSpeed
                this.posX -= twoDirectionSpeed
            } else if (this.direction.right) {
                this.posY += twoDirectionSpeed
                this.posX += twoDirectionSpeed
            } else {
                this.posY += this.speed
            }
        } else if (this.direction.left) {
            this.posX -= this.speed
        } else if (this.direction.right) {
            this.posX += this.speed
        }
        this.checkPosition()
    }

    private checkPosition(): void {
        if (this.posX < this.minX) {
            this.posX = this.minX
        } else if (this.posX > this.maxX) {
            this.posX = this.maxX
        }
        if (this.posY < this.minY) {
            this.posY = this.minY
        } else if (this.posY > this.maxY) {
            this.posY = this.maxY
        }
    }

    private deleteDirection(e: KeyboardEvent): void {
        if (e.key === 'z') {
            this.direction.up = false
        } else if (e.key === 's') {
            this.direction.down = false
        } else if (e.key === 'd') {
            this.direction.right = false
        } else if (e.key === 'q') {
            this.direction.left = false
        }
    }

    hitBox(): number[] {
        return [this.posX - this.size / 2, this.posX + this.size / 2, this.posY - this.size / 2, this.posY + this.size / 2]
    }
}