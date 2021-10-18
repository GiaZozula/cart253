/**
~~ changed concept ~~
By Gia <3

+ attribution of code from Mads' source, my addition of controls,
then Pippin's adaptation of this idea
*/
let tempFont;

let stars = [];

let star = {
  x: 700,
  y: 400,
  fill: 255,
  size: 3,
};

let centerPoint = {
  x: 700,
  y: 400,
};

let user = {
  // The centre
  x: 700,
  y: 400,
  // How far out from the center our thing rotates
  radius: 350,
  // How big is it
  size: 100,
  // What is the current rotation around the circle?
  rotation: 0,
  // How fast is it rotating
  rotationSpeed: 0.0,
  //determine the direction
  leftSpeed: 0.06,
  rightSpeed: -0.06,
};

let bullet = {
  //starts on the user
  x: user.x,
  y: user.y,
  radius: user.radius,
  //how big is it?
  size: 50,
  //rotates at the same speed as the user
  rotation: user.rotation,
  //speed of the bullet when shot
  speed: 5,
};

function setup() {
  createCanvas(1400, 800);
  // noCursor();
}

function draw() {
  background(0);

  drawStarfield();

  handleShooting();

  handleDirection();

  drawTrack();

  drawUser();

  drawBullet();

  // Rotate according to the current speed
  user.rotation += user.rotationSpeed;
}

function drawStarfield() {
  //building a for loop (based off of the arrays course material) for the stars
  for (let i = 0; i < 50; i++) {
    drawStar(stars[i]);
  }
}

//draw a single star
function drawStar() {
  push();
  noStroke();
  fill(star.fill);
  ellipse(random(0, width), random(0, height), star.size);
  pop();
}

/**
Draws the track our user moves on
*/
function drawTrack() {
  push();
  stroke(255);
  noFill();
  translate(user.x, user.y);
  ellipse(0, 0, user.radius * 2);
  pop();
}

/**
Draws our rotating object
*/
function drawUser() {
  push();
  noStroke();
  fill(255, 0, 0);
  // Translate to the centre of rotation
  translate(user.x, user.y);
  // Rotate our object by its current rotation
  rotate(user.rotation);
  // Now translate by the radius so we can draw it on the edge
  // of the circle
  translate(user.radius, 0);
  // Finally draw the user (at 0,0 because we translated the origin)
  ellipse(0, 0, user.size);
  pop();
}

function drawBullet() {
  push();
  noStroke();
  fill(0, 0, 255);
  //translate to user's position
  translate(bullet.x, bullet.y);
  //have it follow the user when not fired
  rotate(user.rotation);
  //Translate by the radius so its drawn on the edge of the circle
  translate(bullet.radius, 0);
  //draw the bullet at 0,0 because it has been translated
  ellipse(0, 0, bullet.size);
  pop();
}

function drawStars() {
  push();
  noStroke();
  fill(255);
  translate(user.x, user.y);
  ellipse(0, 0, star.size);
  pop();
}

//use the up arrow to shoot
function handleShooting() {
  if (keyIsDown(UP_ARROW)) {
    push();
    translate(centerPoint.x, centerPoint.y);
    bullet.x = bullet.x + bullet.speed;
    bullet.y = bullet.y + bullet.speed;
    pop();
  }
}

/**
Change the rotation speed based on arrow keys
*/
function handleDirection() {
  if (keyIsDown(LEFT_ARROW)) {
    // Left means accelerate in the negative
    user.rotationSpeed = user.leftSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // Right means accelerate in the positive
    user.rotationSpeed = user.rightSpeed;
  } else {
    user.rotationSpeed = 0;
  }
}
