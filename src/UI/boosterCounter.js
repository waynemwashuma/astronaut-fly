import { info } from "../main.js"


let parent = document.getElementById("ui-booster")
const maxBoosters = Math.max(1, Math.floor(info.maxBoosters || 20))
parent.style.setProperty("--booster-max", String(maxBoosters))

export function setBoosterCount(signal) {
  const count = Math.max(0, Math.min(maxBoosters, Math.floor(signal.value)))
  parent.style.setProperty("--booster-count", String(count))
  parent.setAttribute("data-count", `${count}/${maxBoosters}`)
}
info.booster.addListener(setBoosterCount)
