import { startGame, ingame } from "../main.js"

const parent = document.getElementById("play-alert")
const yes = document.getElementById("alert-yes")
const no = document.getElementById("alert-no")

no.onclick = () => {
  location.assign("./index.html")
}

yes.onclick = () => {
  startGame()
}

export function setPopup(signal) {
  if (signal.value) {
    parent.style.display = "none"
  } else {
    parent.style.display = "flex"
  }
}

ingame.addListener(setPopup)
