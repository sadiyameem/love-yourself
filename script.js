let confetti;

function startLove() {
    const start = document.getElementById("heart");

    audio.volume = 0.9;
    audio.play();
    heart.classList.add("pulse");

    if (confetti) confetti.clear();

    confetti = new ConfettiGenerator({
        target: "confetti-canvas",
        max: 100,
        size: 1.2,
        animate: true,
        props: ["circle","square","triangle"],
        colors: [
            [255,107,129],
            [255,195,113],
            [255,255,255]
        ]
    });

    confetti.render();

    setTimeout(() => confetti.clear(), 6000);
}

const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
const audio = document.getElementById("heartSound");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let current = Math.random() * 360;
let bgColor = 'black';
let clicked = false;

class Particle {
    constructor(x,y,targetX,targetY,hue) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.size = Math.random() * 3 + 1;
        this.color = `hsla(${hue}, 100%, 65%, 0.8)`;
        this.speed = 0.05;
        this.alpha = 1;
    }

    update() {
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
    }
}

function getHeartPoint(t) {
    let x = 16 * Math.pow(Math.sin(t),3);
    let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4*t));
    return {x:x*15, y:y*15};
}

window.addEventListener('mousedown', (e) => {
    clicked = true;
    particles = [];
    audio.currentTime = 0;
    audio.play();
    current = (current + 60) % 360;
    bgColor = `hsla(${current}, 30%, 10%, 1)`;

    for (let i = 0; i < Math.PI * 2; i += 0.1) {
        let p = getHeartPoint(i);
        particles.push(new Particle(e.clientX, e.clientY, e.clientX + p.x, e.clientY + p.y, current));
    }
});

function animate() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillRect(0,0,canvas.width,canvas.height);

    particles.forEach((p,index) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(index, 1);
    });

    if (particles.length === 0 && clicked) {
        audio.pause();
        audio.currentTime = 0;
        clicked = false;
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});