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
  size: 50,
  vx: 0,
  vy: 0,
  speed: 0.2,
  tx: 130,
  ty: 11,
};

let circle2 = {
  x: undefined,
  y: 400,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 0.2,
  tx: 400,
  ty: 10,
};

let circle3 = {
  x: undefined,
  y: undefined,
  size: 100,
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

  // // start circles moving in a random direction
  // circle1.vx = random(-circle1.speed, circle1.speed);
  // circle2.vx = random(-circle2.speed, circle2.speed);
  //
  // circle1.vy = random(-circle1.speed, circle1.speed);
  // circle2.vy = random(-circle2.speed, circle2.speed);
}

/**
Description of draw()
*/
function draw() {
  background(0);

  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `love`) {
    love();
  } else if (state === `sadness`) {
    sadness();
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
  push();
  textSize(64);
  fill(255, 150, 100);
  textAlign(CENTER, CENTER);
  text(`LOVE!`, width / 2, height / 2);
  pop();
}

function sadness() {
  push();
  textSize(64);
  fill(150, 150, 255);
  textAlign(CENTER, CENTER);
  text(`SAD :(`, width / 2, height / 2);
  pop();
}

function move() {
  //move the circles
  // circle1.x += circle1.vx;
  // circle1.y += circle1.vy;
  //
  // circle2.x += circle2.vx;
  // circle2.y += circle2.vy;

  circle1.x = map(noise(circle1.tx), 0, 1, 0, width);
  circle1.y = map(noise(circle1.ty), 0, 1, 0, height);

  circle2.x = map(noise(circle2.tx), 0, 1, 0, width);
  circle2.y = map(noise(circle2.ty), 0, 1, 0, height);

  circle1.tx += 0.0003;
  circle1.ty += 0.003;
  circle2.tx += 0.002;
  circle2.ty += 0.0002;

  //mouse control of circle3
  circle3.x = mouseX;
  circle3.y = mouseY;
}

function checkOffscreen() {
  //check if the circles have gone offscreen
  if (isOffscreen(circle1) || isOffscreen(circle2)) {
    state = `sadness`;
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
  //checj if circles overlap
  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
  if (d < circle1.size / 2 + circle2.size / 2) {
    state = `love`;
  }
}

function display() {
  //display the circles
  ellipse(circle1.x, circle1.y, circle1.size);
  ellipse(circle2.x, circle2.y, circle2.size);

  //display circle3 and give it a colour
  push();
  fill(255, 30, 30);
  ellipse(circle3.x, circle3.y, circle3.size);
  pop();
}

function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
