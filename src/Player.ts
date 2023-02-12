import { Target } from "./Target";
import { Bullet } from "./Bullet";

export class Player {
    // Canvas
    canvas: HTMLCanvasElement
    // Player
    posX: number = 100
    posY: number = 100
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
    // Bullets
    shoot: ReturnType<typeof setInterval>
    bullets: Bullet[] = []
    bulletsColor: string = "purple"
    bulletsSize: number = 3
    bulletSpeed: number = 10
    bulletFrequency: number = 100

    constructor(canvas: HTMLCanvasElement) {
        // Attributs
        this.minX = this.size / 2
        this.minY = this.size / 2
        this.maxX = canvas.width - this.size / 2
        this.maxY = canvas.height - this.size / 2
        this.canvas = canvas
        this.target = new Target(this.canvas)
        // Events
        document.addEventListener("mousedown", this.startShoot.bind(this))
        document.addEventListener("mouseup", this.stopShoot.bind(this))
        document.addEventListener("keydown", this.addDirection.bind(this))
        document.addEventListener("keyup", this.deleteDirection.bind(this))

    }

    draw(ctx: any): void {
        this.move()
        ctx.fillStyle = this.color
        ctx.fillRect(this.posX - this.size / 2, this.posY - this.size / 2, this.size, this.size);
        this.target.draw(ctx)
        this.drawBullets(ctx)
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

    private move(): void {
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

    private startShoot(): void {
        this.shoot = setInterval(() => {
            this.initBullet()
        }, this.bulletFrequency)
    }

    private stopShoot(): void {
        clearInterval(this.shoot)
    }

    private initBullet(): void {
        let x = this.target.posX - this.posX
        let y = -this.target.posY + this.posY
        let z = Math.atan(y / x)
        if (z < 0 && y > 0) {
            z = Math.PI + z
        } else if (z > 0 && y < 0) {
            z = Math.PI + z
        } else if (z < 0 && x > 0) {
            z = Math.PI * 2 + z
        }
        let speedX = this.bulletSpeed * Math.cos(z)
        let speedY = -this.bulletSpeed * Math.sin(z)
        let bullet = new Bullet(speedX, speedY, this.posX, this.posY, this.bulletsColor, this.bulletsSize, this.bulletSpeed, this.canvas)
        this.bullets.push(bullet)
    }

    private drawBullets(ctx: any) {
        ctx.fillStyle = this.bulletsColor
        this.bullets.forEach((bullet, key) => {
            if (bullet.move()) {
                bullet.draw(ctx)
            } else {
                delete this.bullets[key]

            }
        })
    }
}