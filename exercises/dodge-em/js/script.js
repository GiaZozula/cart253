/**
Terrible Horror Game (I'm Sorry)
Gia

Try and escape your Emoji'ed fate. Click to let out a futile scream.
*/

let bg = {
  r: 0,
  g: 0,
  b: 0,
};

//"emojiHitbox" refers to the hitbox for the screamEmoji

let emojiHitbox = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 7,
  fill: 255,
  alpha: 0,
};

//"userHitbox" refers to the hitbox for the screamImage
let userHitbox = {
  x: 250,
  y: 250,
  size: 63,
  vx: 0,
  vy: 0,
  fill: 255,
  alpha: 0,
};

// setting up screamImage, the image representing the userHitbox
let screamImage;

// setting up the classic/horrible Willhelm Scream sound effect
let screamSound;

// number referring to density of the Static effect
let numStatic = 1200;

//preloading images and sounds
function preload() {
  screamImage = loadImage("assets/images/scream.jpg");
  emojiImage = loadImage("assets/images/emojiscream.png");
  soundFormats("mp3", "ogg");
  screamSound = loadSound("assets/sounds/willhelmscream.mp3");
}

/**
Setting up the Canvas size,
random starting point for the emojiHitbox,
and making the cursor invisible
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  emojiHitbox.y = random(0, height);
  emojiHitbox.vx = emojiHitbox.speed;

  noCursor();
}

/**
Drawing all of the elements of this thrilling piece of arthouse horror
*/
function draw() {
  // The background goes from black to red! (scary!)
  background(bg.r, bg.g, bg.b);
  bg.r += +0.1;

  // Thick red static for some reason! (scary?)
  for (let i = 100; i < numStatic; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke("red");
    strokeWeight(6);
    point(x, y);
  }

  // Movement for the emojiHitbox that follows the userHitbox
  if (mouseX < emojiHitbox.x) {
    emojiHitbox.vx = -emojiHitbox.speed;
  } else {
    emojiHitbox.vx = emojiHitbox.speed;
  }

  if (mouseY < emojiHitbox.y) {
    emojiHitbox.vy = -emojiHitbox.speed;
  } else {
    emojiHitbox.vy = emojiHitbox.speed;
  }

  emojiHitbox.x = emojiHitbox.x + emojiHitbox.vx;
  emojiHitbox.y = emojiHitbox.y + emojiHitbox.vy;

  if (emojiHitbox.x > width) {
    emojiHitbox.x = 0;
    emojiHitbox.y = random(0, height);
  }

  // userHitbox Movemment is attached to the mouse
  userHitbox.x = mouseX;
  userHitbox.y = mouseY;

  // This checks to see if a Hitbox has been hit
  let d = dist(userHitbox.x, userHitbox.y, emojiHitbox.x, emojiHitbox.y);
  if (d < emojiHitbox.size / 2 + userHitbox.size / 2) {
    noLoop();
  }

  // "Display" the emojiHitbox and display the emojiImage overtop
  push();
  noStroke();
  fill(emojiHitbox.fill.r, emojiHitbox.fill.g, emojiHitbox.fill.b);
  ellipse(emojiHitbox.x, emojiHitbox.y, emojiHitbox.size, emojiHitbox.alpha);
  imageMode(CENTER);
  image(emojiImage, emojiHitbox.x, emojiHitbox.y, 122, 122);
  pop();

  // "Display" the userHitbox Hitbox and the screamImage overtop
  push();
  noStroke();
  fill(userHitbox.fill, userHitbox.alpha);
  ellipse(userHitbox.x, userHitbox.y, userHitbox.size);
  imageMode(CENTER);
  image(screamImage, mouseX, mouseY);
  pop();
}

// Click to let out a blood curdling cry!
function mousePressed() {
  screamSound.play();
}
