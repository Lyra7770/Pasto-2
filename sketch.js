let cesped = [];
let separacion = 10;
let interactX = -1000;
let interactY = -1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(displayDensity()); // máxima calidad según pantalla
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
    let c = lerpColor(color(192, 235, 192), color(162, 210, 162), y / height);
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

// Clase Brizna mejorada
class Brizna {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.altura = random(30, 55);
    this.angulo = random(TWO_PI);
    this.oscilacion = random(0.005, 0.015);
    this.grosor = random(0.9, 1.4);
    let tonoVerde = random(100, 180);
    this.color = color(40, tonoVerde, 70, 200);
    this.inclinacion = 0;
  }

  mover(mx, my) {
    this.angulo += this.oscilacion;
    let viento = sin(this.angulo) * 1.8;

    let d = dist(this.x, this.y, mx, my);
    let efecto = (d < 120) ? map(d, 0, 120, 10, 0) : 0;

    this.inclinacion = viento + efecto;
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
