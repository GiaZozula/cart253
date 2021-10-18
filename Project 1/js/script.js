/**
~~ changed concept ~~
By Gia <3

+ attribution of code from Mads' source, my addition of controls,
then Pippin's adaptation of this idea
*/
let tempFont;

let stars = [];

let star = {
  x: 700,
  y: 400,
  fill: 255,
  size: 3,
};

let centerPoint = {
  x: 700,
  y: 400,
};

let planet = {
  // The centre
  x: 700,
  y: 400,
  // How far out from the center our thing rotates
  radius: 350,
  // How big is it
  size: 100,
  // What is the current rotation around the circle?
  rotation: 0,
  // How fast is it rotating
  rotationSpeed: 0.0,
  // How fast can it accelerate?
  rotationAcceleration: 0.001,
  // Maximum rotation speed
  maxRotationSpeed: 0.01,
};

let moon = {
  //starts on the planet
  x: planet.x,
  y: planet.y,
  radius: planet.radius,
  //how big is it?
  size: 50,
  //rotates at the same speed as the planet
  rotation: planet.rotation,
  //speed of the moon when shot
  speed: 5,
};

let moonRate = 0;

function setup() {
  createCanvas(1400, 800);
  // noCursor();
}

function draw() {
  background(0);

  drawStarfield();

  handleOutwardDirection();

  handleDirection();

  drawTrack();

  drawPlanet();

  drawMoon();

  // Rotate according to the current speed
  planet.rotation += planet.rotationSpeed;
}

function drawStarfield() {
  //building a for loop (based off of the arrays course material) for the stars
  for (let i = 0; i < 2; i++) {
    drawStar(stars[i]);
  }
}

//draw a single star
function drawStar() {
  push();
  noStroke();
  fill(star.fill);
  ellipse(random(0, width), random(0, height), star.size);
  pop();
}

/**
Draws the track our planet moves on
*/
function drawTrack() {
  push();
  stroke(255);
  noFill();
  translate(planet.x, planet.y);
  ellipse(0, 0, planet.radius * 2);
  pop();
}

//trying to draw multiple planets

/**
Draws our rotating object
*/
function drawPlanet() {
  push();
  noStroke();
  fill(255, 0, 0);
  // Translate to the center of rotation
  translate(planet.x, planet.y);
  // Rotate our object by its current rotation
  rotate(planet.rotation);
  // Now translate by the radius so we can draw it on the edge
  // of the circle
  translate(planet.radius, 0);
  // Finally draw the planet (at 0,0 because we translated the origin)
  ellipse(0, 0, planet.size);
  pop();
}

function drawMoon() {
  push();
  noStroke();
  fill(0, 0, 255);
  //translate to planet's position
  translate(moon.x, moon.y);
  //have it follow the planet when not moved
  rotate(planet.rotation);
  //Translate by the radius so its drawn on the edge of the circle
  translate(moon.radius, 0);
  //draw the moon at 0,0 because it has been translated
  ellipse(moon.x, 0, moon.size);
  scale(0.5);
  fill(0, 255, 0);
  ellipse(moon.x, 0, moon.size);
  pop();

  push();
  moon.x = sin(moonRate) * 60;
  moonRate += 0.02;
  pop();
}

function drawStars() {
  push();
  noStroke();
  fill(255);
  translate(planet.x, planet.y);
  ellipse(0, 0, star.size);
  pop();
}

//use the up arrow to shoot
function handleOutwardDirection() {
  if (keyIsDown(UP_ARROW)) {
    push();
    translate(centerPoint.x, centerPoint.y);
    moon.x = moon.x + moon.speed;
    moon.y = moon.y + moon.speed;
    pop();
  } else if (keyIsDown(DOWN_ARROW)) {
    push();
    translate(centerPoint.x, centerPoint.y);
    moon.x = moon.x - moon.speed;
    moon.y = moon.y - moon.speed;
    pop();
  }
}

/**
Change the rotation speed based on arrow keys
*/
function handleDirection() {
  if (keyIsDown(LEFT_ARROW)) {
    // Left means accelerate in the negative
    planet.rotationSpeed -= planet.rotationAcceleration;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // Right means accelerate in the positive
    planet.rotationSpeed += planet.rotationAcceleration;
  } else {
    planet.rotationSpeed = 0.003;
  }

  planet.rotationSpeed = constrain(
    planet.rotationSpeed,
    -planet.maxRotationSpeed,
    planet.maxRotationSpeed
  );
}
