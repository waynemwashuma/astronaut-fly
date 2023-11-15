import { info } from "../main.js"


let parent = document.getElementById("ui-booster")

export function setBoosterCount(signal) {
  let initial = signal.value

  parent.innerHTML = ""

  for (let i = 10; i < initial; i += 10) {
    let container = parent.appendChild(document.createElement("div"))
    for (i = 0; i < 10; i++)
      container.appendChild(document.createElement("div"))
    initial -= 10
  }
  let container = parent.appendChild(document.createElement("div"))

  for (let i = 0; i < initial; i++)
    container.appendChild(document.createElement("div"))
}
info.booster.addListener(setBoosterCount)