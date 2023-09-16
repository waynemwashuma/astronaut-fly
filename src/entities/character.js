import {
  Entity,
  BodySprite,
  Transform,
  Movable,
  Bound,
  Box,
  Sprite
} from "../chaos.module.js"

import {WrapAround} from "../components/index.js"

export function createCharacter(x, y, a) {
  let entity = new Entity()
  entity
    .attach("transform", new Transform(x, y, a))
    .attach("movable", new Movable())
    .attach("bounds", new Bound())
    .attach("body", new Box(80, 50))
    .attach("sprite", new BodySprite())
    .attach("wrap",new WrapAround())

  entity.addTag("character")

  return entity
}