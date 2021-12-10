/**
Exercise: Progress Report
Project 2 Prototype
Gia ~~

This is a prototype of a game that simulates (in a very reduced, gamified manner) the stress of working at a warehouse like Amazon.
The player has to respond to orders from the boss, using conveyor belts.

To be added:
- fix timer starting too early
- check if there is already something being picked up
- take out "ARE YOU READY TO WORK", add black image behind tv for that part
- add a reset state button to go back to intro

- add graphical assets for dropzone, conveyorbelt
- add graphical assets for intro state (title screen)
- add sound FX for dropping and picking up items,
- add voice sfx for "ARE U READY" "YOU'RE HIRED!" "ITS A COMPETITIVE MARKET"
- WELCOME TO YOUR ABJECT WORKPLACE
- add music (sync'd if I have time)
-purple smoke
- DO WRITEUP
- Clean up code



Extras:
- ensure that there is always at least one of any given colour
    - go thru array, if (!product.colour == )
STATES IDEAS
- have an intro state with a series of visuals explaining the story?
- could add a "PRESS ENTER TO SKIP" that brings you to the title screen
  - during title screen could add a button for bringing up controls
- Fail state version changes depending on where they got (food, rent, healthcare, childcare) if time runs out


- faliure to put the right object on the drop zone/dropping it off the converyor = reduced time
- correct adds time
- add more spawns to the array, keep it full
- load images for products in a sequenced array (they all need the same filename with a diff #)

- graphics ideas:
- Bezos photo (EMPLOYEE  OF THE MONTH)
- time SFX to song (with cue?)
  - need to make a graphic for the rentbar with notches indicating how far the user has gotten
  - in order to keep the program lightweight, maybe steer away from heavy gifs.
  - for VFX, using animated opacity could be interesting (steam, dust, smoke, etc)
  - for the converyor belt, use the idea of the arrows
  - for the dropzone, having different colours to indicate a correct or incorrect object could be interesting
  - flashing rent bar when low / along with sfx


*/

"use strict";

let state = "title";

// this is a list of possible orders that are stored in an array
let orders = ["RED", "BLUE", "GREEN", "YELLOW"];

//this is the starting order, that will be replaced once the game begins
let currentOrder = "YOU READY TO WORK?!";

//this is an object that counts the time (going up)
let gameCounter;
//this sets the max amount of time for the game to be completed within (millis)
//if we subtract the gameTimer from the timeLimit, we will get how much time is left
let maxTime = 30;
//give the Timer a font
let gameTimerFont;
let font2;
//give the Timer some properties
let gameTimerXY = {
  x: 1100,
  y: 50,
};

let countDown;

//this sets a timer, and ties it to the orders changing
let orderTimer = 3000;
let orderChange = orderTimer;

let titleCounterStart;
let titleCounterEnd;
let titleCounterTotal;

//this changes if the clicked order corresponds to the one displayed
//but is currently not implemented in this prototype version
let correctOrder = false;

//this sets up the variables and array for all of the products
//currently, they are named after products, even though they
//are just all different colour squares. This will be changed.
let products = [];
let numProducts = 25;
let dropzone = undefined;

let conveyorbelt = undefined;

//title state graphics + variables
let titleCard;
let titleBg;
let buttonImg;
let buttonInImg;
let controlCardImg;
let controlCard = {
  x: 0,
  y: 0,
  width: 1200,
  height: 800,
};
let button = {
  x: 1050,
  y: 700,
  width: 350,
  height: 100,
};

//HUD elements declared
let rentbar = undefined;

//graphics elements
let bg;

//overlay graphics variables
let smoke = {
  x: 0,
  y: 0,
  speed: 2,
};
let noiseOverlay;

let tv;

let tvProps = {
  x: 0,
  y: 0,
  h: 0,
  y: 0,
};

let tvScreen = {
  x: 210,
  y: 250,
  h: 160,
  w: 160,
};

let yellowImg;
let blueImg;
let greenImg;
let redImg;

let skully;
let skullb;
let skullg;
let skullr;

let bgGif;

let grossFrame;

//audio variables
let gameSong = {
  isplaying: false,
};
let yellowMp3 = {
  isplaying: false,
};
let blueMp3 = {
  isplaying: false,
};
let redMp3 = {
  isplaying: false,
};
let greenMp3 = {
  isplaying: false,
};
let areYouReady = {
  isplaying: false,
};
let workMp3 = {
  isplaying: false,
};

