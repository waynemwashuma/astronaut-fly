import {
  createCharacter,
  createBounds,
  createStar
} from "./src/index.js"
import { manager, cameraController, domEvents,powerSpawner } from "./src/main.js"
import {Vector} from "./src/chaos.module.js"
let character = createCharacter(innerWidth / 2, 0, -90)
let bounds = createBounds()

let up = new Vector(0, 1)



manager.add(character)
manager.add(bounds)

cameraController.followEntity(character)
powerSpawner.position = character.get("transform").position

addEventListener("click", () => {
  let rot = character.get("transform").orientation
  let movable = character.get("movable")
  let dir = Vector.fromRad(rot.radian)

  let angMult = up.cross(dir)
  angMult = angMult > 0 ? 1 : -1
  dir.multiply(500)
  movable.rotation.radian += Math.PI * angMult
  movable.velocity.add(dir)
})


/*let b = new Box(50, 80)
b.type = Body.STATIC
manager.add(
  Entity.Default(innerWidth / 2, -80)
  .attach("body", b)
  .attach("sprite", new BodySprite())
)*/