import {
  Entity,
  BodySprite,
  Transform,
  Movable,
  Bound,
  Box,
  Sprite,
  Composite,
  Body,
  Rectangle,
  Vector
} from "../chaos.module.js"
import { renderer, cameraController,endGame } from "../main.js"
import { Follower } from "../components/index.js"

export function createBounds() {
  let entity = new Entity()
  let follower = new Follower(renderer.camera.transform.position)

  let body = createBoundingBox(-100, 0, renderer.width + 200, renderer.height + 120, 100)
  body.type = Body.STATIC
  body.mask.group = 1
  entity
    .attach("transform", new Transform())
    .attach("movable", new Movable())
    .attach("bounds", new Bound())
    .attach("body", body)
    //.attach("sprite", new BodySprite())
    .attach("follow", follower)
  entity.register("precollision", (a, b) => {
    if (b.hasTag("character")) {
      return //endGame()
    }
    //b.removeSelf()
  })

  entity.register("collision", (a, b) => {
    if (b.hasTag("character")) {
      return endGame()
    }
  })
  entity.addTag("bounds")
  entity.addTag("persistent")
  return entity
}

function createBoundingBox(x, y, w, h, t = 20) {
  let l1 = new Rectangle(w + 2 * t, t, new Vector(x + w / 2, y - t / 2))
  let l2 = new Rectangle(t, h, new Vector(x + w + t / 2, y + h / 2))
  let l3 = new Rectangle(
    w + 2 * t, t, new Vector(x + w / 2, y + h + t / 2)
  )
  let l4 = new Rectangle(t, h, new Vector(x - t / 2, y + h / 2))
  return new Body(l2, l3, l4)
}