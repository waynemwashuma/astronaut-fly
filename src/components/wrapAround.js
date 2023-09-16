import {Component} from "../chaos.module.js"

export class WrapAround extends Component{
  maxLeft = 0
  maxRight = 0
  init(entity){ 
    super.init(entity)
    this.requires("transform")
    this.position = entity.get("transform").position
    this.maxRight = entity.manager.getSystem("renderer").width
  }
  update(){ 
    if(this.position.x > this.maxRight){
      this.position.x = this.maxLeft
    }
    if (this.position.x < this.maxLeft) {
      this.position.x = this.maxRight
    }
  }
}