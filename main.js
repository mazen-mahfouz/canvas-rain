let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let pI = Math.PI / 180;

var ctx = canvas.getContext('2d');

///////////////////////////////////////////////////////////////////////////////
let true_flase = false;
let array = ["#34495e", "#e74c3c", '#2ecc71', '#9b59b6', '#f1c40f', '#1abc9c'];

canvas.onmousedown = function (e) {
    true_flase = true;
}
canvas.onmouseup = function (e) {
    true_flase = false;
}

let x = [];
let y = [];
let dx = [];
let dy = [];
let color = [];
let size = [];
let count;
let opacity = [];
let color_pattern = ["#34495e", "#e74c3c", '#2ecc71', '#9b59b6', '#f1c40f', '#1abc9c'];
let r = [];
let size_event;
let size_min = [];
let pos;
resize()
function resize() {
    if (window.innerWidth < 900) {
        count = 150;
        size_event = 30;
        pos = 80;
    } else {
        count = 500;
        size_event = 50;
        pos = 120;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize, false);

for (let i = 0; i < count; i++) {
    size_min[i] = (Math.random() * (5 - 1)) + 1;
    size[i] = size_min[i];
    x[i] = Math.random() * (innerWidth - size[i] * 2) + size[i];
    y[i] = Math.random() * (innerHeight - size[i] * 2) + size[i];
    dx[i] = (Math.random() - 0.5) * 2;
    dy[i] = (Math.random() - 0.5) * 2;
    color[i] = color_pattern[Math.floor(Math.random() * 5)]
    r[i] = 10.1;
    opacity[i] = .3;
}

let mouseX;
let mouseY;
canvas.onmousemove = function (event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
}

canvas.ontouchend = function () {
    if (window.innerWidth < 900) {
        document.body.requestFullscreen();
    }
}

canvas.ontouchmove = function (event) {
    mouseX = event.touches[0].pageX;
    mouseY = event.touches[0].pageY;
}

function new_circle() {

    for (let i = 0; i < count; i++) {
        if (x[i] + size[i] > innerWidth || x[i] - size[i] < 0) {
            dx[i] = -dx[i];
        }

        if (y[i] + size[i] > innerHeight || y[i] - size[i] < 0) {
            dy[i] = -dy[i];
        }


        ctx.beginPath();
        ctx.arc(x[i], y[i], size[i], 0, Math.PI * 2, false);
        ctx.fillStyle = color[i];
        ctx.globalAlpha = opacity[i];
        ctx.fill()
        x[i] += dx[i];
        y[i] += dy[i];

        for (let i = 0; i < count; i++) {
            if (mouseX > x[i] - pos && mouseX < x[i] + pos && mouseY > y[i] - pos && mouseY < y[i] + pos) {
                if (size[i] < size_event) {
                    r[i] = r[i] + .001 + .001;
                    size[i] = r[i];
                    opacity[i] = .8;
                }
            } else {
                if (size[i] > size_min[i]) {
                    r[i] = r[i] - .001 - .001;
                    size[i] = r[i];
                    opacity[i] = .3;
                }
            }
        }
    }
}

setInterval(() => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    new_circle()
}, 0);
