/**
SPIRIT HALLOWEEN (juggle garden exercise)
By Gia <3

pixel graphics are by me :)

*/

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
  //array for the witches
  witches: [],
  // how many witches in the garden?
  numWitches: 8,
  // The color of the grass (background)
  grassColor: {
    r: 120,
    g: 180,
    b: 120,
  },
};

let splashScreen = {
  background: {
    r: 241,
    g: 100,
    b: 46,
  },
  //text in the title screens
  text: {
    line1: `Keep the spirit of Halloween going!`,
    line2: `You have 13 seconds to survive...`,
    line3: `Click to Begin!!`,
    line4: `Oh no! Now its Christmas!`,
    line5: `Hooray!!`,
    line6: `Christmas has been cancelled!`,
    line7: `Halloween forever!`,
    width: 300,
    height: 300,
    size: 20,
    fill: 0,
  },
  //banner properties
  banner: {
    x: 300,
    y: 200,
    width: 300,
    height: 120,
  },
  //frame properties
  frame: {
    stroke: 0,
    thickness: 3,
    x: 300,
    y: 300,
    width: 580,
    height: 580,
  },
};

let candy = {
  x: undefined,
  y: undefined,
  size: 50,
};

//let font and images
let font;
let bannerImg;
let ghostImg;
let pumpkinImg;
let witchImg;
let candyImg;

//set the starting state
let state = `game`;

//preload all of the assets for the game
function preload() {
  font = loadFont("assets/fonts/font.otf");
  bannerImg = loadImage("assets/images/banner.png");
  ghostImg = loadImage("assets/images/ghost.png");
  pumpkinImg = loadImage("assets/images/pumpkin.png");
  witchImg = loadImage("assets/images/witch.png");
  candyImg = loadImage("assets/images/candy.png");
}

// setup() creates the canvas and the pumpkins in the garden
function setup() {
  createCanvas(600, 600);

  //set the game's font, text, image, rect alignments
  textFont("font");
  textAlign(CENTER);
  imageMode(CENTER);
  rectMode(CENTER);

  // Create our pumpkins by counting up to the number of the pumpkins
  for (let i = 0; i < garden.numPumpkins; i++) {
    // Create variables for our arguments for clarity
    let x = random(0, width);
    let y = random(0, height);
    let size = random(50, 80);
    // Create a new pumpkin using the arguments
    let pumpkin = new Pumpkin(x, y, size);
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

  //create the witches by counting up to their number in an array
  for (let i = 0; i < garden.numWitches; i++) {
    //create variables for our arguements for clarity
    let x = random(0, width);
    let y = random(0, height);
    //make a new witch using the arguements
    let witch = new Witch(x, y);
    // add the witch to the array of witches!
    garden.witches.push(witch);
  }
}

function draw() {
  //start with the appropriate state
  stateSwitcher();
}

function drawGame() {
  // Display the grass
  background(garden.grassColor.r, garden.grassColor.g, garden.grassColor.b);

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
    }

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

  // loop through all the witches in the array and display them
  for (let i = 0; i < garden.witches.length; i++) {
    let witch = garden.witches[i];
    //check if this witch is alive
    if (witch.alive) {
      //shrink and move the witch
      witch.shrink();
      witch.move();
    }

    //go thru pumpkins and try to pollinate them with the witches
    for (let j = 0; j < garden.pumpkins.length; j++) {
      let pumpkin = garden.pumpkins[j];
      witch.tryToPollinate(pumpkin);
    }

    //display the witch!
    witch.display();
  }

  //candy cursor
  push();
  noCursor();
  imageMode(CENTER);
  image(candyImg, mouseX, mouseY, candy.size * 2, candy.size);

  pop();
}

function stateSwitcher() {
  if (state === `title`) {
    drawTitle();
  } else if (state === `game`) {
    drawGame();
  } else if (state === `ending1`) {
    drawEnding1();
  } else if (state === `ending2`) {
    drawEnding2();
  }
}

function drawSplash() {
  //text size
  textSize(splashScreen.text.size);
  //orange background
  background(
    splashScreen.background.r,
    splashScreen.background.g,
    splashScreen.background.b
  );

  //black frame
  push();
  noFill();
  stroke(splashScreen.frame.stroke);
  strokeWeight(splashScreen.frame.thickness);
  rect(
    splashScreen.frame.x,
    splashScreen.frame.y,
    splashScreen.frame.width,
    splashScreen.frame.height
  );
  pop();

  //draw the banner
  image(
    bannerImg,
    splashScreen.banner.x,
    splashScreen.banner.y,
    splashScreen.banner.width,
    splashScreen.banner.height
  );
}

function drawTitle() {
  //background, frame, and banner
  drawSplash();
  //text for the title
  text(
    splashScreen.text.line1,
    splashScreen.text.width,
    splashScreen.text.height + 10
  );
  text(
    splashScreen.text.line2,
    splashScreen.text.width,
    splashScreen.text.height + 50
  );
  text(
    splashScreen.text.line3,
    splashScreen.text.width,
    splashScreen.text.height + 90
  );
}

function drawEnding1() {
  //background, frame, and banner
  drawSplash();
  //text for ending1
  text(
    splashScreen.text.line4,
    splashScreen.text.width,
    splashScreen.text.height + 10
  );
}

function drawEnding2() {
  //background, frame, and banner
  drawSplash();
  //text for ending1
  text(
    splashScreen.text.line5,
    splashScreen.text.width,
    splashScreen.text.height + 10
  );
  text(
    splashScreen.text.line6,
    splashScreen.text.width,
    splashScreen.text.height + 50
  );
  text(
    splashScreen.text.line7,
    splashScreen.text.width,
    splashScreen.text.height + 90
  );
}
