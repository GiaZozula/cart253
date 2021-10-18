/**
~~ changed concept ~~
By Gia <3

+ attribution of code from Mads' source, my addition of controls,
then Pippin's adaptation of this idea

https://p5js.org/reference/#/p5/drawingContext for
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

let sun = {
  x: 700,
  y: 400,
  size: 200,
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

let planet2 = {
  // The centre
  x: 700,
  y: 400,
  // How far out from the center our thing rotates
  radius: 350,
  // How big is it
  size: 100,
  // What is the current rotation around the circle?
  rotation: 25,
  // How fast is it rotating
  rotationSpeed: 0,
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
let sunRate = 0;
let colourRate = 0;

function setup() {
  createCanvas(1400, 800);
  // noCursor();
}

function draw() {
  background(0);

  drawStarfield();

  handleOutwardDirection();

  handleDirection();

  drawSun();

  drawTrack1();
  drawTrack2();
  drawTrack3();
  // drawTrack4();

  drawPlanet();
  drawPlanet2();

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

//draw sun
function drawSun() {
  //outermost circle
  push();
  noStroke();
  fill(255, 125, 0, 200);
  translate(planet.x, planet.y);
  ellipse(0, 0, 170);
  pop();

  push();
  noStroke();
  fill(255, 185, 0);
  translate(planet.x, planet.y);
  ellipse(0, 0, 150);
  pop();

  push();
  noStroke();
  fill(255, 200, 0);
  translate(planet.x, planet.y);
  ellipse(0, 0, 120);
  pop();

  push();
  noStroke();
  fill(255, 200, 0, 250);
  translate(planet.x, planet.y);
  ellipse(0, 0, 100);
  pop();

  push();
  noStroke();
  fill(255, 250, 0, 150);
  translate(planet.x, planet.y);
  sunRate += 0.0001;
  sun.size = sin(sunRate) * 100;
  ellipse(0, 0, sun.size * 1.4);
  pop();

  push();
  noStroke();
  fill(255, 225, 0, 150);
  translate(planet.x, planet.y);
  sunRate += 0.0001;
  sun.size = sin(sunRate) * 100;
  ellipse(0, 0, sun.size * 1.3);
  pop();

  push();
  noStroke();
  fill(255, 255, 255, 25);
  translate(planet.x, planet.y);
  sunRate += 0.009;
  sun.size = sin(sunRate) * 50 + 75;
  ellipse(0, 0, sun.size * 1.4);
  pop();

  //innermost circle
  push();
  noStroke();
  fill(255, 255, 255);
  translate(planet.x, planet.y);
  sunRate += 0.001;
  sun.size = sin(sunRate) * 50 + 25;
  ellipse(0, 0, sun.size * 1.4);
  pop();
}

//Draws the tracks that the planet moves on

function drawTrack1() {
  push();
  colourRate += 0.009;
  strokeWeight(4);
  stroke(sin(colourRate) * 255, 175, 120);
  noFill();
  translate(planet.x, planet.y);
  ellipse(0, 0, planet.radius * 3);
  pop();
}

function drawTrack2() {
  push();
  colourRate += 0.0005;
  strokeWeight(2);
  stroke(sin(colourRate) * 255, 175, 120);
  noFill();
  translate(planet.x, planet.y);
  ellipse(0, 0, planet.radius * 2);
  pop();
}

function drawTrack3() {
  push();
  colourRate += 0.0009;
  stroke(sin(colourRate) * 255, 175, 120);
  noFill();
  translate(planet.x, planet.y);
  ellipse(0, 0, planet.radius);
  pop();
}

// drawing planets
function drawPlanet() {
  //mauve planet on center ring
  push();
  noStroke();
  fill(220, 100, 100);
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

  //planet on inner ring
  push();
  noStroke();
  fill(20, 125, 200);
  // Translate to the center of rotation
  translate(planet.x, planet.y);
  // Rotate our object by its current rotation
  rotate(planet.rotation / 2);
  // Now translate by the radius so we can draw it on the edge
  // of the circle
  translate(planet.radius / 2, 0);
  // Finally draw the planet (at 0,0 because we translated the origin)
  ellipse(0, 0, planet.size / 2);
  pop();

  //planet on outer ring
  push();
  noStroke();
  fill(20, 125, 200);
  // Translate to the center of rotation
  translate(planet.x, planet.y);
  // Rotate our object by its current rotation
  rotate(planet.rotation * 1.6);
  // Now translate by the radius so we can draw it on the edge
  // of the circle
  translate(planet.radius * 1.5, 0);
  // Finally draw the planet (at 0,0 because we translated the origin)
  ellipse(0, 0, planet.size / 2);
  pop();
}

function drawPlanet2() {
  push();
  noStroke();
  fill(20, 125, 200);
  // Translate to the center of rotation
  translate(planet2.x, planet2.y);
  // Rotate our object by its current rotation
  rotate(planet2.rotation * 1.6);
  // Now translate by the radius so we can draw it on the edge
  // of the circle
  translate(planet2.radius * 1.5, 0);
  // Finally draw the planet (at 0,0 because we translated the origin)
  ellipse(0, 0, planet2.size * 2);
  pop();
}

function drawMoon() {
  push();
  noStroke();
  fill(0, 175, 100);
  //translate to planet's position
  translate(moon.x, moon.y);
  //have it follow the planet when not moved
  rotate(planet.rotation);
  //Translate by the radius so its drawn on the edge of the circle
  translate(moon.radius, 0);
  //draw the moon at 0,0 because it has been translated
  ellipse(moon.x, 0, moon.size);
  scale(0.5);
  fill(255, 175, 120);
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
