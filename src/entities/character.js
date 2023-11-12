import {
  Entity,
  BodySprite,
  Transform,
  Movable,
  Bound,
  Box,
  Sprite,
  BufferGeometry,
  StaticImageMaterial
} from "../chaos.module.js"

import {WrapAround} from "../components/index.js"

let img = new Image()
img.src = "/src/assets/imgs/astronaut.png"
let geometry = new BufferGeometry()
let material = new StaticImageMaterial(img)
material.width = 80
material.height = 50

export function createCharacter(x, y, a) {
  let entity = new Entity()
  entity
    .attach("transform", new Transform(x, y, a))
    .attach("movable", new Movable())
    .attach("bounds", new Bound())
    .attach("body", new Box(80, 50))
    .attach("sprite", new Sprite(geometry, material))
    .attach("wrap",new WrapAround())

  entity.addTag("character")
  entity.addTag("persistent")
  return entity
}