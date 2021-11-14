// Get and display screen information
function screenInformation() {
    const height = window.screen.height;
    const width = window.screen.width;

    const h4 = document.createElement('h4');

    const screenInfo = `Your screen is ${width}px wide and ${height}px high.`

    h4.innerText = screenInfo;
    document.getElementById("screen-information").
    appendChild(h4);
}

document.getElementById('retrieve_screen_info').addEventListener('click', screenInformation);

//Spin with setInterval
const squareElement1 = document.getElementById('square1');
let angle = 0;

setInterval(() => {
    angle = (angle + 2) % 360;
    squareElement1.style.transform = `rotate(${angle}deg)`
}, 1000 / 60);

// Spin with rotate
const squareElement2 = document.getElementById('square2');

function rotate() {
    angle = (angle + 2) % 360;
    squareElement2.style.transform = `rotate(${angle}deg)`
    window.requestAnimationFrame(rotate);
}

const id = requestAnimationFrame(rotate);

// Change background color
const btn = document.getElementById("rainbow");
const rainbow = ["red", "orange", "yellow", "green", "blue", "rebeccapurple", "violet"];

function change() {
    document.body.style.background = rainbow[Math.floor(7 * Math.random())];
}
btn.addEventListener('click', change);

// Factorize number
const form1 = document.forms[0];
form1.addEventListener('submit', factorize, false);

function factorize(event) {
    //prevent the form from being submitted
    event.preventDefault;

    // const number = Number(form1.number.value);
    // document.getElementById('factor_output').innerText = factorsOf(number);
    
    const number = Number(form1.number.value);
    const outputDiv = document.getElementById('factor_output')
    const p = document.createElement('p');
    p.innerHTML = factorsOf(number);
    outputDiv.appendChild(p);
}

function factorsOf(n) {
    if (Number.isNaN(Number(n))) {
        throw new RangeError('Argument Error: Value must be an integer');
    }
    if (n < 0) {
        throw new RangeError('Argument Error: Number must be positive');
    }
    if (!Number.isInteger(n)) {
        throw new RangeError('Argument Error: Number must be an integer');
    }
    const factors = [];
    for (let i = 1, max = Math.sqrt(n); i <= max; i++) {
        if (n % i === 0) {
            factors.push(i, n / i);
        }
    }
    return factors.sort((a, b) => a - b);
};

// Websocket
const URL = 'wss://echo.websocket.org/';
const outputDiv = document.getElementById('message_output');
const form2 = document.forms[1];
const connection = new WebSocket(URL);

connection.addEventListener('open', () => {
    output('CONNECTED');
}, false);

function output(message) {
    const para = document.createElement('p');
    para.innerHTML = message;
    outputDiv.appendChild(para);
}

function message(event) {
    event.preventDefault;

    const text = form2.message.value;
    output(`SENT: ${text}`);
    connection.send(text);
}

form2.addEventListener('submit', message, false);

connection.addEventListener('message', (event) => {
    output(`RESPONSE: ${event.data}`);
}, false);

connection.addEventListener('close', () => {
    output(`DISCONNECTED`);
}, false);

connection.addEventListener('error', (event) => {
    output(`<span style='color: red;'>ERROR: ${event.data}</span>`);
}, false);