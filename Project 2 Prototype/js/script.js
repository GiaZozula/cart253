/**
Exercise: Progress Report
Project 2 Prototype
Gia ~~

This is a prototype of a game that simulates (in a very reduced, gamified manner) the stress of working at a warehouse like Amazon.
The player has to respond to orders from the boss, using conveyor belts.

To be added:
- there is only one type of product, though in the future there will be more!
- boss orders change too quickly sometimes, which will have to be fixed
- need to add a way for the products to be determined as the right one being asked
(likely through linking the order system to the checkOverlap system)
- need to add the "rent" bar that fills up with each consecutive order being filled
- have to add win/fail states
- still have to add timer systems (as described in my prototype proposal)
- add graphical assets
- add sound FX or music

*/

"use strict";

// this is a list of possible orders that are stored in an array
let orders = [`Blue`, `Purple`, `Red`, `Yellow`];

//this is the starting order, that will be replaced once the game begins
let currentOrder = `YOU READY TO WORK?!`;

//this sets a timer, and ties it to the orders changing
let orderTimer = 3000;
let orderChange = orderTimer;

//this changes if the clicked order corresponds to the one displayed
//but is currently not implemented in this prototype version
let correctOrder = false;

//this sets up the variables and array for all of the products
//currently, they are named after products, even though they
//are just all different colour squares. This will be changed.
let products = [];
let numProducts = 15;
let dropzone = undefined;

//this sets up a boundary area for the products to spawn in on the belt
let topEdge = 400;
let bottomEdge = 750;
//some padding so the products don't look like they're right on the edge
let padding = 50;

function setup() {
  createCanvas(1200, 800);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(50);

  //create the Dropzone
  let x = 700;
  let y = 0;
  dropzone = new Dropzone(x, y);

  // Create the correct number of products and put them in our array
  for (let i = 0; i < numProducts; i++) {
    let x = random(0, width);
    //this keeps them within the conveyor belt boundary
    let y = constrain(
      random(topEdge + padding, height),
      topEdge,
      bottomEdge - padding
    );
    let product = new Product(x, y);
    products.push(product);
  }

  //need to create functioning deposit lanes change the product direction and detect
  //if it is overlapping with the product
  //ramp up in speed, as though the product gets "launched" down a tube
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.vx = product.speed;
  }
}

function draw() {
  background(0);

  //this displays the dropzone
  dropzone.display();

  //this draws the product arrival conveyor belt
  push();
  stroke(255);
  fill(0);
  rect(0, topEdge, width, bottomEdge / 2);
  pop();

  //this checks if enough time has passed before changing the order
  if (millis() > orderChange) {
    currentOrder = random(orders);
    let r = random(0, 1);

    //attempting to add some randomness to the duration of the timer
    if (r < 0.5) {
      orderChange = millis() + orderTimer;
    }
  }

  //this displays the order
  text(currentOrder, width / 2, height - 50);

  //displays the product
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.move();
    product.wrap();
    product.display();
  }
}

//this controls the drag and drop input of the mouse
function mousePressed() {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.mousePressed();
  }
}

function mouseReleased() {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    if (product.isBeingDragged) {
      dropzone.checkOverlap(product);
    }
    product.mouseReleased();
  }
}
