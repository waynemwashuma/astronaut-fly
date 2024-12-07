import { Component, clamp } from "../chaos.module.js"

function lerp(a, b, t) {
  return a + (b - a) * t
}

function mix(light, dark, t) {
  const r = Math.round(lerp(light[0], dark[0], t))
  const g = Math.round(lerp(light[1], dark[1], t))
  const b = Math.round(lerp(light[2], dark[2], t))
  return `rgb(${r}, ${g}, ${b})`
}

export class SkyComponent extends Component {
  target = null
  startY = innerHeight / 2
  darkenRange = 4200
  material = null
  position = null

  constructor(target, startY) {
    super()
    this.target = target
    if (startY != null) this.startY = startY
  }

  init(entity) {
    super.init(entity)
    this.requires("transform")
    this.requires("sprite")
    this.position = entity.get("transform").position
    this.material = entity.get("sprite").material
  }

  update() {
    if (!this.target) return
    this.position.copy(this.target)
    const altitude = Math.max(0, this.startY - this.target.y)
    const t = clamp(altitude / this.darkenRange, 0, 1)
    this.material.fill = mix([132, 205, 255], [6, 10, 30], t)
  }
}
