class Santa {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.size = 200;
    this.speed = 10;
    this.growRate = 0.5; //how much bigger it gets each frame
    this.jitteriness = 0.1; // How likely santa is to change direction
  }

  //this causes santa to wander around destroying pumpkins
  tryToDestroy(pumpkin) {
    // Calculate the distance between Santa and the pumpkin
    let d = dist(this.x, this.y, pumpkin.x, pumpkin.y);
    // If they overlap...
    if (d < this.size / 2 + pumpkin.size / 2) {
      this.grow();
      // The pumpkin should react to being destroyed so we call its method
      // that handles that!
      pumpkin.destroy();
    }
  }

  // grow() causes the witch to get bigger up to a maximum (called by tryToPollinate())
  grow() {
    // Grow by increasing the size by a set amount
    this.size = this.size + this.growRate;
  }

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

  display() {
    push();
    imageMode(CENTER);
    image(santaImg, this.x, this.y, this.size, this.size * 1.5);
    pop();
  }
}
