class Ghost {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.minSize = 0; // If we get smaller than this minimum we're dead
    this.maxSize = 40; // We can't get bigger than this
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.shrinkRate = 0.1; // How much smaller we get each frame
    this.growRate = 0.05; //how much bigger it gets each frame
    this.jitteriness = 0.1; // How likely the ghost is to change direction
    this.alive = true; // The Ghost starts out alive!
  }

  // shrink() causes the ghost to get smaller over time
  shrink() {
    // Shrink by reducing the size by a set amount
    this.size = this.size - this.shrinkRate;
    // Check if we're smaller than the minimum size
    if (this.size < this.minSize) {
      // If so, we're dead
      this.alive = false;
    }
  }

  // tryToPollinate() attempts to pollinate the pumpkin provided as a parameter
  // If pollination succeeds (the two overlap) then both grow
  tryToPollinate(pumpkin) {
    // Calculate the distance between the ghost and the pumpkin
    let d = dist(this.x, this.y, pumpkin.x, pumpkin.y);
    // If they overlap...
    if (d < this.size / 2 + pumpkin.size / 2) {
      // The ghost should grow
      // Notice how we can call OTHER METHODS of the Bee by using "this"
      // So this.grow() calls the grow() method for THIS ghost
      this.grow();
      // The pumpkin should react to being pollinated so we call its method
      // that handles that!
      pumpkin.pollinate();
    }
  }

  // grow() causes the ghost to get bigger up to a maximum (called by tryToPollinate())
  grow() {
    // Grow by increasing the size by a set amount
    this.size = this.size + this.growRate;
    // Constrain the growth to a maximum
    this.size = constrain(this.size, this.minSize, this.maxSize);
  }

  // move() moves the ghost by potentially changing direction
  // and then changing position based on velocity
  move() {
    // First check if we should change direction
    let r = random(0, 1);
    if (r < this.jitteriness) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }

    // Update position with velocity to actually move
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    // Constrain to the canvas (guess it's a walled garden!)
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // display() draws our ghost onto the canvas
  display() {
    push();
    imageMode(CENTER);
    image(ghostImg, this.x, this.y, this.size, this.size * 1.5);
    pop();
  }
}
