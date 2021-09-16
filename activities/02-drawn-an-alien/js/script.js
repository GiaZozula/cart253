/**
activity 2 - drawn an alien
Gia <3


*/

"use strict";


/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(640, 480);

//orange background
  background(255, 110, 25);
  noStroke();

//draw the body
  fill(127);
  ellipse(320,480,300,200);

//draw a purple head
  fill(128, 74, 148);
  ellipse(320,240,250,400);

//draw the eyes
fill(0);
ellipse(250,240,80,250);
ellipse(390,240,80,250);

//draw the nostrils
  fill(0);
  ellipse(300, 350, 10, 10);
  ellipse(340, 350, 10, 10);

//draw the mouth
  stroke(234, 178, 237);
  strokeWeight(12);
  rectMode(CENTER);
  rect(320,400,100,20);

}


/**
Description of draw()
*/
function draw() {

}
