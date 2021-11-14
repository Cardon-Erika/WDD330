const dict = document.querySelectorAll("div[data-key]"); // any div with data-key
console.log(dict);

document.addEventListener('keyup', event => {
  // console.log(event.keyCode);
  const keyCodes = [...dict].map(item => parseInt(item.dataset.key));
  console.log(keyCodes);
  if (keyCodes.includes(event.keyCode)) {
    console.log(event.keyCode + ' Let there be sound');
    let audio = document.querySelector(`audio[data-key='${event.keyCode}']`);
    audio.currentTime = 0;
    audio.play(); // video also has play method
    console.dir(audio);
    let label = document.querySelector(`div[data-key='${event.keyCode}']`);
    console.log(label);
    label.setAttribute('class','key playing');
    audio.addEventListener('ended', e => {
      label.setAttribute('class','key');
    })
    //console.log(label.style);
    const style = window.getComputedStyle(label);
    const matrix = style['transform'];
    let matrixValue = parseInt(matrix.match(/matrix.*\((.+)\)/)[1].split(', ')[5]);
    console.log(matrixValue);
    if (matrixValue <= 100) {
      matrixValue += 10;
    }
    else {
      matrixValue = 0;
    }

    label.style.transform = `translateY(${matrixValue}px)`;
  };
})
