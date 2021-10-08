/**
~~looking for luvv!~~ <3 <3
Gia

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

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

let popupscreen = {
  x: 250,
  y: 250,
  w: 500,
  h: 100,
};

let state = `title`; //Can be title, simulation, love, and sadness

/**
Description of preload
*/
function preload() {}

/**
Description of setup
*/
function setup() {
  createCanvas(500, 500);
  setupCircles();
}

function setupCircles() {
  // position circles seperated from one another
  circle1.x = width / 5;
  circle2.x = (2 * width) / 5;
}

/**
Description of draw()
*/
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

function title() {
  push();
  textSize(64);
  fill(200, 100, 100);
  textAlign(CENTER, CENTER);
  text(`LOVE?`, width / 2, height / 2);
  pop();
}

function simulation() {
  move();
  checkOffscreen();
  checkOverlap();
  display();
}

function love() {
  // background for the text
  push();
  fill(0, 0, 0);
  rectMode(CENTER);
  rect(popupscreen.x, popupscreen.y, popupscreen.w, popupscreen.h);
  pop();

  push();
  textSize(20);
  fill(255, 150, 100);
  textAlign(CENTER, CENTER);
  text(`you managed to wrangle one of your children.`, width / 2, height / 2);
  pop();
}

//an essentially impossible secret ending
function trueparenting() {
  // background for the text
  push();
  fill(0, 0, 0);
  rectMode(CENTER);
  rect(popupscreen.x, popupscreen.y, popupscreen.w, popupscreen.h);
  pop();

  push();
  textSize(20);
  fill(255, 150, 100);
  textAlign(CENTER, CENTER);
  text(`you are a true parent. well done!`, width / 2, height / 2);
  pop();
}

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
  text(`your toddlers escaped! :*(`, width / 2, height / 2);
  pop();
}

function neglect() {
  // background for the text
  push();
  fill(255, 0, 0);
  rectMode(CENTER);
  rect(popupscreen.x, popupscreen.y, popupscreen.w, popupscreen.h);
  pop();

  //text
  push();
  textSize(20);
  fill(0);
  textAlign(CENTER, CENTER);
  text(`don't abandon your kids! wtf!`, width / 2, height / 2);
  pop();
}

function move() {
  //circle1's movement
  circle1.x = map(noise(circle1.tx), 0, 1, 0, width);
  circle1.y = map(noise(circle1.ty), 0, 1, 0, height);

  circle1.tx += 0.009;
  circle1.ty += 0.007;

  //circle3's movement
  circle3.x = map(noise(circle3.tx), 0, 1, 0, width);
  circle3.y = map(noise(circle3.ty), 0, 1, 0, height);

  circle3.tx += 0.009;
  circle3.ty += 0.007;

  //circle2 user controls for movement
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
  //check if the circles have gone offscreen
  if (isOffscreen(circle1) || isOffscreen(circle3)) {
    state = `sadness`;
  }
  if (isOffscreen(circle2)) {
    state = `neglect`;
  }
}

function isOffscreen(circle) {
  if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
    return true;
  } else {
    return false;
  }
}

function checkOverlap() {
  //check if circles overlap
  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
  if (d < circle1.size / 2 + circle2.size / 2) {
    state = `love`;
  }
  let d2 = dist(circle3.x, circle3.y, circle2.x, circle2.y);
  if (d2 < circle3.size / 2 + circle2.size / 2) {
    state = `love`;
  }

  //this is the impossible secret ending, couldn't figure out how to have circle2 "collect" all the children
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
  //display the circles
  fill(240, 70, 100);
  ellipse(circle1.x, circle1.y, circle1.size);
  ellipse(circle2.x, circle2.y, circle2.size);
  ellipse(circle3.x, circle3.y, circle3.size);
}

function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
