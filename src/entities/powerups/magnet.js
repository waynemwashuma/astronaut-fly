import {
  Entity,
  BodySprite,
  Transform,
  Movable,
  Bound,
  Sprite,
  Ball,
  Body,
  BufferGeometry,
  StaticImageMaterial
} from "../../chaos.module.js"

import { Magnetizer } from "../../components/index.js"
let img = new Image()
img.decoding = "sync"
img.src = "/src/assets/imgs/magnet.png"
let geometry = new BufferGeometry()
let material = new StaticImageMaterial(img)

material.width = 40
material.height = 40

export function createMagnet(x, y) {
  let entity = new Entity()
  let body = new Ball(20)
  body.type = Body.STATIC
  body.collisionResponse = false
  entity
    .attach("transform", new Transform(x, y))
    .attach("movable", new Movable())
    .attach("bounds", new Bound())
    .attach("body", body)
    .attach("sprite", new Sprite(geometry, material))

  entity.addTag("powerup")
  
  entity.register("precollision", (a, b) => {
    a.removeSelf()
    if (!b.has("magnetizer")) b.attach("magnetizer", new Magnetizer())
  })
  return entity
}