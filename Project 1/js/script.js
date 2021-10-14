/**
WIZARD HELL
By Gia <3
description to match your project!
*/

"use strict";
let myFont;

let radius = 350;
let angle = 0;
let speed = 0.03;

// the center of our rotation:
let centerX = 700;
let centerY = 400;

/**
Preloading fonts,
*/
function preload() {
  myFont = loadFont("assets/fonts/tempfont.otf");
}

/**
Description of setup
*/
function setup() {
  createCanvas(1400, 800);
  rectMode(CENTER);
  textFont(myFont);
}

/**
Description of draw()
*/
function draw() {
  background(255);

  // ~~~ Sketching out the basic HUD elements ~~~
  //drawing the "playfield"
  circle(centerX, centerY, radius * 2);
  //temp position for HP(lives)
  rect(250, 50, 150, 55, 20);
  //temp position for scoreboard
  push();
  fill(0); //add "score colour variable"
  textSize(30);
  text("hi score: x100000", 179, 115); //add scoreboard variable with a counter
  pop();
  //temp position for "TitleBanner_PanelVersion"
  push();
  fill(0);
  textAlign(CENTER);
  textSize(140);
  text("WIZARD", 1200, 100); //1st half of the game's WIP title
  text("HELL", 1200, 200); //2nd half of the game's WIP title
  pop();

  //computing the angle
  // text(angle, 50, 50);

  // translate to point to rotate around
  translate(centerX, centerY);
  rotate(angle);
  // draw shape as though (centerX, centerY) is the new
  // origin / (0, 0) point
  rect(radius, 0, 50, 50); //add this to "USER"
  line(0, 0, radius, 0); //add this to "shotLine"

  angle = angle + speed;
}
