let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let pI = Math.PI / 180;

var ctx = canvas.getContext('2d');

///////////////////////////////////////////////////////////////////////////////
// let true_flase = false;
// let array = ["#34495e", "#e74c3c", '#2ecc71', '#9b59b6', '#f1c40f', '#1abc9c'];

// canvas.onmousedown = function (e) {
//     true_flase = true;
// }
// canvas.onmouseup = function (e) {
//     true_flase = false;
// }

// let x = [];
// let y = [];
// let dx = [];
// let dy = [];
// let color = [];
// let size = [];
// let count;
// let opacity = [];
// let color_pattern = ["#34495e", "#e74c3c", '#2ecc71', '#9b59b6', '#f1c40f', '#1abc9c'];
// let r = [];
// let size_event;
// let size_min = [];
// let pos;
// resize()
// function resize() {
//     if (window.innerWidth < 900) {
//         count = 150;
//         size_event = 30;
//         pos = 80;
//     } else {
//         count = 500;
//         size_event = 50;
//         pos = 120;
//     }
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }
// window.addEventListener('resize', resize, false);

// for (let i = 0; i < count; i++) {
//     size_min[i] = (Math.random() * (5 - 1)) + 1;
//     size[i] = size_min[i];
// x[i] = Math.random() * (innerWidth - size[i] * 2) + size[i];
// y[i] = Math.random() * (innerHeight - size[i] * 2) + size[i];
//     dx[i] = (Math.random() - 0.5) * 2;
//     dy[i] = (Math.random() - 0.5) * 2;
//     color[i] = color_pattern[Math.floor(Math.random() * 5)]
//     r[i] = 10.1;
//     opacity[i] = .3;
// }

// let mouseX;
// let mouseY;
// canvas.onmousemove = function (event) {
//     mouseX = event.pageX;
//     mouseY = event.pageY;
// }

// canvas.ontouchend = function () {
//     if (window.innerWidth < 900) {
//         document.body.requestFullscreen();
//     }
// }

// canvas.ontouchmove = function (event) {
//     mouseX = event.touches[0].pageX;
//     mouseY = event.touches[0].pageY;
// }

// function new_circle() {

//     for (let i = 0; i < count; i++) {
//         if (x[i] + size[i] > innerWidth || x[i] - size[i] < 0) {
//             dx[i] = -dx[i];
//         }

//         if (y[i] + size[i] > innerHeight || y[i] - size[i] < 0) {
//             dy[i] = -dy[i];
//         }


//         ctx.beginPath();
//         ctx.arc(x[i], y[i], size[i], 0, Math.PI * 2, false);
//         ctx.fillStyle = color[i];
//         ctx.globalAlpha = opacity[i];
//         ctx.fill()
//         x[i] += dx[i];
//         y[i] += dy[i];

//         for (let i = 0; i < count; i++) {
//             if (mouseX > x[i] - pos && mouseX < x[i] + pos && mouseY > y[i] - pos && mouseY < y[i] + pos) {
//                 if (size[i] < size_event) {
//                     r[i] = r[i] + .001 + .001;
//                     size[i] = r[i];
//                     opacity[i] = .8;
//                 }
//             } else {
//                 if (size[i] > size_min[i]) {
//                     r[i] = r[i] - .001 - .001;
//                     size[i] = r[i];
//                     opacity[i] = .3;
//                 }
//             }
//         }
//     }
// }

// setInterval(() => {
//     ctx.clearRect(0, 0, innerWidth, innerHeight);
//     new_circle()
// }, 0);

let x = [];
let y = [];
let dx = [];
let dy = [];
let color = [];
let size = [];
let count = 100;
let opacity = [];
let color_pattern = ["#34495e", "#e74c3c", '#2ecc71', '#9b59b6', '#f1c40f', '#1abc9c'];
let r = [];
let size_event;
let size_min = [];
let pos;
var grd = [];
let effect = [];
let effect_r = [];
let rain = document.getElementById('rain');

document.body.onload = function () {
    document.getElementById('rain').play();
    document.getElementById('rain').muted = false;
}


for (let i = 0; i < count; i++) {
    x[i] = Math.random() * (window.innerWidth - 0) + 0;
    y[i] = -Math.random() * ((window.innerHeight * 8) - 0) + 0;
    dx[i] = (Math.random() - 0) * 2;
    dy[i] = (Math.random() + 1) * 3;
    opacity[i] = .3;
    effect_r[i] = .5;

    grd[i] = ctx.createLinearGradient(0, 0, 0, 20);
    grd[i].addColorStop(0, "#ffffff38");
    grd[i].addColorStop(1, "white");
    color[i] = grd[i];
}

rain.play()
let h = window.innerHeight;
function new_rain() {

    for (let i = 0; i < count; i++) {

        ctx.globalAlpha = opacity[i];
        grd[i] = ctx.createLinearGradient(0, y[i], 0, y[i] + 20);
        grd[i].addColorStop(0, "#ffffff38");
        grd[i].addColorStop(1, "white");
        ctx.fillStyle = color[i];
        ctx.beginPath();
        ctx.rect(x[i], y[i], 2, 20)
        ctx.fill()
        y[i] += dy[i]

        if (y[i] > window.innerHeight - 100) {
            if (effect_r[i] < 20) {
                ctx.beginPath()
                ctx.strokeStyle = 'white';
                ctx.lineWidth = .7;
                effect_r[i] = effect_r[i] + .1;
                ctx.ellipse(x[i], window.innerHeight - 100 + 20, effect_r[i] / 3.5, effect_r[i] + effect_r[i] + effect_r[i], -90 * pI, 0, 360 * pI, false)
                ctx.stroke();
                color[i] = '#20202000';
            } else {
                color[i] = grd[i];
                effect_r[i] = .1;
                dy[i] = (Math.random() + 1) * 3;
                y[i] = -Math.random() * ((window.innerHeight * 4) - 0) + 0;
            }
        }
    }
}
canvas.style.background = grd;
setInterval(() => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    new_rain()
}, 0);

let array_br2 = ['linear-gradient(179deg, #91b6e5, rgb(17, 17, 25))', 'linear-gradient(179deg, rgb(179 179 179), rgb(17, 17, 25))', 'linear-gradient(179deg, #c17b7b, rgb(17, 17, 25))']
setInterval(() => {
    let random = Math.floor(Math.random() * 3);

    canvas.style.backgroundImage = array_br2[random];
    setTimeout(() => {
        canvas.style.backgroundImage = 'linear-gradient(182deg, #4c545e, #111119)';
    }, 100);

}, 2000);