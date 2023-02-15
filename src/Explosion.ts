export class Explosion {
    posX: number
    posY: number
    color: string
    time: number = 100
    opacity: number = 1
    particles: { posX: number, posY: number, speedX: number, speedY: number }[] = []
    constructor(posX: number, posY: number, color: string) {
        this.posX = posX
        this.posY = posY
        this.color = color
        for (let i = 0; i < 100; i++) {
            this.particles.push({ posX: this.posX, posY: this.posY, speedX: (Math.random() - 0.5) * 10 * Math.random(), speedY: (Math.random() - 0.5) * 10 * Math.random() })
        }
    }
    move(): void {
        this.opacity -= 1 / this.time
        this.particles.forEach((particle) => {
            particle.posX += particle.speedX
            particle.posY += particle.speedY
        })
    }
    draw(ctx: any): boolean {

        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        if (this.opacity <= 0) {
            ctx.globalAlpha
            return false
        } else {
            this.particles.forEach((particle) => {
                ctx.fillRect(particle.posX, particle.posY, 2, 2)
            })
            ctx.globalAlpha = 1
            return true
        }


    }
}