let showReadyText = false;
let showWorkText = false;

function preload() {
  //preload fonts
  gameTimerFont = loadFont("assets/font.ttf");
  font2 = loadFont("assets/font2.ttf");

  //preload title screen graphics
  titleCard = loadImage("assets/images/title.png");
  buttonImg = loadImage("assets/images/howtoplay.png");
  buttonInImg = loadImage("assets/images/howtoplaypressed.png");
  controlCardImg = loadImage("assets/images/controls.png");
  titleBg = loadImage("assets/images/titlebg.png");

  //preload tv screen images
  yellowImg = loadImage("assets/images/yellow.gif");
  blueImg = loadImage("assets/images/blue.gif");
  greenImg = loadImage("assets/images/green.gif");
  redImg = loadImage("assets/images/red.gif");

  //preload products images
  skully = loadImage("assets/images/skully.png");
  skullb = loadImage("assets/images/skullb.png");
  skullg = loadImage("assets/images/skullg.png");
  skullr = loadImage("assets/images/skullr.png");

  bgGif = loadImage("assets/images/bggif.gif");
  tv = loadImage("assets/images/tv.png");
  grossFrame = loadImage("assets/images/grossframe.png");

  //gfx overlays
  noiseOverlay = loadImage("assets/images/noise.gif");
  smoke = loadImage("assets/images/smoke.png");

  //preload audio
  gameSong = loadSound("assets/sounds/gameSong.mp3");
  yellowMp3 = loadSound("assets/sounds/yellow.mp3");
  blueMp3 = loadSound("assets/sounds/blue.mp3");
  redMp3 = loadSound("assets/sounds/red.mp3");
  greenMp3 = loadSound("assets/sounds/green.mp3");
  areYouReady = loadSound("assets/sounds/areyouready.mp3");
  workMp3 = loadSound("assets/sounds/work.mp3");
}

//SET UP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function setup() {
  createCanvas(1200, 800);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(50);
  userStartAudio();

  //adding audio cues for some intro cards, adapted from class notes
  areYouReady.addCue(0.1, showReady);
  areYouReady.addCue(0.3, hideReady);
  workMp3.addCue(0.3, showWork);
  workMp3.addCue(0.4, hideWork);

  //create the Dropzone
  let x = 800;
  let y = 0;
  dropzone = new Dropzone(x, y);

  conveyorbelt = new Conveyorbelt();

  //HUD elements setup
  rentbar = new Rentbar(x, y);

  // Create the correct number of products and put them in our array
  //some of this code was adapted from a CodeTrain video about overlapping circles
  while (products.length < numProducts)
    for (let i = 0; i < numProducts; i++) {
      let x = random(0, width);
      //this keeps them within the conveyor belt boundary
      let y = constrain(
        random(conveyorbelt.topEdge + conveyorbelt.padding, height),
        conveyorbelt.topEdge,
        conveyorbelt.bottomEdge - conveyorbelt.padding
      );
      let product = new Product(x, y);

      let overlapping = false;
      for (let j = 0; j < products.length; j++) {
        let other = products[j];
        let d = dist(product.x, product.y, other.x, other.y);
        if (d < 35) {
          print("THEYREOVERLAPPIN");
          overlapping = true;
          break;
        }
      }
      if (!overlapping) {
        products.push(product);
      }
    }

  //assign a velocity and colour to the products
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.vx = product.speed;
    let r = random(0, 1);
    if (r < 0.25) {
      product.colour = "RED";
    } else if (r > 0.25 && r < 0.5) {
      product.colour = "BLUE";
    } else if (r > 0.5 && r < 0.75) {
      product.colour = "GREEN";
    } else {
      product.colour = "YELLOW";
    }
  }
}

// DRAW ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function draw() {
  // Called when the appropriate cue is triggered!
  function showReady() {
    showReadyText = true;
  }

  // Called when the appropriate cue is triggered!
  function hideReady() {
    showReadyText = false;
  }
  // Called when the appropriate cue is triggered!
  function showWork() {
    showWorkText = true;
  }

  // Called when the appropriate cue is triggered!
  function hideWork() {
    showWorkText = false;
  }

  //set the cursor
  if (mouseIsPressed) {
    cursor("grabbing");
  } else {
    cursor("grab");
  }

  //State switching !
  if (state === "title") {
    drawTitle();
  } else if (state === "game") {
    drawGame();
  } else if (state === "win") {
    drawWin();
  } else if (state === `gameover`) {
    drawGameover();
  }
}

