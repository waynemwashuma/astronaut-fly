import { Component, Vector, BoundingBox, BoundingCircle } from "../chaos.module.js"

export class Magnetizer extends Component {
  time = 5
  querybound = new BoundingCircle(200)
  constructor() {
    super()
  }
  init(entity) {
    this.entity = entity
    this.position = entity.get("transform").position
    super.init(entity)
  }
  update(dt) {
    this.querybound.update(this.position)
    let attracted = this.entity.query(this.querybound)
    for (var i = 0; i < attracted.length; i++) {
      if (!attracted[i].hasTag("powerup"))
        continue
      let pos = attracted[i].get("transform").position
      let target = Vector.lerp(
        pos, this.position, 0.01
      )
      pos.copy(target)
    }
    //console.log(attracted);
    if (this.time < 0) this.entity.remove("magnetizer")
    this.time -= dt
  }
}