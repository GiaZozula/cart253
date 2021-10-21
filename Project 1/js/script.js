/**
~~ Stargazer ~~
By Gia <3

Hello! This is my simulation for Project 1. It simulates a solar system with some limited interactivity
in the form of left and right movement of the celestial bodies along a predefined axis. I made all of
the assets for this project.

I've had help from both Pippin and Mads for this project, especially in regards to wrapping my head
around how to get the fundamental radial mechanic.

Mads and I spent a significant amount of time trying to debug the program's inability to reset properly,
but hit a wall with it. Not sure what I'm missing, but its clearly something to do with the superNova.

The bug currently makes it impossible to restart the simulation after completing the program once and
returning to the title screen.

I am eager to learn how to better use arrays! And how to properly organize/ optimize my code, because
currently this whole thing feels veeeeerrrry long and cumbersome. Anywho, thanks for all the help!!


*/

//custom fonts
let font1;
let font2;

//background music
let music;

//superNova sound effect (that plays repeatedly when triggered)
let blastFX;

//my brief for-array into arrays
let stars = [];
let asteroids = [];

//basic parameters being set
let backgroundImg = undefined;
let musicIsPlaying = false;

//these are thhe parameters I figured I would have to
//reset at the end for the program to restart the simulation
let time = 0;
let superNova = false;
let superNovaTimer = 200;
let endVisible = false;
let endTimer = 90;

//the stars and asteroids ended up being very similar, spinning around for added effect
let star = {
  x: 400,
  y: 400,
  fill: 255,
  size: 3,
  rotation: 0.01,
  rotationSpeed: 0.001,
};

//this is the center of the canvas
let centerPoint = {
  x: 700,
  y: 400,
};

//this is the sun, which is made up of a bunch of ellipses
let sun = {
  x: 700,
  y: 400,
  size: 200,
};

//this is the white ellipse that fills the screen during superNova
let novaBlast = {
  x: 700,
  y: 400,
  size: 200,
};

//this is one of two planet variables that are used repeatedly
let planet = {
  // The centre
  x: 700,
  y: 400,
  // How far out from the center the planet rotates
  radius: 350,
  // How big it is
  size: 100,
  // The current rotation around the circle
  rotation: 0,
  // How fast it is rotating
  rotationSpeed: 0.0,
  // How fast it can accelerate
  rotationAcceleration: 0.001,
  // Maximum rotation speed
  maxRotationSpeed: 0.01,
};

//this is a variation on the variable above, in order to have
//some planets move in an opposite direction during a keypress
let planet2 = {
  x: 700,
  y: 400,
  radius: 350,
  size: 100,
  rotation: -0,
  rotationSpeed: 0,
  rotationAcceleration: -0.001,
  maxRotationSpeed: -0.01,
};

//this is for the smaller ellipses that make up 'moons'
let moon = {
  //starts aligned on the planet
  x: planet.x,
  y: planet.y,
  radius: planet.radius,
  size: 50,
  //rotates at the same speed as the planet
  rotation: planet.rotation,
};

//this is for the asteroids that whip around the screen
let asteroid = {
  x: 300,
  y: 300,
  width: 4,
  height: 7,
  fill: 130,
  rotation: 0.01,
  rotationSpeed: 0.001,
};

//starting with the title state
let state = `title`;

//fading in on the title state
let fade = {
  x: undefined,
  y: undefined,
  fill: 0,
  alpha: 255,
};

//some rates used for variables modulated by sin
let moonRate = 0;
let sunRate = 0;
let colourRate = 0;

//preloading the assets
function preload() {
  font1 = loadFont("assets/fonts/font1.otf");
  font2 = loadFont("assets/fonts/font2.otf");
  backgroundImg = loadImage("assets/images/background.gif");
  music = loadSound("assets/sounds/music.mp3");
  blastFX = loadSound("assets/sounds/blastFX.mp3");
}

function setup() {
  createCanvas(1400, 800);
  noCursor();
}

