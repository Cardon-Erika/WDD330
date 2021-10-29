import Hikes from "./hiking-start.js"
import CommentModel from "./comment.js"


window.addEventListener("load", () => {
    let hikes = new Hikes("hikes", new CommentModel("comments", "hike"));
    hikes.showHikeList();
  });
