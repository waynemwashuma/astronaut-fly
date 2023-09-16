import {
  System,
  Vector,
  rand,
  round
} from "../chaos.module.js"

import { createStar, createMagnet, createBooster } from "../entities/index.js"

export class PowerUpSpawner extends System {
  padding = new Vector(0, 100)
  next = innerWidth
  position = null
  period = -innerHeight
  offset = 0
  manager = null
  constructor(position) {
    super()
    this.offset = -innerHeight
    this.position = position || new Vector()
    this.padding.x = innerWidth / 3
  }
  init(manager) {
    this.manager = manager
  }
  update() {
    if (this.position.y <= this.next) {
      this.next = this.position.y + this.period// + this.offset
      console.log(this.next,this.position.y);
      this.generate()
    }
  }
  generate() {
    let offset = this.position.y + this.offset
    this.genBox(offset)

  }
  genBox(y) {
    let startX = innerWidth - this.padding.x / 2
    for (let i = startX; i >= 0; i -= this.padding.x) {
      for (let j = innerHeight / 2; j >= 0; j -= this.padding.y) {
        let powerUp = createBooster(i, j + y)
        this.manager.add(powerUp)
      }
    }
  }

}

//console.log(round(1234.765466,-2));