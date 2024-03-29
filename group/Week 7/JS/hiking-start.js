//create an array of hikes
const hikeList = [
  {
    name: "Bechler Falls",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    difficulty: "Easy",
    description:
      "Beautiful short hike along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
  },
  {
    name: "Teton Canyon",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    difficulty: "Easy",
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
  },
  {
    name: "Denanda Falls",
    imgSrc: "falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "7 miles",
    difficulty: "Moderate",
    description:
      "Beautiful hike through Bechler meadows river to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
  }
];

const imgBasePath = "//byui-cit.github.io/cit261/examples/";
//on load grab the array and insert it into the page

class Hikes {
  constructor(id, comments) {
    this.container = document.getElementById(id);
    this.comments = comments;
  }

  showHikeList() {
    this.clear()
    this.renderHikeList(hikeList, this.container);
  }

  renderHikeList(hikes, parent) {
    hikes.forEach(hike => {
      parent.appendChild(this.renderOneHike(hike));
    });
    this.comments.renderCommentList();
  }

  renderOneHike(hike) {
    const item = document.createElement("li");

    item.innerHTML = ` <h2>${hike.name}</h2>
          <div class="subzero">
          <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div class="zero">
                  <div class="first">
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                  </div>
                  <div class="second">
                      <h3>Difficulty</h3>
                      <p>${hike.difficulty}</p>
                  </div>
          </div>
          </div>`;
    item.addEventListener("click", () => this.renderHikeDetails(hike))
    return item;
  }

  renderHikeDetails(hike) {
    this.clear()
    const item = document.createElement("li");

    item.innerHTML = ` <h2>${hike.name}</h2>
           <div class="subzero">
          <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div class="zero">
                  <div class="first">
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                  </div>
                  
                  <div class="second">
                      <h3>Difficulty</h3>
                      <p>${hike.difficulty}</p>
                  </div>
                  <div class="third">
                  <h3>Description</h3>
                  <p>${hike.description}</p>
              </div>  
              <div class="fourth">
                <h3>Directions</h3>
                <p>${hike.directions}</p>
              </div>
          </div>
          <div>
          <textarea id="hikecomments"></textarea>
          <button id="addComment">Add Comment</button>
          </div>
          </div>`;
    this.container.appendChild(this.addBackButton());
    this.container.appendChild(item);
    document.getElementById("addComment").addEventListener('click', () => {
      this.comments.addComments(document.getElementById("hikecomments").value, hike.name);
      this.comments.renderCommentList(hike.name);
    })
    this.comments.renderCommentList(hike.name);
  }

  addBackButton() {
    let backButton = document.createElement("button");
    backButton.innerHTML = "Back"
    backButton.addEventListener("click",() => this.showHikeList())
    return backButton
  }

  clear() {
    this.container.innerHTML = "";
  }
}
export default Hikes;