function draw() {
  //calling the function for switching between states
  stateSwitcher();

  //this ensures that everyone rotates according to the current speed
  planet.rotation += planet.rotationSpeed;
  planet2.rotation -= planet2.rotationSpeed;
}

//this is the function for switching between states
function stateSwitcher() {
  if (state === `title`) {
    drawTitle();
  } else if (state === `simulation`) {
    drawSimulation();
  } else if (state === `end`) {
    drawEnd();
  }
}

//drawing everything in the title state
function drawTitle() {
  background(0);

  //sadly this reset doesn't work. this placement was one of many that was
  //attempted but none of the ended up fixing the issue.
  resetGame();

  //start the music :)
  if (musicIsPlaying === false) {
    music.play();
    musicIsPlaying = true;
  }

  //this is to exit the title state and begin the simulation
  if (keyIsDown(UP_ARROW)) {
    state = `simulation`;
  }

  // the star and asteroid animations
  drawStarfield();
  drawAsteroidBelt();

  //this draws a frame around the text
  push();
  stroke(255);
  fill(0);
  rectMode(CENTER);
  rect(700, 400, width / 2, height / 2);
  pop();

  // orange layer of text for title screen
  push();
  fill(217, 89, 24, 255);
  textFont("font1");
  textAlign(CENTER, CENTER);
  textSize(160);
  text(`Stargazer`, width / 2, height / 3);
  pop();

  // green layer
  push();
  fill(106, 184, 96, 255);
  textFont("font1");
  textAlign(CENTER, CENTER);
  textSize(160);
  text(`Stargazer`, width / 2, height / 3.2);
  pop();

  //blue layer
  push();
  fill(1, 170, 233, 255);
  textFont("font1");
  textAlign(CENTER, CENTER);
  textSize(160);
  text(`Stargazer`, width / 2, height / 3.4);
  pop();

  //white layer
  push();
  fill(255);
  textFont("font1");
  textAlign(CENTER, CENTER);
  textSize(160);
  text(`Stargazer`, width / 2, height / 3.6);
  pop();

  //seconed chunk of text for title screen
  push();
  fill(1, 170, 233, 255);
  textFont("font2");
  textAlign(CENTER, CENTER);
  textSize(72);
  text(`solar system simulation`, width / 2, height / 2.2);
  pop();

  // third chunk of text for title screen
  push();
  fill(255);
  textFont("font2");
  textAlign(CENTER, RIGHT);
  textSize(40);
  text(`music + programming by Gia ♥♥♥`, width / 1.25, height / 1.05);
  pop();

  // controls text
  push();
  fill(255);
  textFont("font2");
  textAlign(LEFT, LEFT);
  textSize(25);
  text(
    `use the arrow keys to affect the
    rotation + position of the solar bodies!`,
    width / 2.25,
    height / 1.57
  );
  pop();

  // begin by pressing "up arrow" text
  push();
  fill(1217, 89, 24, 255);
  textFont("font2");
  textAlign(LEFT, RIGHT);
  textSize(25);
  text(`press ↑ now to look to the night sky!`, width / 2.05, height / 1.4);
  pop();

  // calling the fade from black effect
  push();
  drawFade();
  pop();
}

