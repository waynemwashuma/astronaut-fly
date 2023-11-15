import {
  System,
  Vector,
  rand,
  round
} from "../chaos.module.js"

import { createStar, createMagnet, createBooster } from "../entities/index.js"

export class PowerUpSpawner extends System {
  padding = new Vector(0, 100)
  next = innerHeight
  position = null
  period = -innerHeight * 2
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
      this.next = this.position.y + this.period
      this.generate()
    }
  }
  generate() {
    let offset = this.position.y + this.offset
    this.genBox(offset)

  }
  genBox(off) {
    let padX = this.padding.x
    let padY = this.padding.y
    let repeatX = (innerWidth - padX) / padX
    let repeatY = (innerHeight) / padY
    
    for (let i = 0; i <= repeatX; i++) {
      for (let j = 0; j <= repeatY; j++) {
        let x = i * padX + padX/2,
          y = j * padY - innerHeight/2 + off
        let powerUp = createStar(x, y)
        if (
          (i == 0 ||i == repeatX) &&
          (j % 2 == 0)
        )powerUp = createMagnet(x, y)
        if (
          (i == 0 ||i == repeatX) &&
          (j == 0)
        )powerUp = createBooster(x, y)

        this.manager.add(powerUp)
      }
    }
  }
  reset() {
    this.next = innerHeight
  }

}