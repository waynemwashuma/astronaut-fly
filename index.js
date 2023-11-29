import {
  createCharacter,
  createBounds,
  createStar
} from "./src/index.js"
import {
  manager,
  cameraController,
  domEvents,
  powerSpawner,
  renderer,
  info,
  startGame,
  endGame
} from "./src/main.js"
import { Vector } from "./src/chaos.module.js"
let character = createCharacter(innerWidth / 2, 0, -90)
let bounds = createBounds()
//renderer.domElement.remove()
let up = new Vector(0, 1)

manager.add(character)
manager.add(bounds)

addEventListener("click", characterReact)
addEventListener("keydown", e => {
  if (e.key === " ")
    characterReact()
})
addEventListener('resize',()=>{
  renderer.setViewport(innerWidth,innerHeight)
})

cameraController.followEntity(character)
powerSpawner.position = character.get("transform").position

let start = false //confirm("Do you want to start the game?")
/*if (start)
  startGame(character)
else
  endGame(character)
*/


function characterReact() {

  if (info.booster.value <= 0) return

  let rot = character.get("transform").orientation
  let movable = character.get("movable")
  let dir = Vector.fromRad(rot.radian)

  let angMult = up.cross(dir)
  angMult = angMult > 0 ? 1 : -1
  dir.multiply(500)
  movable.rotation.radian = Math.PI * 1.5 * angMult
  movable.velocity.add(dir)
  movable.velocity.clamp(0, 500)
  info.booster.value -= 1
}