//this is the function for drawing everything in the simulation state
function drawSimulation() {
  //switched to deltaTime from frameCount in order to try and fix the
  //reset bug, but to no avail.
  time = time + deltaTime;

  // my custom space background gif
  background(backgroundImg);

  //calling all of the shapes
  drawStarfield();
  drawStar1();
  drawStar2();
  drawStar3();
  drawStar4();

  drawSun();

  drawAsteroidBelt();
  drawAsteroid1();
  drawAsteroid2();
  drawAsteroid3();
  drawAsteroid4();
  drawAsteroid5();
  drawAsteroid6();
  drawAsteroid7();

  drawTrack1();
  drawTrack2();
  drawTrack3();

  drawPlanet();
  drawPlanet2();

  drawMoon();
  drawMiniMoon();

  // this refers to the simulation controls
  handleDirection();

  // lets make sure we're jammin to tunes
  if (musicIsPlaying === false) {
    music.play();
    musicIsPlaying = true;
  }

  // was using this to attempt to debug the reset
  console.log(time);

  //this counts the time and starts the superNova blast after
  //10 seconds (tried to keep it short for whoever's marking this' sake)
  if (time >= 15000) {
    superNova = true;
    time = 0;
  }

  //this draws the superNova blast at the center of the canvas
  if (superNova) {
    push();
    noStroke();
    fill(255);
    translate(novaBlast.x, novaBlast.y);
    ellipse(0, 0, novaBlast.size);
    pop();
    novaBlast.size += 25;

    //record scratch
    music.stop();

    //ka-blooey
    blastFX.play();

    //this counts for four more seconds
    if (time >= 4000) {
      endVisible = true;
      time = 0;
    }
  }

  //then switches the state to 'end'
  if (endVisible) {
    state = `end`;
  }
}

//this draws all the stars spinning about, with an array so they 'streak'
function drawStarfield() {
  //building a for loop (based off of the arrays course material) for the stars
  for (let i = 0; i < 500; i++) {
    drawStar1();
    drawStar2();
    drawStar3();
    drawStar4();
  }
}

//four different stars are drawn here
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

//this draws the sun, which is made up of way too many layers of ellipses
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

//draws the asteroid belt, also uses an array for a 'streak' effect
function drawAsteroidBelt() {
  //building a for loop (based off of the arrays course material) for the stars
  for (let i = 0; i < 500; i++) {
    drawAsteroid1();
    drawAsteroid2();
    drawAsteroid3();
    drawAsteroid4();
    drawAsteroid5();
    drawAsteroid6();
    drawAsteroid7();
  }
}

//draws some individual asteroids
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

function drawAsteroid5() {
  push();
  noStroke();
  fill(asteroid.fill);
  translate(planet.x, planet.y);
  asteroid.rotation += asteroid.rotationSpeed;
  rotate(asteroid.rotation / 33);
  ellipse(
    asteroid.x - 13,
    asteroid.y - 5,
    asteroid.width + 7,
    asteroid.height - 1
  );
  pop();
}

function drawAsteroid6() {
  push();
  noStroke();
  fill(asteroid.fill);
  translate(planet.x, planet.y);
  asteroid.rotation += asteroid.rotationSpeed;
  rotate(asteroid.rotation / 41);
  ellipse(
    asteroid.x - 13,
    asteroid.y - 5,
    asteroid.width + 1,
    asteroid.height - 3
  );
  pop();
}

function drawAsteroid7() {
  push();
  noStroke();
  fill(asteroid.fill);
  translate(planet.x, planet.y);
  asteroid.rotation += asteroid.rotationSpeed;
  rotate(asteroid.rotation / 35);
  ellipse(
    asteroid.x - 1,
    asteroid.y - 5,
    asteroid.width + 1,
    asteroid.height - 2
  );
  pop();
}

//Draws the 'tracks' that give a sense of various shapes' rotation
function drawTrack1() {
  push();
  colourRate += 0.009;
  strokeWeight(4);
  stroke(sin(colourRate) * 106, 184, 96, 255);
  noFill();
  translate(planet.x, planet.y);
  ellipse(0, 0, planet.radius * 3);
  pop();
}

function drawTrack2() {
  push();
  colourRate += 0.0005;
  strokeWeight(2);
  stroke(sin(colourRate) * 106, 184, 96, 255);
  noFill();
  translate(planet.x, planet.y);
  ellipse(0, 0, planet.radius * 2);
  pop();
}

function drawTrack3() {
  push();
  colourRate += 0.0009;
  stroke(sin(colourRate) * 106, 184, 96, 255);
  noFill();
  translate(planet.x, planet.y);
  ellipse(0, 0, planet.radius);
  pop();
}

