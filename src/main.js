import {
  Manager,
  Renderer2D,
  World,
  Input,
  EventDispatcher,
  DOMEventHandler,
  System,
  Vector
} from "./chaos.module.js"
import {
  CamFollowerController,
  DefaultSystem,
  PowerUpSpawner
} from "./system/index.js"
let startposition = new Vector(
  innerWidth / 2,
  innerHeight / 2
)
let gravity = 400
let info = {
  score:0,
  boosters: 9,
  maxBoosters: 9
}
const manager = new Manager()

const renderer = new Renderer2D()
renderer.bindTo("#can")
renderer.setViewport(innerWidth, innerHeight)

const world = new World()
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
manager.registerSystem('magnetizer', new DefaultSystem("magnetizer"))
manager.registerSystem("spawner", powerSpawner)

//powerSpawner.genBox(400)

function endGame(character) {
  let allowed = manager.getEntitiesByTags(["persistent"])
  manager.clear()
  allowed.forEach(e => manager.add(e))
  let start = confirm("Do you want to continue?")
  if (start) return startGame(character)
  manager.clear()
}
function startGame(character) {
  let movable = character.get("movable")
  let transform = character.get("transform")

  renderer.camera.transform.position.set(0, 0)
  
  info.boosters = info.maxBoosters
  info.score = 0
  
  transform.position.copy(startposition)
  transform.orientation.degree = -90
  movable.rotation.degree = 0
  movable.velocity.set(0, 0)

  powerSpawner.reset()
  cameraController.reset()
}

export {
  renderer,
  world,
  manager,
  cameraController,
  input,
  domEvents,
  powerSpawner,
  info,
  endGame,
  startGame
}