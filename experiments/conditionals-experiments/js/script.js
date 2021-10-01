let circle = {
  x: 250,
  y: 25,
  size: 100,
  speed: 0,
};

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  circle.x = circle.x + circle.speed;
  ellipse(circle.x, circle.y, circle.size);
}
// >, <, >=, <=, ===, !==
