/**
~~I Like to move it, move it~~
Gia :)

Gia's program for exercise #1 "I like to move it"
*/

"use strict";

/**
Description of setup
*/
let rectangle = {
  x: 0,
  y: 0,
  size: 50,
  vx: 0,
  vy: 0,
  shade: 255,
};

function setup() {
  createCanvas(500, 500);

  rectangle.vx = 12;
  rectangle.vy = 12;

  //baby blue background
  background(0);
}

/**
Description of draw()

ideas:
random number + variable (size, position, alpha) in relation to mouse, for a bunch of little circles and lines that follow the mouse
*/
function draw() {
  rectangle.x += rectangle.vx;
  rectangle.y += rectangle.vy;
  rectangle.size = rectangle.size + -2;
  rectangle.shade = rectangle.shade + random(-1, -30);

  rectMode(CENTER);
  noFill();
  stroke(rectangle.shade);
  rect(rectangle.x, rectangle.y, rectangle.size, rectangle.size);
}
