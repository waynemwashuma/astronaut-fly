import { startGame, ingame } from "../main.js"

let parent = document.getElementById('player-alert')
let yes = document.getElementById("alert-yes")
let no = document.getElementById("alert-no")

no.onclick = e => {
  let parent = document.getElementById('play-alert')
  parent.classList.toggle("hide",true)
}
yes.onclick = e => {
  let parent = document.getElementById('play-alert')
  parent.classList.toggle("hide",true)
  startGame()
}

export function setPopup(signal) {
  if (!signal.value){
    let parent = document.getElementById('play-alert')
  parent.classList.toggle("show")
  parent.classList.toggle("hide")
  }

}

ingame.addListener(setPopup)