let cesped = [];
let separacion = 10;
let interactX = -1000;
let interactY = -1000;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pixelDensity(displayDensity());
  crearCesped();
}

function draw() {
  dibujarFondo();

  for (let b of cesped) {
    b.mover(interactX, interactY);
    b.dibujar();
  }

  // El efecto de interacción se desvanece lentamente
  interactX = lerp(interactX, -1000, 0.03);
  interactY = lerp(interactY, -1000, 0.03);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  crearCesped();
}

function crearCesped() {
  cesped = [];
  let alturaCesped = 110;
  for (let x = 0; x < width; x += separacion) {
    for (let y = height - alturaCesped; y < height; y += separacion) {
      cesped.push(new Brizna(x, y));
    }
  }
}

function dibujarFondo() {
  noFill();
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(200, 245, 200), color(160, 210, 160), y / height);
    stroke(c);
    line(0, y, width, y);
  }
}

function mouseMoved() {
  interactX = mouseX;
  interactY = mouseY;
}

function mouseDragged() {
  interactX = mouseX;
  interactY = mouseY;
}

function mousePressed() {
  interactX = mouseX;
  interactY = mouseY;
}

function touchMoved() {
  if (touches.length > 0) {
    interactX = touches[0].x;
    interactY = touches[0].y;
  }
  return false;
}

function touchStarted() {
  if (touches.length > 0) {
    interactX = touches[0].x;
    interactY = touches[0].y;
  }
  return false;
}

// Clase para cada brizna de pasto
class Brizna {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = random(30, 55);
    this.angulo = random(TWO_PI);
    this.oscilacion = random(0.004, 0.01);
    this.grosor = random(1, 1.5);
    let tonoVerde = random(90, 180);
    this.color = color(40, tonoVerde, 60, 220);
    this.inclinacion = 0;
  }

  mover(mx, my) {
    this.angulo += this.oscilacion;
    let brisa = sin(this.angulo) * 2;

    let d = dist(this.x, this.y, mx, my);
    let efecto = (d < 140) ? map(d, 0, 140, 20, 0) : 0;

    this.inclinacion = brisa + efecto;
  }

  dibujar() {
    stroke(this.color);
    strokeWeight(this.grosor);
    noFill();

    let x1 = this.x;
    let y1 = this.y;
    let x2 = x1 + this.inclinacion * 0.3;
    let y2 = y1 - this.altura * 0.3;
    let x3 = x1 + this.inclinacion * 0.7;
    let y3 = y1 - this.altura * 0.7;
    let x4 = x1 + this.inclinacion;
    let y4 = y1 - this.altura;

    bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  }
}

// Botón para activar pantalla completa manualmente
document.getElementById("fullscreenBtn").addEventListener("click", () => {
  let fs = fullscreen();
  fullscreen(!fs);
});
