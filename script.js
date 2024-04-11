const canvas = document.getElementById("test");
var ctx = canvas.getContext("2d");

const particleArray = [];
let hue=0;
console.log(ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = "white";
ctx.fillRect(10, 10, 50, 12);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(10, 10, 50, 12);
});

const mouse = {
  x: null,
  y: null,
};

canvas.addEventListener("click", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  // drawcircle();
  for (let i = 0; i < 100; i++) {
    particleArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  // drawcircle();
  for (let i = 0; i < 15; i++) {
    particleArray.push(new Particle());
  }
});

// function drawcircle() {
//   ctx.beginPath();
//   ctx.fillStyle = "blue";
//   ctx.strokeStyle = "purple";
//   ctx.lineWidth = 5;
//   ctx.arc(mouse.x, mouse.y, 50, 0, 2 * Math.PI);
//   ctx.fill();
//   ctx.stroke();
// }

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // drawcircle();
  // ctx.fillStyle = 'rgba(0,0,0,0.01)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticle();
  hue++;
  // if(hue>360){
  //   hue=0;
  // }
  requestAnimationFrame(animate);
}

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    // this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    // this.color = 'white';
    this.color = 'hsl(' + hue + ', 100%, 50%)';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.05;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    // ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
    // ctx.strokeStyle = "purple";
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.stroke();
  }
}

// function init(){
//   for(let i=0;i<1000;i++){
//     particleArray.push(new Particle());
//   }
// }

// init();

function handleParticle() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();  
    for(let j=i;j<particleArray.length;j++){
      const dx = particleArray[i].x - particleArray[j].x;
      const dy = particleArray[i].y - particleArray[j].y;
      const dis = Math.sqrt(dx * dx + dy * dy);
      if(dis<50){
        ctx.beginPath();
        ctx.strokeStyle = particleArray[i].color;
        ctx.lineWidth = particleArray[i].size/8;
        ctx.moveTo(particleArray[i].x,particleArray[i].y);
        ctx.lineTo(particleArray[j].x,particleArray[j].y);
        ctx.stroke();
      }
    }
    if (particleArray[i].size < 0.2) {
      particleArray.splice(i, 1);
      i--;
    }
  }

  
}

animate();
