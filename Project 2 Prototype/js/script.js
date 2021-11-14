/**
Project 2 Prototype
Gia ~~

Necessary Mechanics :
- Clicked Products can be identified as fulfilling the displayed order
- specific speeds for each conveyor belt

Desirable mechanics:
- The products are on conveyor belts with different speeds
- Different products appear on the same conveyor belt
- Products can be placed on another moving conveyor belt by the player
- When the product reaches the end of the screen it checks if it corresponds to the one displayed


*/

"use strict";

// this is a list of possible orders that are stored in an array
let orders = [`Blue`, `Purple`, `Red`, `Yellow`];

//this is the starting order, that will be replaced once the game begins
let currentOrder = `YOU READY TO WORK?!`;

//this sets a timer, and ties it to the orders changing
let orderTimer = 1000;
let orderChange = orderTimer;

//this changes if the clicked order corresponds to the one displayed
let correctOrder = false;

let products = [];
let numToasters = 15;
let numHats = 10;
let numTshirts = 8;
let numDolls = 8;

let redLane = {
  x: 0,
  y: 200,
  width: 1200,
  height: 60,
};

//this sets up a boundary area for the products to exist in
let topEdge = 400;
let bottomEdge = 750;
//some padding so the products don't look like they're right on the edge
let padding = 50;

function setup() {
  createCanvas(1200, 800);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(50);

  // Create the correct number of toasters and put them in our array
  for (let i = 0; i < numToasters; i++) {
    let x = random(0, width);
    //this keeps them within the conveyor belt boundary
    let y = constrain(
      random(topEdge + padding, height),
      topEdge,
      bottomEdge - padding
    );
    let toaster = new Toaster(x, y);
    products.push(toaster);
  }

  // Create the correct number of hats and put them in our array
  for (let i = 0; i < numHats; i++) {
    let x = random(0, width);
    //this keeps them within the conveyor belt boundary
    let y = constrain(
      random(topEdge + padding, height),
      topEdge,
      bottomEdge - padding
    );
    let hat = new Hat(x, y);
    products.push(hat);
  }

  // Create the correct number of tshirts and put them in our array
  for (let i = 0; i < numTshirts; i++) {
    let x = random(0, width);
    //this keeps them within the conveyor belt boundary
    let y = constrain(
      random(topEdge + padding, height),
      topEdge,
      bottomEdge - padding
    );
    let tshirt = new Tshirt(x, y);
    products.push(tshirt);
  }

  // Create the correct number of dolls and put them in our array
  for (let i = 0; i < numDolls; i++) {
    let x = random(0, width);
    //this keeps them within the conveyor belt boundary
    let y = constrain(
      random(topEdge + padding, height),
      topEdge,
      bottomEdge - padding
    );
    let doll = new Doll(x, y);
    products.push(doll);
  }

  //set the speed for the main conveyor (via the product's vx and speed)
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.vx = product.speed;
  }
}

function draw() {
  background(0);

  //this draws the boundary lines for the products
  stroke(255);
  line(0, topEdge, width, topEdge);
  line(0, bottomEdge, width, bottomEdge);

  //this draws the proper lanes for products to be dropped in
  //starting with the Toaster (red)
  push();
  noStroke();
  fill(255, 0, 0);
  rect(redLane.x, redLane.y, redLane.width, redLane.height);
  pop();

  //this checks if enough time has passed before changing the order
  if (millis() > orderChange) {
    currentOrder = random(orders);
    orderChange = millis() + orderTimer;
  }

  //this displays the order
  text(currentOrder, width / 2, height - 50);

  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.move();
    product.wrap();
    product.display();
  }
}

function mousePressed() {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.mousePressed();
  }
}

function mouseReleased() {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.mouseReleased();
  }
}

// function orderCheck() {
//   if (currentOrder == `Blue` && )
// }
