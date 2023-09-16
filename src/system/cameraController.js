import { CamController } from "../chaos.module.js"

export class CamFollowerController extends CamController {
  maxheight = innerHeight
  constructor(camera) {
    super(camera)
  }
  follow(position, orientation) {
    this.targetPosition = position
  }
  update() {
    if (!this.targetPosition) return
    let ty = this.targetPosition.y
    if(ty > this.maxheight)return
    this.maxheight = ty
    let height = innerHeight / 2
    let y = this.targetPosition.y - this.transform.position.y
    this.transform.position.y += y + this.offset.y
  }
}