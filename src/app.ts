import { Player } from "./Player";
import { Follower } from "./Follower";
import { Explosion } from "./Explosion";
import { Bullet } from "./Bullet";
import { Bomb } from "./Bomb";

// Canva
const canvas: any = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// Player
const player = new Player(canvas)
// Player bullets
let playerShoot: ReturnType<typeof setInterval>
const playerBullets: Bullet[] = []
const playerBulletsColor: string = "yellow"
const playerBulletsSize: number = 3
const playerBulletSpeed: number = 10
const playerBulletsFrequency: number = 100
const playerBulletsDamage: number = 1
// Player circle
const playerBombs: Bomb[] = []
let playerNumberBoms = 3
// Enemies
const enemies: { follower: Follower[] } = { follower: [] }
// Explosions
const explosions: Explosion[] = []
// Game over
let gameOver: boolean = false
// Score
let score = 0

// Events
document.addEventListener("mousedown", startShoot)
document.addEventListener("mouseup", stopShoot)
document.addEventListener("keydown", launchBomb)

// Main
const main = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.move()
    updateBombs()
    drawPlayerBullets()
    updateFollowers()
    if (player.life <= 0) {
        clearInterval(generateFollowers)
        document.removeEventListener("mousedown", startShoot)
        stopShoot()
        playGameOver()
    } else {
        player.draw(ctx)
    }
    updateExplosions()
}, 1000 / 60)

const generateFollowers = setInterval(() => {
    let loop = 1 + Math.trunc(score / 100)
    for (let i = 0; i < loop; i++) {
        enemies.follower.push(new Follower("top", canvas))
        if (score > 10) {
            enemies.follower.push(new Follower("bottom", canvas))
        }
        if (score > 30) {
            enemies.follower.push(new Follower("left", canvas))
        }
        if (score > 60) {
            enemies.follower.push(new Follower("right", canvas))
        }
    }
}, 2000)

/*
 * Functions
 */

function updateFollowers(): void {
    enemies.follower.forEach((enemy, key) => {
        playerBullets.forEach((bullet, key) => {
            if (enemy.isHit(bullet.posX, bullet.posY, bullet.damage)) {
                delete playerBullets[key]
            }
        })
        playerBombs.forEach((bomb, key) => {
            if (enemy.distanceFromPoint(bomb.posX, bomb.posY) <= bomb.size) {
                enemy.life = 0
            }
        })
        if (enemy.life <= 0) {
            explosions.push(new Explosion(enemy.posX, enemy.posY, enemy.color))
            score++
            delete enemies.follower[key]
        } else {
            if (player.life > 0) {
                enemy.move(player.posX, player.posY)
            } else {
                enemy.move(canvas.width / 2, canvas.height + 100)
            }
            let playerHitBox = player.hitBox()
            if (player.life > 0 && enemy.isTouch(playerHitBox)) {
                player.life -= enemies.follower[key].damage
                explosions.push(new Explosion(enemy.posX, enemy.posY, enemy.color))
                delete enemies.follower[key]
            } else {
                enemy.draw(ctx)
            }
        }
    })
}

function updateExplosions() {
    explosions.forEach((explosion, key) => {
        explosion.move()
        if (!explosion.draw(ctx)) {
            delete explosions[key]
        }
    })
}

function playGameOver() {
    ctx.fillStyle = "white"
    ctx.font = "40pt Arial";
    ctx.textBaseline = 'middle'
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    ctx.font = "15pt Arial";
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 30);
    if (!gameOver) {
        gameOver = true
        explosions.push(new Explosion(player.posX, player.posY, player.color))
    }
}

function startShoot(): void {
    playerShoot = setInterval(() => {
        initBulletPlayer()
    }, playerBulletsFrequency)
}

function stopShoot(): void {
    clearInterval(playerShoot)
}

function initBulletPlayer(): void {
    let x = player.target.posX - player.posX
    let y = -player.target.posY + player.posY
    let z = Math.atan(y / x)
    if (z < 0 && y > 0) {
        z = Math.PI + z
    } else if (z > 0 && y < 0) {
        z = Math.PI + z
    } else if (z < 0 && x > 0) {
        z = Math.PI * 2 + z
    }
    let speedX = playerBulletSpeed * Math.cos(z)
    let speedY = -playerBulletSpeed * Math.sin(z)
    let bullet = new Bullet(speedX, speedY, player.posX, player.posY, playerBulletsColor, playerBulletsSize, playerBulletsFrequency, playerBulletsDamage, canvas)
    playerBullets.push(bullet)
}

function drawPlayerBullets() {
    playerBullets.forEach((bullet, key) => {
        if (bullet.move()) {
            bullet.draw(ctx)
        } else {
            delete playerBullets[key]
        }
    })
}

function launchBomb(e: KeyboardEvent): void {
    if (playerNumberBoms > 0) {
        if (e.key === " ") {
            playerBombs.push(new Bomb(player.posX, player.posY))
            playerNumberBoms--
        }
    }
}

function updateBombs(): void {
    playerBombs.forEach((bomb, key) => {
        if (bomb.maxSize === bomb.size) {
            delete playerBombs[key]
        }
        bomb.expand()
        bomb.draw(ctx)
    })
}