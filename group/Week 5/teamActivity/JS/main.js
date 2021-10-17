import Hikes from "./hiking-start.js"

window.addEventListener("load", () => {
    let hikes = new Hikes("hikes")
    hikes.showHikeList()
  });