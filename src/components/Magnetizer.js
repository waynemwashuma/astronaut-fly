import {Component,Vector,BoundingBox} from "../chaos.module.js"

export class Magnetizer extends Component{
  time = 2000
  querybound = new BoundingBox(-45,-45,45,45)
  constructor(){
    super()
  }
  init(entity){
    this.position = entity.get("transform").position
    super.init(entity)
  }
  update(dt){ 
    this.querybound.update(this.position)
    let attracted = this.entity.query(this.querybound)
    for (var i = 0; i < attracted.length; i++) {
      let pos = attracted[i].get("transform").position
      Vector.lerp(
        this.position,pos,0.1,
        pos
        )
    }
    if(time < 0)this.entity.removeSelf()
    time -= dt
  }
}