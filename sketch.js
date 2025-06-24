let cesped = [];
let separacion = 12;
let interactX = -1000; // fuera de pantalla inicialmente
let interactY = -1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  crearCesped();
}

function draw() {
  dibujarFondo();

  for (let b of cesped) {
    b.mover(interactX, interactY);
    b.dibujar();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  crearCesped();
}

function crearCesped() {
  cesped = [];
  for (let x = 0; x < width; x += separacion) {
    for (let y = 0; y < height; y += separacion) {  // TODO el alto para que no quede franja
      cesped.push(new Brizna(x, y));
    }
  }
}

function dibujarFondo() {
  noFill();
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(192, 235, 192), color(162, 210, 162), y / height);
    stroke(c);
    line(0, y, width, y);
  }
}

// Manejamos interacción para mouse y touch
function mouseMoved() {
  interactX = mouseX;
  interactY = mouseY;
}
function mouseDragged() {
  interactX = mouseX;
  interactY = mouseY;
}
function touchMoved() {
  interactX = touches[0].x;
  interactY = touches[0].y;
  return false; // para prevenir scrolling en móvil
}
function touchStarted() {
  interactX = touches[0].x;
  interactY = touches[0].y;
  return false;
}

class Brizna {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = random(20, 42);
    this.inclinacion = 0;
    this.angulo = random(TWO_PI);
    let tonoVerde = random(100, 180);
    this.color = color(40, tonoVerde, 70, 180);
  }

  mover(mx, my) {
    this.angulo += 0.02;
    let viento = sin(this.angulo) * 1.3;

    let d = dist(this.x, this.y, mx, my);
    let efecto = (d < 140) ? map(d, 0, 140, 4, 0) : 0;

    this.inclinacion = viento + efecto;
  }

  dibujar() {
    stroke(this.color);
    strokeWeight(1.1);
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
