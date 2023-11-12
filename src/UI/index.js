let parent = document.getElementById("ui-booster")

/**
 * @param {HTMLElement} parent
 */
export function setBoosterCount(no) {
  let number = no - parent.children.length

  if (number > 0)
    for (var i = 0; i < no; i++) {
      let el = parent.appendChild(document.createElement("div"))
      el.id = "ui-booster-pack"
    }
  if (number < 0)
    for (var i = 0; i < no; i++) {
      let el = parent.children[0].remove()
    }
}