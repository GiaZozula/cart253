/**
WIZARD HELL
By Gia <3
description to match your project!
*/

"use strict";

let radius = 350;
let angle = 0;
let speed = 0.03;

// the center of our rotation:
let centerX = 700;
let centerY = 400;

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  createCanvas(1400, 800);
  rectMode(CENTER);
}

/**
Description of draw()
*/
function draw() {
  background(0);

  //drawing the "playfield"
  circle(centerX, centerY, radius * 2);

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