function drawTitle() {
  background(titleBg);
  blueMp3.stop();
  greenMp3.stop();
  yellowMp3.stop();
  redMp3.stop();

  // titleCard;
  // buttonImg;
  // buttonInImg;
  // controlCard;

  //this draws the start title
  push();
  imageMode(CENTER);
  image(titleCard, width / 2, height / 2);
  pop();

  push();

  imageMode(CENTER);
  image(buttonImg, button.x, button.y);
  if (
    mouseX > button.x - button.width / 2 &&
    mouseX < button.x + button.width / 2 &&
    mouseY > button.y - button.height / 2 &&
    mouseY < button.y + button.height / 2
  ) {
    image(buttonInImg, button.x, button.y);
    // image(controlCardImg, controlCard.x, controlCard.y);
  }
  pop();
  // image(controlCard, 0, 0);
  titleCounterStart = millis();
  // print(titleCounterStart / 1000);
}

function drawWin() {
  background(0);
  blueMp3.stop();
  greenMp3.stop();
  yellowMp3.stop();
  redMp3.stop();

  //this draws the win title
  push();
  textFont(font2);
  fill(255, 0, 0);
  stroke(0);
  textSize(100);
  text("YOU WIN", width / 2, height / 2);
  pop();
}

function drawGameover() {
  background(0);
  blueMp3.stop();
  greenMp3.stop();
  yellowMp3.stop();
  redMp3.stop();

  //this draws the end title
  push();
  textFont(font2);
  fill(255, 0, 0);
  stroke(0);
  textSize(100);
  text("YOU LOSE", width / 2, height / 2);
  pop();
}

