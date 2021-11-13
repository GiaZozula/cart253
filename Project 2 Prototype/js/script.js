/**
Projec
fill(255)t 2 Prototype
Gia ~~

This is a prototype of a game that simulates (in a very reduced, gameified manner) the stress of working at warehouse.
The player has to respond to timed orders from the boss, using converyor belts.

Possible other mechanics :
  - Survival systems like the need to stay hydrated and use the washroom
      - Perhaps with the need to use the washroom effecting player movement/or the visuals to make it more difficult to work
  - Some kind of hourly income rate, where you are penalized for missing items/using the washroom
  - The actual win/lose state being if you are able to pay rent at the end of shift
*/

"use strict";

// this is a list of possible orders that are stored in an array
let orders = [`T-Shirt`, `Doll`, `Toaster`, `Baseball Cap`];

//this is the starting order, that will be replaced once the game begins
let currentOrder = `YOU READY TO WORK?!`;

// this is a list of toasters that are stored in an array
let toasters = [];
//this is the length of the array filled with toasters
let numToasters = 5;

// this is a list of hats that are stored in an array
let hats = [];
//this is the length of the array filled with hats
let numHats = 10;

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER, CENTER);
  fill(255);

  // Create the correct number of toasters and put them in our array
  for (let i = 0; i < numToasters; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let toaster = new Toaster(x, y);
    toasters.push(toaster);
  }

  // Create the correct number of hats and put them in our array
  for (let i = 0; i < numHats; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let hat = new Hat(x, y);
    hats.push(hat);
  }
}

function draw() {
  background(0);

  //the text will read what the current order is, as its randomized
  text(currentOrder, width / 2, height / 4);

  // Go through all the toasters and move, wrap, and display them
  for (let i = 0; i < toasters.length; i++) {
    let toaster = toasters[i];
    toaster.move();
    toaster.wrap();
    toaster.display();
  }

  // Go through all the hats and move, wrap, and display them
  for (let i = 0; i < hats.length; i++) {
    let hat = hats[i];
    hat.move();
    hat.wrap();
    hat.display();
  }
}

function mousePressed() {
  // By passing the orders array as an argument to random() we get back
  // a RANDOM ELEMENT in the array (one of the fortune strings) which we
  // can then store in the currentOrder variable for displaying
  currentOrder = random(orders);
}
