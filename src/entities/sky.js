import {
  Entity,
  Transform,
  Sprite,
  BufferGeometry,
  Vector,
  BasicMaterial
} from "../chaos.module.js"

import { SkyComponent } from "../components/index.js"

const geometry = new BufferGeometry([
  new Vector(-2500, -2500),
  new Vector(-2500, 2500),
  new Vector(2500, 2500),
  new Vector(2500, -2500)
])

const material = new BasicMaterial()
material.fill = "rgb(132, 205, 255)"
material.stroke = "transparent"

export function createSky(targetPosition, startY) {
  const entity = new Entity()
  entity
    .attach("transform", new Transform(targetPosition.x, targetPosition.y, 0))
    .attach("sprite", new Sprite(geometry, material))
    .attach("sky", new SkyComponent(targetPosition, startY))

  entity.addTag("persistent")
  entity.addTag("sky")
  return entity
}
