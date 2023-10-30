const canvas = document.getElementById('canva');
const ctx = canvas.getContext('2d');
const particles = [];
let hue=0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
};
canvas.addEventListener('click', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i=0;i<500;i++)
    particles.push(new Particle()); // Create a new particle when clicked.
});


canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i=0;i<10;i++)
    particles.push(new Particle()); // Create a new particle when clicked.
});

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 7 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color='hsl(' + hue +',100%,50%)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.4) this.size -= 0.025;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handle() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      
       
        if (particles[i].size <= 0.3) {
            particles.splice(i, 1);
            i--;
         }
    }
}

function animate() {
    ctx.fillStyle='rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
 
    handle();
    hue+=2;
    requestAnimationFrame(animate);
}
animate();
