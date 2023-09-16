import {
  Entity,
  BodySprite,
  Transform,
  Movable,
  Bound,
  Sprite,
  Ball,
  Body
} from "../../chaos.module.js"

export function createBooster(x, y) {
  let entity = new Entity()
  let body = new Ball(20)
  body.type = Body.STATIC
  body.collisionResponse = false
  entity
    .attach("transform", new Transform(x, y))
    .attach("movable", new Movable())
    .attach("bounds", new Bound())
    .attach("body", body)
    .attach("sprite", new BodySprite())
  
  
  entity.register("collision",(a,b)=>{
    a.removeSelf()
  })
  return entity
}