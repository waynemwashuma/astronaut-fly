import { System } from "../chaos.module.js"

export class DefaultSystem extends System {
  objects = []
  constructor(name) {
    super()
    this.name = name
  }
  init(manager) {
    manager.setComponentList(this.name, this.objects)
  }
  update(dt) {
    this.objects.forEach(e => {
      e.update(dt)
    })
  }
}