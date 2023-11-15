import {
  Manager,
  Renderer2D,
  World,
  Input,
  EventDispatcher,
  DOMEventHandler,
  System,
  Vector,
  Signal
} from "./chaos.module.js"
import {
  CamFollowerController,
  DefaultSystem,
  PowerUpSpawner
} from "./system/index.js"

export const startposition = new Vector(
  innerWidth / 2,
  innerHeight / 2
)
export const info = Object.freeze({
  score: new Signal(0),
  booster: new Signal(0),
  maxBoosters: 0,
  gravity: 400
})


export const manager = new Manager()
export const renderer = new Renderer2D()
export const world = new World()
export const domEvents = new EventDispatcher()
export const input = new Input(domEvents)
export const cameraController = new CamFollowerController(renderer.camera)
export const powerSpawner = new PowerUpSpawner()

world.gravity = 400
world.angularDamping = 0.001

renderer.bindTo("#can")
renderer.setViewport(innerWidth, innerHeight)

cameraController.setOffset(0, -innerHeight / 2)

manager.registerSystem("renderer", renderer)
manager.registerSystem("world", world)
manager.registerSystem("input", input)
manager.registerSystem("cam", cameraController)
manager.registerSystem('wrap', new DefaultSystem("wrap"))
manager.registerSystem('follow', new DefaultSystem("follow"))
manager.registerSystem('magnetizer', new DefaultSystem("magnetizer"))
manager.registerSystem("spawner", powerSpawner)

export function endGame(character) {
  let start = confirm("Do you want to continue?")
  if (start) return startGame(character)
  character.get("transform").position.copy(startposition)
  manager.pause()
}

export function startGame(character) {
  let movable = character.get("movable")
  let transform = character.get("transform")
  
  let allowed = manager.getEntitiesByTags(["persistent"])
  manager.clear()
  allowed.forEach(e=>manager.add(e))
  renderer.camera.transform.position.set(0, 0)

  info.booster.value = info.maxBoosters
  info.score.value = 0

  transform.position.copy(startposition)
  transform.orientation.degree = -90
  movable.rotation.degree = 0
  movable.velocity.set(0, 0)

  powerSpawner.reset()
  cameraController.reset()
}