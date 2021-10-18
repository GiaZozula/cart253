/**
~~ changed concept ~~
By Gia <3

+ attribution of code from Mads' source, my addition of controls,
then Pippin's adaptation of this idea

https://p5js.org/reference/#/p5/drawingContext for
*/
let tempFont;

let stars = [];
let asteroids = [];

let star = {
  x: 400,
  y: 400,
  fill: 255,
  size: 3,
  rotation: 0.01,
  rotationSpeed: 0.001,
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
  rotation: -0,
  // How fast is it rotating
  rotationSpeed: 0,
  // How fast can it accelerate?
  rotationAcceleration: -0.001,
  // Maximum rotation speed
  maxRotationSpeed: -0.01,
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

let asteroid = {
  x: 300,
  y: 300,
  width: 4,
  height: 7,
  fill: 130,
  rotation: 0.01,
  rotationSpeed: 0.001,
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
  drawStar1();
  drawStar2();
  drawStar3();
  drawStar4();

  handleDirection();
  handleOutwardDirection();

  drawSun();
  drawAsteroidBelt();

  drawAsteroid1();
  drawAsteroid2();
  drawAsteroid3();
  drawAsteroid4();

  drawTrack1();
  drawTrack2();
  drawTrack3();
  // drawTrack4();

  drawPlanet();
  drawPlanet2();

  drawMoon();

  // Rotate according to the current speed
  planet.rotation += planet.rotationSpeed;
  planet2.rotation -= planet2.rotationSpeed;
}

function drawStarfield() {
  //building a for loop (based off of the arrays course material) for the stars
  for (let i = 0; i < 500; i++) {
    drawStar1();
    drawStar2();
    drawStar3();
    drawStar4();
  }
}

//draw a single star
function drawStar1() {
  push();
  noStroke();
  fill(star.fill);
  translate(planet.x, planet.y);
  star.rotation += star.rotationSpeed;
  rotate(star.rotation / 22);
  ellipse(star.x, star.y, star.size);
  pop();
}

function drawStar2() {
  push();
  noStroke();
  fill(star.fill);
  translate(planet.x, planet.y);
  star.rotation += star.rotationSpeed;
  rotate(star.rotation / 25);
  ellipse(star.x + 20, star.y + 55, star.size + 5);
  pop();
}

function drawStar3() {
  push();
  noStroke();
  fill(star.fill);
  translate(planet.x, planet.y);
  star.rotation += star.rotationSpeed;
  rotate(star.rotation / 20);
  ellipse(star.x - 100, star.y - 123, star.size - 3);
  pop();
}

function drawStar4() {
  push();
  noStroke();
  fill(star.fill);
  translate(planet.x, planet.y);
  star.rotation += star.rotationSpeed;
  rotate(star.rotation / 21);
  ellipse(star.x * 30, star.y * 40, star.size + 2);
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

//draws asteroid belt

function drawAsteroidBelt() {
  //building a for loop (based off of the arrays course material) for the stars
  for (let i = 0; i < 500; i++) {
    drawAsteroid1();
    drawAsteroid2();
    drawAsteroid3();
    drawAsteroid4();
  }
}

//draws individual asteroids
function drawAsteroid1() {
  push();
  noStroke();
  fill(asteroid.fill);
  translate(planet.x, planet.y);
  asteroid.rotation += asteroid.rotationSpeed;
  rotate(asteroid.rotation / 22);
  ellipse(asteroid.x, asteroid.y, asteroid.width, asteroid.height);
  pop();
}

function drawAsteroid2() {
  push();
  noStroke();
  fill(asteroid.fill);
  translate(planet.x, planet.y);
  asteroid.rotation += asteroid.rotationSpeed;
  rotate(asteroid.rotation / 25);
  ellipse(
    asteroid.x + 5,
    asteroid.y - 6,
    asteroid.width + 2,
    asteroid.height + 3
  );
  pop();
}

function drawAsteroid3() {
  push();
  noStroke();
  fill(asteroid.fill);
  translate(planet.x, planet.y);
  asteroid.rotation += asteroid.rotationSpeed;
  rotate(asteroid.rotation / 20);
  ellipse(
    asteroid.x + 21,
    asteroid.y + 11,
    asteroid.width - 1,
    asteroid.height - 2
  );
  pop();
}

function drawAsteroid4() {
  push();
  noStroke();
  fill(asteroid.fill);
  translate(planet.x, planet.y);
  asteroid.rotation += asteroid.rotationSpeed;
  rotate(asteroid.rotation / 21);
  ellipse(
    asteroid.x - 13,
    asteroid.y - 5,
    asteroid.width + 5,
    asteroid.height - 2
  );
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
  // of the outer ring
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
  //add another moon
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
    planet2.rotationSpeed += planet2.rotationAcceleration;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // Right means accelerate in the positive
    planet.rotationSpeed += planet.rotationAcceleration;
    planet2.rotationSpeed -= planet2.rotationAcceleration;
  } else {
    planet.rotationSpeed = 0.003;
    planet2.rotationSpeed = -0.003;
  }

  planet.rotationSpeed = constrain(
    planet.rotationSpeed,
    -planet.maxRotationSpeed,
    planet.maxRotationSpeed
  );
}
