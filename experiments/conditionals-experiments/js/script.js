let backgroundShade = 0;
let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 5,
};

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(backgroundShade);

  circle.x += circle.speed;

  if (circle.x > width) {
    circle.speed = -circle.speed;
  }

  if (circle.x < 0) {
    circle.speed = -circle.speed;
  }

  fill(255, 255, 255);

  if (!(circle.x < width / 3)) {
    fill(255, 0, 0);
  }

  ellipse(circle.x, circle.y, circle.size);
}

// >, <, >=, <=, ===, !==
