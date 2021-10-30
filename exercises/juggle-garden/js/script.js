"use strict";

// Our garden
let garden = {
  // An array to store the individual pumpkins
  pumpkins: [],
  // How many pumpkins in the garden
  numPumpkins: 20,
  // An array to our the ghosts
  ghosts: [],
  // How many ghosts in the garden
  numGhosts: 5,
  // The color of the grass (background)
  grassColor: {
    r: 120,
    g: 180,
    b: 120,
  },
};

let font;
let bannerImg;
let ghostImg;
let pumpkinImg;
let witchImg;
let candyImg;

function preload() {
  font = loadFont("assets/fonts/font.otf");
  bannerImg = loadImage("assets/images/banner.gif");
  ghostImg = loadImage("assets/images/ghost.png");
  pumpkinImg = loadImage("assets/images/pumpkin.gif");
  witchImg = loadImage("assets/images/witch.gif");
  candyImg = loadImage("assets/images/candy.gif");
  // music = loadSound("assets/sounds/music.mp3");
  // blastFX = loadSound("assets/sounds/blastFX.mp3");
}

// setup() creates the canvas and the pumpkins in the garden
function setup() {
  createCanvas(600, 600);

  // Create our pumpkins by counting up to the number of the pumpkins
  for (let i = 0; i < garden.numPumpkins; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 80);
    let stemLength = random(50, 100);
    let petalColor = {
      r: random(100, 255),
      g: random(100, 255),
      b: random(100, 255),
    };
    // Create a new pumpkin using the arguments
    let pumpkin = new Pumpkin(x, y, size, stemLength, petalColor);
    // Add the pumpkin to the array of pumpkins
    garden.pumpkins.push(pumpkin);
  }

  // Create our ghosts by counting up to the number of ghosts
  for (let i = 0; i < garden.numGhosts; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    // Create a new ghost using the arguments
    let ghost = new Ghost(x, y);
    // Add the ghost to the array of ghosts
    garden.ghosts.push(ghost);
  }
}

// draw()
// Displays our pumpkins
function draw() {
  // Display the grass
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

  //test images
  image(ghostImg, mouseX, mouseY);

  // Loop through all the pumpkins in the array and display them
  for (let i = 0; i < garden.pumpkins.length; i++) {
    let pumpkin = garden.pumpkins[i];
    // Check if this pumpkin is alive
    if (pumpkin.alive) {
      // Update the pumpkin by shrinking it and displaying it
      pumpkin.shrink();
      pumpkin.display();
    }
  }

  // Loop through all the ghosts in the array and display them
  for (let i = 0; i < garden.ghosts.length; i++) {
    let ghost = garden.ghosts[i];
    // Check if this pumpkin is alive
    if (ghost.alive) {
      // Shrink and move the ghost
      ghost.shrink();
      ghost.move();

      // NEW! Go through the entire pumpkin array and try to pollinate the pumpkins!
      // Note that we use j in our for-loop here because we're already inside
      // a for-loop using i!
      for (let j = 0; j < garden.pumpkins.length; j++) {
        let pumpkin = garden.pumpkins[j];
        ghost.tryToPollinate(pumpkin);
      }

      // Display the ghost
      ghost.display();
    }
  }
}
