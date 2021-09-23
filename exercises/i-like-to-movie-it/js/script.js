/**
~~I like to move it!~~ CART 253
Gia

This is my submission for the "I like to move it!" exercise.
*/

"use strict";

/**
Setting variables for background and shapes
*/
function preload() {}

let bg = {
  r: 149,
  g: 227,
  b: 230,
};
let circle = {
  x: 150,
  y: 150,
  size: 200,
  fill: 255,
  alpha: 200,
};
let tri = {
  x1: 280,
  y1: 250,
  x2: 450,
  y2: 420,
  x3: 450,
  y3: 90,
  fill: 255,
  alpha: 200,
};
let sqr = {
  x: 100,
  y: 300,
  s: 170,
  fill: 255,
  alpha: 200,
};
/**
creating a canvas and no stroke
*/
function setup() {
  createCanvas(500, 500);
  noStroke();
}

/**
Description of draw()
*/
function draw() {
  //background
  background(bg.r, bg.g, bg.b);
  bg.r = bg.r + 0.5;

  //circle
  circle.x = circle.x + 0.5;
  circle.x = constrain(circle.x, 0, width / 2);
  fill(circle.fill, circle.alpha);
  ellipse(circle.x, circle.y, circle.size);

  //triangle
  fill(tri.fill, tri.alpha);
  triangle(tri.x1, tri.y1, tri.x2, tri.y2, tri.x3, tri.y3);

  //square
  fill(sqr.fill, sqr.alpha);
  square(sqr.x, sqr.y, sqr.s);
}
