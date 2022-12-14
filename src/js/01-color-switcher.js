import '../css/color-switcher.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  colorNumRgb: document.querySelector('.js-color-number-rgb'),
  colorNumHex: document.querySelector('.js-color-number-hex'),
  colorChangeRate: document.querySelector('input'),
  colorChangeRateTime: document.querySelector('.rate-time'),
};

let loopId = null;

refs.startBtn.addEventListener('click', onStartBtnChangeBgColor);
refs.stopBtn.addEventListener('click', onStopBtnChangeBgColor);
refs.colorChangeRate.addEventListener('input', colorChangeSpeed);

function onStartBtnChangeBgColor() {
  changeBgColor();
  btnDisabledOnStart();
  loopId = setTimeout(() => {
    onStartBtnChangeBgColor(), changeBgColor();
  }, colorChangeSpeed());
}

function colorChangeSpeed() {
  refs.colorChangeRateTime.textContent = (
    refs.colorChangeRate.value / 1000
  ).toFixed(1);
  return refs.colorChangeRate.value;
}
function onStopBtnChangeBgColor() {
  clearTimeout(loopId);
  btnDisabledOnStop();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
  showColorNum();
}

function btnDisabledOnStart() {
  refs.startBtn.disabled = 'true';
  refs.stopBtn.removeAttribute('disabled');
}
function btnDisabledOnStop() {
  refs.stopBtn.disabled = 'true';
  refs.startBtn.removeAttribute('disabled');
}

function showColorNum() {
  const bodyColor = document.body.style.backgroundColor;
  refs.colorNumRgb.textContent = `Color RGB: ${bodyColor}`;
  refs.colorNumHex.textContent = `Color HEX: ${rgb2hex(
    bodyColor.slice(4, bodyColor.length - 1)
  )}`;
}

const rgb2hex = color =>
  '#' + color.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``;

// ===========setInterval=======================
// import '../css/color-switcher.css';

// const refs = {
//   startBtn: document.querySelector('[data-start]'),
//   stopBtn: document.querySelector('[data-stop]'),
//   colorNumRgb: document.querySelector('.js-color-number-rgb'),
//   colorNumHex: document.querySelector('.js-color-number-hex'),
// };

// refs.startBtn.addEventListener('click', onStartBtnChangeBgColor);
// refs.stopBtn.addEventListener('click', onStopBtnChangeBgColor);

// const CHANGE_COLOR_INTERVAL = 1000;

// let intervalId = null;
// refs.colorNumRgb.textContent = 'Press start';
// refs.colorNumHex.textContent = 'to see colors';

// function onStartBtnChangeBgColor() {
//   changeBgColor();
//   btnDisabledOnStart();

//   intervalId = setInterval(changeBgColor, CHANGE_COLOR_INTERVAL);
// }

// function onStopBtnChangeBgColor() {
//   clearInterval(intervalId);
//   btnDisabledOnStop();
// }

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }

// function changeBgColor() {
//   document.body.style.backgroundColor = getRandomHexColor();
//   showColorNum();
// }

// function btnDisabledOnStart() {
//   refs.startBtn.disabled = 'true';
//   refs.stopBtn.removeAttribute('disabled');
// }
// function btnDisabledOnStop() {
//   refs.stopBtn.disabled = 'true';
//   refs.startBtn.removeAttribute('disabled');
// }

// function showColorNum() {
//   refs.colorNumRgb.textContent = `Color RGB: ${document.body.style.backgroundColor}`;
//   refs.colorNumHex.textContent = `Color HEX: ${rgb2hex(
//     document.body.style.backgroundColor.slice(
//       4,
//       document.body.style.backgroundColor.length - 1
//     )
//   )}`;
// }

// const rgb2hex = color =>
//   '#' + color.match(/\d+/g).map(x => (+x).toString(16).padStart(2, 0)).join``;
