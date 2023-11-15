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
  info
} from "./src/main.js"
import { Vector } from "./src/chaos.module.js"
let character = createCharacter(innerWidth / 2, 0, -90)
let bounds = createBounds()
//renderer.domElement.remove()
let up = new Vector(0, 1)

manager.add(character)
manager.add(bounds)

cameraController.followEntity(character)
powerSpawner.position = character.get("transform").position

function characterReact() {
  
  if(info.booster.value <= 0)return
  
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
addEventListener("click", characterReact)
setTimeout(() => {
  character.get("transform").position.y = -380
  //manager.update(0.016)
  //manager.pause()
  manager.update(0.016)
  manager.update(0.016)
}, 200)