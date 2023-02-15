export class Follower {
    posX: number
    posY: number
    color: string
    size: number = 20
    speed: number = 1
    damage = 1
    life: number = 2
    listColors: string[] = [
        "brown",
        "navy",
        "olive",
        "darkorange",
        "mediumvioletred",
        "goldenrod",
        "slategrey",
        "skyblue",
        "purple",
        "teal",
        "burlywood",
        "chocolate",
        "lightcoral",
        "maroon",
        "salmon"
    ]

    constructor(pos: "top" | "bottom" | "left" | "right", canvas: HTMLCanvasElement) {
        if(pos === "top") {
            this.posX = canvas.width * Math.random()
            this.posY = -50
        } else if(pos === "bottom") {
            this.posX = canvas.width * Math.random()
            this.posY = canvas.height + 50
        } else if(pos === "left") {
            this.posX = -50
            this.posY = canvas.height * Math.random()
        } else if(pos === "right") {
            this.posX = canvas.width + 50
            this.posY = canvas.height * Math.random()
        }
        this.color = this.listColors[Math.floor(Math.random() * this.listColors.length)];
    }

    move(x: number, y: number) {
        x = x - this.posX
        y = -y + this.posY
        let z = Math.atan(y / x)
        if (z < 0 && y > 0) {
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

    isTouch(hitBox: number[]): boolean {
        if (this.posX > hitBox[0] && this.posX < hitBox[1] && this.posY > hitBox[2] && this.posY < hitBox[3]) {
            return true;
        } else {
            return false
        }

    }

    hitBox(): number[] {
        return [this.posX - this.size / 2, this.posX + this.size / 2, this.posY - this.size / 2, this.posY + this.size / 2]
    }

    isHit(posX: number, posY: number, damage: number): boolean {
        if (posX > this.posX - this.size / 2 && posX < this.posX + this.size / 2 && posY > this.posY - this.size / 2 && posY < this.posY + this.size / 2) {
            this.life -= damage
            return true;
        } else {
            return false
        }

    }

    distanceFromPoint(posX, posY) {
        const x = posX - this.posX
        const y = posY - this.posY
        return Math.sqrt(x * x + y * y)
    }
}