import { CamController } from "../chaos.module.js"

export class CamFollowerController extends CamController {
  viewportHeight = 844
  maxheight = 0
  constructor(camera) {
    super(camera)
    this.reset()
  }
  setViewportHeight(height) {
    this.viewportHeight = height
  }
  follow(position, orientation) {
    this.targetPosition = position
  }
  update() {
    if (!this.targetPosition) return
    let ty = this.targetPosition.y
    if(ty > this.maxheight)return
    this.maxheight = ty
    let y = this.targetPosition.y - this.transform.position.y
    this.transform.position.y += y + this.offset.y
  }
  reset(){
    this.maxheight = this.viewportHeight
  }
}
