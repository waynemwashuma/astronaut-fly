import { startGame, ingame } from "../main.js"

let parent = document.getElementById('player-alert')
let yes = document.getElementById("alert-yes")
let no = document.getElementById("alert-no")

no.onclick = e => {
  location.assign("./index.html")
}
yes.onclick = e => {
  let parent = document.getElementById('play-alert')
  startGame()
}

export function setPopup(signal) {
  const parent = document.getElementById('play-alert')
  if (signal.value) {
    parent.style.display = "none"
  } else {
    parent.style.display = "block"
  }
}

ingame.addListener(setPopup)