import { info } from "../main.js"


let parent = document.getElementById("ui-score")

export function setScoreCount(signal) {
  let initial = signal.value

  parent.innerHTML = signal.value
  

}
info.score.addListener(setScoreCount)