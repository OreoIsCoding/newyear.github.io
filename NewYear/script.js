const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sparks = [];
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  init() {
    const sparkCount = 70; 
    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount;
      const speed = Math.random() * 4 + 2;
      const velocityX = Math.cos(angle) * speed;
      const velocityY = Math.sin(angle) * speed;
      this.sparks.push(new Spark(this.x, this.y, velocityX, velocityY, this.color));
    }
  }

  update() {
    this.sparks.forEach((spark, index) => {
      spark.update();
      if (spark.opacity <= 0) {
        this.sparks.splice(index, 1);
      }
    });
  }

  draw() {
    this.sparks.forEach((spark) => spark.draw());
  }
}

class Spark {
  constructor(x, y, velocityX, velocityY, color) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.life = Math.random() * 50 + 50;
    this.color = color;
    this.opacity = 1;
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.velocityY += 0.05;
    this.opacity -= 0.02;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = `${this.color.slice(0, this.color.length - 1)}, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }
}

function generateFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const firework = new Firework(x, y);
  firework.init();
  fireworks.push(firework);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.03) {
    generateFirework();
  }

  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.sparks.length === 0) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
