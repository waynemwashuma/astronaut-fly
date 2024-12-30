import {
  System,
  Vector,
  rand,
  round
} from "../chaos.module.js"

import { createStar, createMagnet, createBooster } from "../entities/index.js"

export class PowerUpSpawner extends System {
  padding = new Vector(0, 100)
  viewportWidth = 390
  viewportHeight = 844
  next = this.viewportHeight
  position = null
  period = -this.viewportHeight * 2
  offset = 0
  manager = null
  constructor(position) {
    super()
    this.position = position || new Vector()
    this.configureViewport(this.viewportWidth, this.viewportHeight)
  }
  init(manager) {
    this.manager = manager
  }
  configureViewport(width, height) {
    this.viewportWidth = width
    this.viewportHeight = height
    this.offset = -height
    this.period = -height * 2
    this.padding.x = width / 3
    this.next = height
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
    let repeatX = (this.viewportWidth - padX) / padX
    let repeatY = this.viewportHeight / padY
    
    for (let i = 0; i <= repeatX; i++) {
      for (let j = 0; j <= repeatY; j++) {
        let x = i * padX + padX/2,
          y = j * padY - this.viewportHeight/2 + off
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
    this.next = this.viewportHeight
  }

}
