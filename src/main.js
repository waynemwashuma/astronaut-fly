import {
  Manager,
  Renderer2D,
  World,
  Input,
  EventDispatcher,
  Vector,
  Signal
} from "./chaos.module.js"
import {
  CamFollowerController,
  DefaultSystem,
  PowerUpSpawner
} from "./system/index.js"

export const startposition = new Vector(
  0,
  0
)
export const info = Object.freeze({
  score: new Signal(0),
  booster: new Signal(0),
  maxBoosters: 20,
  gravity: 400,
})
export const ingame = new Signal(false)

export const manager = new Manager()
export const renderer = new Renderer2D()
export const world = new World()
export const domEvents = new EventDispatcher()
export const input = new Input(domEvents)
export const cameraController = new CamFollowerController(renderer.camera)
export const powerSpawner = new PowerUpSpawner()
const GAME_ASPECT = 9 / 16
const MAX_GAME_WIDTH = 430
const MAX_GAME_HEIGHT = 860

function getViewportSize() {
  const maxWidth = Math.min(window.innerWidth, MAX_GAME_WIDTH)
  const maxHeight = Math.min(window.innerHeight, MAX_GAME_HEIGHT)
  const width = Math.max(240, Math.floor(Math.min(maxWidth, maxHeight * GAME_ASPECT)))
  const height = Math.max(426, Math.floor(width / GAME_ASPECT))
  return { width, height }
}

world.gravity = 400
world.angularDamping = 0.001

renderer.bindTo("#can")
export function resizeGameViewport() {
  const { width, height } = getViewportSize()
  renderer.setViewport(width, height)
  startposition.set(width / 2, height / 2)
  cameraController.setOffset(0, -height / 2)
  cameraController.setViewportHeight(height)
  cameraController.reset()
  powerSpawner.configureViewport(width, height)
}
resizeGameViewport()

manager.registerSystem("renderer", renderer)
manager.registerSystem("world", world)
manager.registerSystem("input", input)
manager.registerSystem("cam", cameraController)
manager.registerSystem('wrap', new DefaultSystem("wrap"))
manager.registerSystem('follow', new DefaultSystem("follow"))
manager.registerSystem('magnetizer', new DefaultSystem("magnetizer"))
manager.registerSystem('sky', new DefaultSystem("sky"))
manager.registerSystem("spawner", powerSpawner)
manager.pause()

export function endGame() {
  let character = manager.getEntityByTags(["character"])
  ingame.value = false
  manager.pause()

}

export function startGame() {
  let allowed = manager.getEntitiesByTags(["persistent"])
  let character = manager.getEntityByTags(["character"])
  if(character == void 0)throw 'Game entities not added yet'
  let movable = character.get("movable")
  let transform = character.get("transform")

  transform.position.copy(startposition)

  manager.clear()
  allowed.forEach(e => manager.add(e))
  renderer.camera.transform.position.set(0, 0)
  //console.log(manager.objects.length)
  info.booster.value = info.maxBoosters
  info.score.value = 0

  transform.position.copy(startposition)
  transform.orientation.degree = -90
  movable.rotation.degree = 0
  movable.velocity.set(0, 0)

  powerSpawner.reset()
  cameraController.reset()
  ingame.value = true
  manager.play()
}
