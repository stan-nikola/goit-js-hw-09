!function(){function t(t){return t&&t.__esModule?t.default:t}var e={};function o(){var r=t(e)([""]);return o=function(){return r},r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){e||(e=t.slice(0));return Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))};var r={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),colorNumRgb:document.querySelector(".js-color-number-rgb"),colorNumHex:document.querySelector(".js-color-number-hex")};r.startBtn.addEventListener("click",(function(){c(),r.startBtn.disabled="true",r.stopBtn.removeAttribute("disabled"),n=setInterval(c,1e3)})),r.stopBtn.addEventListener("click",(function(){clearInterval(n),r.stopBtn.disabled="true",r.startBtn.removeAttribute("disabled")}));var n=null;function c(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),r.colorNumRgb.textContent="Color RGB: ".concat(document.body.style.backgroundColor),r.colorNumHex.textContent="Color HEX: ".concat(u(document.body.style.backgroundColor.slice(4,document.body.style.backgroundColor.length-1)))}r.colorNumRgb.textContent="Press start",r.colorNumHex.textContent="to see colors";var u=function(t){return"#"+t.match(/\d+/g).map((function(t){return(+t).toString(16).padStart(2,0)})).join(o())}}();
//# sourceMappingURL=01-color-switcher.7c3605ea.js.map
