import {Component,Vector} from "../chaos.module.js"

export class Follower extends Component{
  constructor(position,offset){
    super()
    this.target = position || new Vector()
    this.offset = offset || new Vector()
  }
  init(entity){ 
    super.init(entity)
    this.requires("transform")
    this.position = entity.get("transform").position
    this.maxRight = entity.manager.getSystem("renderer").width
    this.update()
  }
  update(){ 
    this.position.copy(this.target).add(this.offset)
  }
}