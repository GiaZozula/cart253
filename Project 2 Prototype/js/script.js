/**
Projecct 2 Prototype
Gia ~~

This is a prototype of a game that simulates (in a very reduced, gameified manner) the stress of working at warehouse like Amazon.
The player has to respond to timed orders from the boss, while managing survival mechanics, using converyor belts.
*/

"use strict";

// this is a list of possible orders that are stored in an array
let orders = [`T-Shirt`, `Doll`, `Toaster`];

//this is the starting order, that will be replaced once the game begins
let currentOrder = `YOU READY TO WORK?!`;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
}

//the text will read what the current order is, as its randomized
function draw() {
  background(0);
  text(currentOrder, width / 2, height / 2);
}

function mousePressed() {
  // By passing the orders array as an argument to random() we get back
  // a RANDOM ELEMENT in the array (one of the fortune strings) which we
  // can then store in the currentOrder variable for displaying
  currentOrder = random(orders);
}
