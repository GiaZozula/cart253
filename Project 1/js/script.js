/**
WIZARD HELL
By Gia <3
description to match your project!
*/

"use strict";
let tempFont;

//setting up the player
let user = {
  x: 0,
  y: 0,
  size: 100,
  direction: 0,
  speed: 0.006,
  maxSpeed: 0.008,
};

//setting up monsters
let monster = {
  x: 0,
  y: 0,
  size: 50,
  easing: 0.05,
};

//setting up rotational playfield
let playfield = {
  radius: 350,
  angle: 0,
};

// the center of the rotation:
let centerX = 700;
let centerY = 400;

/**
Preloading fonts,
*/
function preload() {
  tempFont = loadFont("assets/fonts/tempfont.otf");
}

/**
Description of setup
*/
function setup() {
  createCanvas(1400, 800);
  rectMode(CENTER);
  textFont(tempFont);
}

/**
Description of draw()
*/
function draw() {
  background(0);

  // ~~~ Sketching out the basic HUD elements ~~~
  //drawing the "playfield"
  circle(centerX, centerY, playfield.radius * 2);
  //temp position for HP(lives)
  rect(250, 50, 150, 55, 20);
  //temp position for scoreboard
  push();
  fill(255); //add "score colour variable"
  textSize(30);
  text("hi score: x100000", 179, 115); //add scoreboard variable with a counter
  pop();
  //temp position for "TitleBanner_PanelVersion"
  push();
  fill(255);
  textAlign(CENTER);
  textSize(120);
  text("WIZARD", 1200, 100); //1st half of the game's WIP title
  text("HELL", 1200, 200); //2nd half of the game's WIP title
  pop();

  //do i need a return variable of true or false to determine if the direction has been changed?
  //if so, maybe i can get the user to actually shift directions immediately by adding a
  //"directionChanged" variable that resets user.direction to 0 before user.speed is calculated.
  // might feel chunky and weird though!
  // do i have to do this with a while loop? to constantly check if its changed?

  //Need to add monster AI, likely with Perlin noise, and movement based on chasing the player
  //every so often. Also need to constrain the AI to the playfield, though I also then have to
  //figure how to kill enemies who appear on the movement circle (maybe by causing them to die)
  //or adding a seperate 'bomb' attack for the player, orrrr?

  // translate center point for the user to rotate around
  translate(centerX, centerY);
  rotate(playfield.angle);

  //rotate the angle
  playfield.angle = playfield.angle + user.direction;

  // ~~~ User controls ~~~
  //Movement with arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    user.direction += user.speed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    user.direction -= user.speed;
  } else {
    user.direction = 0;
  }

  //need to add a constrain for speed, with maxSpeed
  user.speed = constrain(user.speed, 0, user.maxSpeed);

  // ~~~ User Display ~~~
  ellipse(playfield.radius, user.y, user.size);

  // ~~~ Monster(s) Display ~~~
  ellipse(monster.x, monster.y, monster.size);

  // ~~~ Shot(s) Display ~~~
  //line for testing the direction
  // line(0, 0, radius, 0);

  //computing the angle
  // text(angle, 50, 50);
  // angle = angle + user.direction;
}