//drawing the planets, lots of variations.
function drawPlanet() {
  //planet on center ring
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
  fill(171, 205, 239);
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

  //planet on second ring
  push();
  noStroke();
  fill(204, 204, 255);
  // Translate to the center of rotation
  translate(planet.x, planet.y);
  // Rotate our object by its current rotation
  rotate(planet.rotation * 1.6);
  // Now translate by the radius so we can draw it on the edge
  // of the circle
  translate(planet.radius * 1.9, 0);
  // Finally draw the planet (at 0,0 because we translated the origin)
  ellipse(-850, 285, planet.size / 1.2);
  pop();
}

//variation on the previous planet, in order to have them movve in an opposite direction
function drawPlanet2() {
  //large planet on outerring
  push();
  noStroke();
  fill(133, 96, 136);
  // Translate to the center of rotation
  translate(planet2.x, planet2.y);
  // Rotate our object by its current rotation
  rotate(planet2.rotation / 1.6);
  // Now translate by the radius so we can draw it on the edge
  // of the outer ring
  translate(planet2.radius * 1.5, 0);
  // Finally draw the planet (at 0,0 because we translated the origin)
  ellipse(-1050, 0, planet2.size * 2);
  pop();

  //another planet on outerring
  push();
  noStroke();
  fill(232, 204, 215);
  // Translate to the center of rotation
  translate(planet2.x, planet2.y);
  // Rotate our object by its current rotation
  rotate(planet2.rotation / 1.6);
  // Now translate by the radius so we can draw it on the edge
  // of the outer ring
  translate(planet2.radius * 1.5, 0);
  // Finally draw the planet (at 0,0 because we translated the origin)
  ellipse(-10, -140, planet2.size * 1.45);
  pop();

  //smaller planet on second ring
  push();
  noStroke();
  fill(95, 158, 160);
  // Translate to the center of rotation
  translate(planet2.x, planet2.y);
  // Rotate our object by its current rotation
  rotate(planet2.rotation * 2);
  // Now translate by the radius so we can draw it on the edge
  // of the circle
  translate(planet2.radius, 0);
  // Finally draw the planet (at 0,0 because we translated the origin)
  ellipse(0, -400, planet2.size / 1.6);
  pop();

  // planet on third ring
  push();
  noStroke();
  fill(196, 174, 173);
  // Translate to the center of rotation
  translate(planet2.x, planet2.y);
  // Rotate our object by its current rotation
  rotate(planet2.rotation / 2);
  // Now translate by the radius so we can draw it on the edge
  // of the circle
  translate(planet2.radius, 0);
  // Finally draw the planet (at 0,0 because we translated the origin)
  ellipse(-575, -275, planet2.size / 1.15);
  pop();

  //planet on inner ring
  push();
  noStroke();
  fill(23, 104, 238);
  // Translate to the center of rotation
  translate(planet.x, planet.y);
  // Rotate our object by its current rotation
  rotate(planet.rotation * 6);
  // Now translate by the radius so we can draw it on the edge
  // of the circle
  translate(planet.radius / 2, 0);
  // Finally draw the planet (at 0,0 because we translated the origin)
  ellipse(0, 0, planet.size / 1.5);
  pop();
}

//lets draw some moons
function drawMoon() {
  push();
  noStroke();
  fill(37, 53, 41);
  //translate to planet's position
  translate(planet.x, planet.y);
  //have it follow the planet when not moved
  rotate(planet.rotation * 4);
  //Translate by the radius so its drawn on the edge of the circle
  translate(moon.radius * 1.4, moon.radius / 1.4);
  //draw the moon at 0,0 because it has been translated
  ellipse(moon.x, 0, moon.size / 1.3);
  moonMovement();
  pop();
}

//add another moon
function drawMiniMoon() {
  push();
  noStroke();
  fill(255, 175, 120);
  //translate to planet's position
  translate(planet.x, planet.y);
  //have it follow the planet when not moved
  rotate(planet.rotation);
  //Translate by the radius so its drawn on the edge of the circle
  translate(moon.radius, 0);
  //draw the moon at 0,0 because it has been translated
  ellipse(moon.x + 15, 0, moon.size / 1.3);
  moonMovement();
  pop();
}

