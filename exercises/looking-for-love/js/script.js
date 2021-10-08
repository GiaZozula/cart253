/**
~~CAN U WRANGLE YR KIDS?~~ (looking-for-love exercise)
Gia <3

You play a parent desperately trying to wrangle a couple of hyper kids.
*/

"use strict";

//child 1 is circle1
let circle1 = {
  x: undefined,
  y: 100,
  size: 10,
  vx: 0,
  vy: 0,
  speed: 2,
  tx: 130,
  ty: 11,
};

//parent is circle2
let circle2 = {
  x: 250,
  y: 250,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 0.8,
  tx: 400,
  ty: 10,
};

//child 2 is circle2
let circle3 = {
  x: undefined,
  y: 450,
  size: 10,
  vx: 0,
  vy: 0,
  speed: 0.8,
  tx: 400,
  ty: 10,
};

//this is used as a background for the end states
let popupscreen = {
  x: 250,
  y: 250,
  w: 500,
  h: 100,
};

//this is used to fluctuate the colours of the circles
let blueInc = 0;

//starting at the title
let state = `title`;

/**
setting up the canvas and circles
*/
function setup() {
  createCanvas(500, 500);
  setupCircles();
}

function setupCircles() {
  // position circles seperated from one another
  circle1.x = width / 5;
  circle2.x = (2 * width) / 5;
  circle3.x = width / 2;
}

// setting up all the states
function draw() {
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `love`) {
    love();
  } else if (state === `trueparenting`) {
    trueparenting();
  } else if (state === `sadness`) {
    sadness();
  } else if (state === `neglect`) {
    neglect();
  }
}

//title state
function title() {
  push();
  textSize(40);
  fill(0, 0, 0);
  textFont("Oswald");
  textAlign(CENTER, CENTER);
  text(`CAN U WRANGLE YR KIDS?`, width / 2, height / 2);
  pop();
}

//simulation state
function simulation() {
  move();
  checkOffscreen();
  checkOverlap();
  display();
}

//love state
function love() {
  // background for the text
  push();
  fill(0, 0, 0);
  rectMode(CENTER);
  rect(popupscreen.x, popupscreen.y, popupscreen.w, popupscreen.h);
  pop();

  push();
  textSize(20);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  text(`You managed to wrangle one of your children.`, width / 2, height / 2);
  pop();
}

//trueparenting state
//a very difficult but not impossible secret ending (i actually managed it a couple of times! flukey!)
function trueparenting() {
  // background for the text
  push();
  fill(0, 0, 0);
  rectMode(CENTER);
  rect(popupscreen.x, popupscreen.y, popupscreen.w, popupscreen.h);
  pop();

  push();
  textSize(20);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  text(`You are a true parent. Well done!`, width / 2, height / 2);
  pop();
}

//sadness state
function sadness() {
  // background for the text
  push();
  fill(255, 0, 0);
  rectMode(CENTER);
  rect(popupscreen.x, popupscreen.y, popupscreen.w, popupscreen.h);
  pop();

  push();
  textSize(20);
  fill(150, 150, 255);
  textAlign(CENTER, CENTER);
  text(`Your toddlers escaped! :*(`, width / 2, height / 2);
  pop();
}

//neglect state, also a semi 'secret' ending
function neglect() {
  // background for the text
  push();
  stroke(255, 255, 255);
  fill(255, 0, 0);
  rectMode(CENTER);
  rect(popupscreen.x, popupscreen.y, popupscreen.w, popupscreen.h);
  pop();

  //text
  push();
  textFont("Oswald");
  textSize(30);
  fill(255, 255, 255);
  textAlign(CENTER, CENTER);
  text(`DON'T ABANDON YOUR KIDS! WTF!`, width / 2, height / 2);
  pop();
}

function move() {
  //circle1's movement based off of noise
  circle1.x = map(noise(circle1.tx), 0, 1, 0, width);
  circle1.y = map(noise(circle1.ty), 0, 1, 0, height);

  circle1.tx += 0.009;
  circle1.ty += 0.007;

  //circle3's movement based off of noise
  circle3.x = map(noise(circle3.tx), 0, 1, 0, width);
  circle3.y = map(noise(circle3.ty), 0, 1, 0, height);

  circle3.tx += 0.009;
  circle3.ty += 0.007;

  //circle2 is the user, keyboard controls for movement
  if (keyIsDown(LEFT_ARROW)) {
    circle2.vx = -circle2.speed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    circle2.vx = circle2.speed;
  } else {
    circle2.vx = 0;
  }

  if (keyIsDown(UP_ARROW)) {
    circle2.vy = -circle2.speed;
  } else if (keyIsDown(DOWN_ARROW)) {
    circle2.vy = circle2.speed;
  } else {
    circle2.vy = 0;
  }

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}

function checkOffscreen() {
  //check if the children circles have gone offscreen
  if (isOffscreen(circle1) || isOffscreen(circle3)) {
    state = `sadness`;
  }
  //check if the parent circle has gone offscreen
  if (isOffscreen(circle2)) {
    state = `neglect`;
  }
}

//using a return value for the isOffscreen function
function isOffscreen(circle) {
  if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
    return true;
  } else {
    return false;
  }
}

//check if the circles overlap
function checkOverlap() {
  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
  if (d < circle1.size / 2 + circle2.size / 2) {
    state = `love`;
  }
  let d2 = dist(circle3.x, circle3.y, circle2.x, circle2.y);
  if (d2 < circle3.size / 2 + circle2.size / 2) {
    state = `love`;
  }

  //this is the secret ending.
  //couldn't figure out how to have circle2 "collect" all the children so this is rather difficult to achieve
  let d3 = dist(
    circle1.x,
    circle1.y,
    circle2.x,
    circle2.y,
    circle3.x,
    circle3.y
  );
  if (d3 < circle1.size / 2 + circle2.size / 2 + circle3.size) {
    state = `trueparenting`;
  }
}

function display() {
  //display the 'children' circle1 and circle 3
  // using blueInc to add fluctuating colour for circle 1 and 3.
  //got the basic idea from Allison Parish's creative coding website
  push();
  noStroke();
  fill(sin(blueInc) * 255, 100, 255);
  blueInc += 0.05;
  ellipse(circle1.x, circle1.y, circle1.size);
  ellipse(circle3.x, circle3.y, circle3.size);
  pop();

  //display the 'parent' circle2
  push();
  fill(sin(blueInc) * 255, 0, 0);
  blueInc += 0.05;
  ellipse(circle2.x, circle2.y, circle2.size);
  pop();
}

//get the game started :D
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
