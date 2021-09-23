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
  alpha: 255,
};

let tri = {
  x1: 280,
  y1: 250,
  x2: 450,
  y2: 420,
  x3: 450,
  y3: 90,
  fill: 255,
  alpha: 255,
};

let sqr = {
  x: 100,
  y: 300,
  s: 170,
  fill: 255,
  alpha: 255,
};

let lilcircle1 = {
  x: 100,
  y: 100,
  size: 50,
  fill: 255,
  alpha: 255,
};

let lilcircle4 = {
  x: 400,
  y: 400,
  size: 50,
  fill: 255,
  alpha: 255,
};

let lilcircle5 = {
  x: 400,
  y: 100,
  size: 50,
  fill: 255,
  alpha: 255,
};

let lilcircle8 = {
  x: 100,
  y: 400,
  size: 50,
  fill: 255,
  alpha: 255,
};

/**
creating a canvas and no stroke
*/
function setup() {
  createCanvas(500, 500);
  noStroke();
}

/**
drawing some shapes!
*/
function draw() {
  //background
  background(bg.r, bg.g, bg.b);
  bg.r = bg.r + 0.3;
  bg.b += 0.09;

  //little circle1
  fill(237, 255, 169);
  lilcircle1.size = map(lilcircle1.size, 0, width, mouseX / 10, mouseY / 10);
  ellipse(lilcircle1.x, lilcircle1.y, lilcircle1.size);

  //little circle4
  fill(237, 255, 169);
  lilcircle4.size = map(lilcircle4.size, 0, width, mouseX / 10, mouseY / 10);
  ellipse(lilcircle4.x, lilcircle4.y, lilcircle4.size);

  //little circle5
  fill(237, 255, 169);
  lilcircle5.size = map(lilcircle5.size, 0, width, mouseX / 10, mouseY / 10);
  ellipse(lilcircle5.x, lilcircle5.y, lilcircle5.size);

  //little circle8
  fill(237, 255, 169);
  lilcircle8.size = map(lilcircle8.size, 0, width, mouseX / 10, mouseY / 10);
  ellipse(lilcircle8.x, lilcircle8.y, lilcircle8.size);

  //circle no.1
  circle.fill = map(mouseX, 0, width, 200, 255);
  fill(circle.fill, circle.alpha);
  circle.x = circle.x + 0.5;
  circle.x = constrain(circle.x, 0, 350);
  ellipse(circle.x, circle.y, circle.size);

  //triangle
  tri.fill = map(mouseX, mouseY, width + 70, 250, 255);
  fill(tri.fill, tri.alpha);
  triangle(tri.x1, tri.y1, tri.x2, tri.y2, tri.x3, tri.y3);
  tri.x1 += -0.5;
  tri.x2 += -0.5;
  tri.x3 += -0.5;
  tri.x1 = constrain(tri.x1, 40, width * 2);
  tri.x2 = constrain(tri.x2, 210, width * 2);
  tri.x3 = constrain(tri.x3, 210, width * 2);

  //square
  sqr.fill = map(mouseY, 0, height, 200, 255);
  fill(sqr.fill, sqr.alpha);
  square(sqr.x, sqr.y, sqr.s);
  sqr.x += 0.35;
  sqr.x = constrain(sqr.x, 0, 250);
}
