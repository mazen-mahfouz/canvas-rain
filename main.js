let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let pI = Math.PI / 180;

var ctx = canvas.getContext('2d');



resize()
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize, false);

let x = [];
let y = [];
let dx = [];
let dy = [];
let color = [];
let size = [];
let count = 50;
let opacity = [];
let color_pattern = ["#34495e", "#e74c3c", '#2ecc71', '#9b59b6', '#f1c40f', '#1abc9c'];
let r = [];
let size_event;
let size_min = [];
let pos;
var grd = [];
let effect = [];
let effect_r = [];
let t_f = true;
let rain = document.getElementById('rain');
let br2 = document.getElementById('br2');

for (let i = 0; i < count; i++) {
    x[i] = Math.random() * (window.innerWidth - 0) + 0;
    y[i] = -Math.random() * ((window.innerHeight * 1) - 0) + 0;
    dx[i] = (Math.random() - 0) * 2;
    dy[i] = (Math.random() + 1) * 3;
    opacity[i] = (Math.random() + .2) * .9;
    effect_r[i] = .5;

    grd[i] = ctx.createLinearGradient(0, y[i], 0, y[i] + 20);
    grd[i].addColorStop(0, "#ffffff38");
    grd[i].addColorStop(1, "white");
    color[i] = grd[i];

}

// rain.play()
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
                effect_r[i] = effect_r[i] + .4;
                ctx.ellipse(x[i], window.innerHeight - 100 + 20, effect_r[i] / 3.5, effect_r[i] + effect_r[i] + effect_r[i], -90 * pI, 0, 360 * pI, false)
                ctx.stroke();
                color[i] = '#20202000';
            } else {
                color[i] = grd[i];
                effect_r[i] = .1;
                dy[i] = (Math.random() + 1) * 3;
                y[i] = -Math.random() * ((window.innerHeight * 1) - 0) + 0;
            }
        }
    }
}

function start() {
    document.getElementById('start').style.display = 'none';
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

    }, 3000);
    rain.play()
    setInterval(fun_br2, 3000)
}

function fun_br2() {
    br2.currentTime = 0;
    br2.play()
}
