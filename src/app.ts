import { Player } from "./Player";
import { Follower } from "./Follower";

const canvas: any = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const player = new Player(canvas)
const enemies: { follower: Follower[] } = { follower: [new Follower(300, 300),new Follower(500, 300),new Follower(700, 200)] }
setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemies.follower.forEach((enemy) => {
        enemy.move(player.posX,player.posY)
        enemy.draw(ctx)
    })
    player.draw(ctx)
}, 1000 / 60)

ctx.fill