// DRAW THE "GAME" STATE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function drawGame() {
  background(bgGif);
  songCheck();

  if (showReadyText) {
    push();
    textFont(font2);
    fill(255);
    textSize(100);
    textAlign(CENTER, CENTER);
    text("ARE YOU READY?", width / 2, height / 2);
    pop();
  }

  if (showWorkText) {
    push();
    textFont(font2);
    fill(255);
    textSize(150);
    textAlign(CENTER, CENTER);
    text("WORK!", width / 2, height / 2);
    pop();
  }

  gameOverCheck();
  winCheck();

  // this displays the conveyor belt
  conveyorbelt.display();

  //this displays the dropzone
  dropzone.display();

  //display and play all of the assets related to the orders --
  // colours for tv
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    if (currentOrder === "RED") {
      image(redImg, tvScreen.x, tvScreen.y, tvScreen.w, tvScreen.h);
      // switch all of the other booleans off (so they can be turned on again if necessary)
      blueMp3.isplaying = false;
      greenMp3.isplaying = false;
      yellowMp3.isplaying = false;
      blueMp3.stop();
      greenMp3.stop();
      yellowMp3.stop();
      //play the corresponding colour audio
      if (!redMp3.isplaying) {
        redMp3.loop();
        redMp3.setVolume(0.5);
        redMp3.isplaying = true;
      }
    } else if (currentOrder === "BLUE") {
      image(blueImg, tvScreen.x, tvScreen.y, tvScreen.w, tvScreen.h);
      redMp3.isplaying = false;
      greenMp3.isplaying = false;
      yellowMp3.isplaying = false;
      greenMp3.stop();
      yellowMp3.stop();
      redMp3.stop();
      if (!blueMp3.isplaying) {
        blueMp3.loop();
        blueMp3.setVolume(0.5);
        blueMp3.isplaying = true;
      }
    } else if (currentOrder === "GREEN") {
      image(greenImg, tvScreen.x, tvScreen.y, tvScreen.w, tvScreen.h);
      blueMp3.isplaying = false;
      redMp3.isplaying = false;
      yellowMp3.isplaying = false;
      blueMp3.stop();
      yellowMp3.stop();
      redMp3.stop();
      if (!greenMp3.isplaying) {
        greenMp3.loop();
        greenMp3.setVolume(0.5);
        greenMp3.isplaying = true;
      }
    } else if (currentOrder === "YELLOW") {
      image(yellowImg, tvScreen.x, tvScreen.y, tvScreen.w, tvScreen.h);
      blueMp3.isplaying = false;
      redMp3.isplaying = false;
      greenMp3.isplaying = false;
      blueMp3.stop();
      greenMp3.stop();
      redMp3.stop();
      if (!yellowMp3.isplaying) {
        yellowMp3.loop();
        yellowMp3.setVolume(0.5);
        yellowMp3.isplaying = true;
      }
    }
  }

  //display tv
  image(tv, tvProps.x, tvProps.y, tvProps.h, tvProps.w);
  tvProps.x += sin(millis() / 80);
  tvProps.y += sin(millis() / 100);

  //smoke graphic
  push();
  tint(255, 127 * sin(millis() / 1000));
  image(smoke, 0, 0);
  smoke.x += smoke.speed;
  // Wrap the smoke onceit reaches the right edge
  //
  // if (smoke.x > width) {
  //   smoke.x -= width;
  // }

  pop();

  // this displays the conveyor belt
  conveyorbelt.display();

  //this displays the dropzone
  dropzone.display();

  //displays the product
  for (let i = products.length - 1; i >= 0; i--) {
    // for (let i = 0; i < products.length; i++) {
    let product = products[i];
    product.move();
    product.wrap();
    product.display();

    //delete the product from the array if it reaches the edge of the screen
    if (product.isOffScreen === true) {
      products.splice(i, 1);
    }
  }

  //this displays the Rentbar
  rentbar.display();

  //display tv
  image(tv, tvProps.x, tvProps.y, tvProps.h, tvProps.w);
  tvProps.x += sin(millis() / 100);
  tvProps.y += sin(millis() / 150);

  //noise overlay
  push();
  blendMode(SCREEN);
  image(noiseOverlay, 0, 0);
  pop();
  //

  //this begins the main counter for the game
  gameCounter = millis();
  // print(gameCounter / 1000);
  //divide the millis into an integer
  gameCounter = int(gameCounter / 1000);

  countDown = maxTime - gameCounter;

  //this draws the gameTimer
  push();
  textFont(gameTimerFont);
  fill(255);
  stroke(0);
  textSize(100);
  text(countDown, gameTimerXY.x, gameTimerXY.y);
  pop();

  //this changes the gamestate if time runs out
  function gameOverCheck() {
    if (countDown <= "0" || rentbar.width <= 0) {
      state = "gameover";
    }
  }

  //this checks if enough time has passed before changing the order
  if (millis() > orderChange) {
    currentOrder = random(orders);
    let r = random(0, 1);

    //attempting to add some randomness to the duration of the timer
    // if (r < 0.5) {
    orderChange = millis() + orderTimer;
    // }
  }

  //this displays the order
  text(currentOrder, width / 2, height - 50);

  //this changes the gamestate if time runs out
  function winCheck() {
    if (rentbar.width >= rentbar.win) {
      state = "win";
    }
  }

  //
  // shrink();
}

//this controls the drag and drop input of the mouse
function mousePressed() {
  if (state === "title") {
    state = "game";
    // titleCounterEnd = titleCounterStart;
    // titleCounterStart = 0;
    // titleCounterEnd = titleCounterTotal;
    // print(titleCounterTotal);
  } else if (state === "game") {
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      product.mousePressed();
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    if (product.isBeingDragged) {
      dropzone.checkOverlap(product);
      conveyorbelt.checkOutOfBounds(product);
      conveyorbelt.checkOnBelt(product);
      dropzone.checkColour(product);
    }
    product.mouseReleased();
  }
}

function displayControl() {
  if (
    mouseX > button.x - button.width / 2 &&
    mouseX < button.x + button.width / 2 &&
    mouseY > button.y - button.height / 2 &&
    mouseY < button.y + button.height / 2
  ) {
    image(controlCard, 0, 0);
  }
}

function songCheck() {
  if (!gameSong.isplaying) {
    gameSong.play();
    gameSong.isplaying = true;
  }
}

// function shrink() {
//   for (let i = products.length - 1; i >= 0; i--) {
//     let product = products[i];
//     if (conveyorbelt.outOfBounds) {
//       product.width = 10;
//       product.height = 10;
//     }
//   }
// }
