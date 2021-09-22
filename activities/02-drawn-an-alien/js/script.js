/**
activity 2 - drawn an alien
Gia <3

Draws an alien on canvas
*/

"use strict";

/**
Description of preload
*/
function preload() {
  loadModel("assets/funblob.obj", true);
}

/**
Draws an alien
*/
function setup() {
  createCanvas(640, 480);

  //orange background
  background(149, 227, 230);
  noStroke();

  //draw the body
  fill(98, 29, 99);
  ellipse(320, 480, 300, 200);

  //draw a purple head
  fill(128, 74, 148);
  ellipse(320, 240, 250, 400);
  ellipse(320, 240, 400, 200);

  //draw the eyes
  fill(68, 17, 128);
  ellipse(250, 240, 80, 80);
  ellipse(390, 240, 80, 80);

  //draw the eyes
  fill(236, 194, 237);
  ellipse(250, 240, 40, 40);
  ellipse(390, 240, 40, 40);

  //draw the nose
  fill(234, 178, 237);
  noStroke();
  triangle(280, 350, 350, 320, 300, 190);

  //draw the nostrils
  fill(0);
  ellipse(300, 340, 10, 10);
  ellipse(335, 325, 10, 10);

  //draw the mouth
  stroke(234, 178, 237);
  strokeWeight(12);
  rectMode(CENTER);
  rect(320, 400, 100, 20, 20, 20, 20);

  //draw some eyebrows
  noFill();
  arc(280, 100, 100, 55, PI, PI + QUARTER_PI);
  arc(400, 80, 100, 55, HALF_PI, PI);
}

/**
does nothing
*/
function draw() {}
