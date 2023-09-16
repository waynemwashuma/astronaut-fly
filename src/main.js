import {
  Manager,
  Renderer2D,
  World,
  Input,
  EventDispatcher,
  DOMEventHandler,
  System
} from "./chaos.module.js"
import {
  CamFollowerController,
  DefaultSystem,
  PowerUpSpawner
} from "./system/index.js"

let manager = new Manager()

let renderer = new Renderer2D()
renderer.bindTo("#can")
renderer.setViewport(innerWidth, innerHeight)

let world = new World()
world.gravity = 400
world.angularDamping = 0.001

let domEvents = new EventDispatcher()

let input = new Input(domEvents)

let cameraController = new CamFollowerController(renderer.camera)
cameraController.setOffset(0, -innerHeight / 2)

let powerSpawner = new PowerUpSpawner()

manager.registerSystem("renderer", renderer)
manager.registerSystem("world", world)
manager.registerSystem("input", input)
manager.registerSystem("cam", cameraController)
manager.registerSystem('wrap', new DefaultSystem("wrap"))
manager.registerSystem('follow', new DefaultSystem("follow"))
manager.registerSystem("spawner",powerSpawner)

//powerSpawner.genBox(400)
export {
  renderer,
  world,
  manager,
  cameraController,
  input,
  domEvents,
  powerSpawner
}

console.log(manager);