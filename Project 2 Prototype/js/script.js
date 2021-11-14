/**
Project 2 Prototype
Gia ~~


Necessary Mechanics :
- A randomized order is displayed
- Clicked Products can be identified as fulfilling the displayed order

Desirable mechanics:
- The products are on conveyor belts with different speeds
- Different products appear on the same conveyor belt
- Products can be picked up by the player
- Products can be placed on another moving conveyor belt by the player


*/

"use strict";

// this is a list of possible orders that are stored in an array
let orders = [`T-Shirt`, `Doll`, `Toaster`, `Baseball Cap`];

//this is the starting order, that will be replaced once the game begins
let currentOrder = `YOU READY TO WORK?!`;

let products = [];
let numToasters = 15;
let numHats = 10;
let numTshirts = 8;
let numDolls = 8;

let toasterIMG = undefined;
let hatIMG = undefined;
let tshirtIMG = undefined;
let dollIMG = undefined;

function preload() {
  toasterIMG = loadImage("assets/images/toaster.png");
  hatIMG = loadImage("assets/images/hat.png");
  tshirtIMG = loadImage("assets/images/tshirt.png");
  dollIMG = loadImage("assets/images/doll.png");
}

function setup() {
  createCanvas(1200, 800);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(50);

  // Create the correct number of toasters and put them in our array
  for (let i = 0; i < numToasters; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let toaster = new Toaster(x, y);
    products.push(toaster);
  }

  // Create the correct number of hats and put them in our array
  for (let i = 0; i < numHats; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let hat = new Hat(x, y);
    products.push(hat);
  }

  // Create the correct number of tshirts and put them in our array
  for (let i = 0; i < numTshirts; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let tshirt = new Tshirt(x, y);
    products.push(tshirt);
  }

  // Create the correct number of dolls and put them in our array
  for (let i = 0; i < numDolls; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let doll = new Doll(x, y);
    products.push(doll);
  }

  //set randomized speeds for the products
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    let r = random(0, 1);
    if (r < 0.5) {
      product.vx = product.speed * 2;
    } else {
      product.vx = product.speed;
    }
  }
}

function draw() {
  background(0);

  //the text will read what the current order is, as its randomized
  text(currentOrder, width / 2, height / 4);

  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.move();
    product.wrap();
    product.display();
  }
}

function mousePressed() {
  // By passing the orders array as an argument to random() we get back
  // a RANDOM ELEMENT in the array (one of the fortune strings) which we
  // can then store in the currentOrder variable for displaying
  currentOrder = random(orders);

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