//this determines the movement of the moons so they look like
//they're simultaneously rotatating around the sun and the orbit of a nearby object
function moonMovement() {
  moon.x = sin(moonRate) * 60;
  moonRate += 0.02;
}

//This doesn't actually seem to have any use in the current version, I'll delete it
function drawStars() {
  push();
  noStroke();
  fill(255);
  translate(planet.x, planet.y);
  ellipse(0, 0, star.size);
  pop();
}

/**
Change the direction and rotation speed based on arrow keys being pressed
*/
function handleDirection() {
  if (keyIsDown(LEFT_ARROW)) {
    // Left means accelerate in the negative for "planet" and the opposite for "planet2"
    planet.rotationSpeed -= planet.rotationAcceleration;
    planet2.rotationSpeed += planet2.rotationAcceleration;
  } else if (keyIsDown(RIGHT_ARROW)) {
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

//END State
//draw "End" state
function drawEnd() {
  background(255);
  resetGame();

  //make sure music is still blastin'
  if (musicIsPlaying === false) {
    music.play();
    musicIsPlaying = true;
  }

  //this stops the music and switches the state to title again
  if (keyIsDown(DOWN_ARROW)) {
    music.stop();
    musicIsPlaying = false;
    state = `title`;
  }

  // background animation
  drawStarfield();
  drawAsteroidBelt();

  //draws frame around text
  push();
  stroke(0);
  noFill();
  rectMode(CENTER);
  rect(700, 400, width / 2, height / 2);
  pop();

  // orange layer of text for end screen
  push();
  fill(217, 89, 24, 255);
  textFont("font1");
  textAlign(CENTER, CENTER);
  textSize(160);
  text(`Stargazer`, width / 2, height / 3);
  pop();

  // green layer
  push();
  fill(106, 184, 96, 255);
  textFont("font1");
  textAlign(CENTER, CENTER);
  textSize(160);
  text(`Stargazer`, width / 2, height / 3.2);
  pop();

  //blue layer
  push();
  fill(1, 170, 233, 255);
  textFont("font1");
  textAlign(CENTER, CENTER);
  textSize(160);
  text(`Stargazer`, width / 2, height / 3.4);
  pop();

  //black layer
  push();
  fill(0);
  textFont("font1");
  textAlign(CENTER, CENTER);
  textSize(160);
  text(`Stargazer`, width / 2, height / 3.6);
  pop();

  //changes this chunk of text for the end screen because of 'surprise' ending
  push();
  fill(0);
  textFont("font2");
  textAlign(CENTER, CENTER);
  textSize(72);
  text(`supernova simulation`, width / 2, height / 2.2);
  pop();

  // third chunk of text for end screen
  push();
  fill(0);
  textFont("font2");
  textAlign(CENTER, RIGHT);
  textSize(40);
  text(`music + programming by Gia ♥♥♥`, width / 1.25, height / 1.05);
  pop();

  // more text
  push();
  fill(0);
  textFont("font2");
  textAlign(LEFT, LEFT);
  textSize(25);
  text(`thank you for playing :)`, width / 2.25, height / 1.57);
  pop();

  // press "down arrow"
  push();
  fill(1217, 89, 24, 255);
  textFont("font2");
  textAlign(LEFT, RIGHT);
  textSize(25);
  text(`press ↓ now to return to Earth.`, width / 2.05, height / 1.4);
  pop();
}

//attempted to reset the game with this function
function resetGame() {
  let backgroundImg = undefined;
  let musicIsPlaying = false;
  let superNova = false;
  let endVisible = false;
  time = 0;
}

//this is the fade to black function
function drawFade() {
  push();
  noStroke();
  fill(fade.fill, fade.fill, fade.fill, fade.alpha);
  rectMode(CENTER);
  rect(700, 400, width, height);
  pop();
  fade.alpha -= 5;
}
