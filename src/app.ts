import { Player } from "./Player";

const canvas : any = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const player = new Player(canvas)
setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx)
}, 1000/60)

ctx.fill