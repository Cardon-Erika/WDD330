function startRace() {
    document.getElementsByClassName('race')[0].classList.add('race_on');
}

function addActive(clicked_id) {
    const item = document.getElementById(clicked_id);
    item.classList.add('active');
}

function returnAnswers() {
    document.getElementById('returnAnswers').classList.toggle("display");

    document.getElementById('returnAnswers').children[0].textContent = 'Hide The Correct Answers';
}

// function drawImageToCanvas() {
//     var canvas = document.getElementById("canvasDemo");
//     var context = canvas.getContext("2d");
//     var image = document.getElementById("myImage");
//     context.drawImage(image, 0, 0);
// }

function manipulateImage() {
    var canvas = document.getElementById("canvasDemo");
    var context = canvas.getContext("2d");
    var image = document.getElementById("myImage");
    context.drawImage(image, 0, 0);

    var imageData = context.getImageData(0, 0, 300, 300);

    var red, green, blue, grayscale;

    for (var i = 0; i < imageData.data.length; i += 4) {
        red = imageData.data[i];
        green = imageData.data[i + 1];
        blue = imageData.data[i + 2];

        grayscale = red * 0.3 + green * 0.59 + blue * 0.11;

        imageData.data[i] = grayscale;
        imageData.data[i + 1] = grayscale;
        imageData.data[i + 2] = grayscale;
    }
    context.putImageData(imageData, 0, 0);
}

const dragIceCream = document.querySelectorAll("#drag img");
dragIceCream.forEach(el => {
    el.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData("text", event.target.id);
    })
    el.addEventListener('touchstart', function (event) {
        event.dataTransfer.setData("text", event.target.id);
    })
})

const matchIceCream = document.querySelectorAll("#stationary img");
matchIceCream.forEach(el => {
    el.addEventListener('dragover', function (event) {
        event.preventDefault();
    });
    el.addEventListener('drop', function (event) {
        var originalId = event.dataTransfer.getData("text");
        var matchId = el.id;
        console.log(originalId);
        console.log(matchId);
        if (originalId == 'iceCream10' && matchId == 'iceCream1') {
            event.target.appendChild(document.getElementById(originalId));
        } else if (originalId == 'iceCream9' && matchId == 'iceCream2') {
            event.target.appendChild(document.getElementById(originalId));
        } else if (originalId == 'iceCream8' && matchId == 'iceCream5') {
            event.target.appendChild(document.getElementById(originalId));
        } else if (originalId == 'iceCream7' && matchId == 'iceCream4') {
            event.target.appendChild(document.getElementById(originalId));
        } else if (originalId == 'iceCream6' && matchId == 'iceCream3') {
            event.target.appendChild(document.getElementById(originalId));
        }
    });
    el.addEventListener('touchend', function (event) {
        var originalId = event.dataTransfer.getData("text");
        var matchId = el.id;
        console.log(originalId);
        console.log(matchId);
        if (originalId == 'iceCream10' && matchId == 'iceCream1') {
            event.target.appendChild(document.getElementById(originalId));
        } else if (originalId == 'iceCream9' && matchId == 'iceCream2') {
            event.target.appendChild(document.getElementById(originalId));
        } else if (originalId == 'iceCream8' && matchId == 'iceCream5') {
            event.target.appendChild(document.getElementById(originalId));
        } else if (originalId == 'iceCream7' && matchId == 'iceCream4') {
            event.target.appendChild(document.getElementById(originalId));
        } else if (originalId == 'iceCream6' && matchId == 'iceCream3') {
            event.target.appendChild(document.getElementById(originalId));
        }
    });
});

// var dragIceCream = document.querySelectorAll("#drag img");
// var iceCream = null;
// for (var i = 0; i < dragIceCream.length; i++) {
//     iceCream = dragIceCream[i];
//     iceCream.addEventListener('dragstart', function (event) {
//         event.dataTransfer.setData("text", event.target.id);
//     });
// }

// var matchIceCream = document.querySelectorAll("#stationary img");
// var match = null;
// for (var i = 0; i < matchIceCream.length; i++) {
//     match = matchIceCream[i];
//     match.addEventListener('dragover', function (event) {
//         event.preventDefault();
//     });
//     match.addEventListener('drop', function (event) {
//         var originalId = event.dataTransfer.getData("text");
//         console.log(originalId);
//         // var matchId = document.getElementById.value;
//         console.log(match.id);
//         if(originalId == 'iceCream1' && match.id == 'iceCream10') {
//             event.target.appendChild(document.getElementById(originalId));
//         }
//     });
// }


document.getElementById("start_race").addEventListener('click', startRace);

document.getElementById('returnAnswers').addEventListener('click', returnAnswers)

window.addEventListener("load", manipulateImage, false);