class Pumpkin {
  // The constructor() sets up a pumpkin's properties
  constructor(x, y, size) {
    // Position and size information
    this.x = x;
    this.y = y;
    this.size = size;
    this.maxSize = size; // NEW! To limit growth
    this.alive = true;
  }

  // shrink()
  // Shrinks the pumpkin
  shrink() {
    // Choose a random amount to shrink
    let shrinkage = random(0, 0.1);
    // Reduce the centre of the pumpkin
    this.size = this.size - shrinkage;

    // If any of the key properties reach 0 or less, the pumpkin is dead
    if (this.size <= 0) {
      this.alive = false;
    }
  }

  // NEW! pollinate() handles the pumpkin being pollinated (it grows)
  pollinate() {
    // Choose a random amount to grow
    let growth = random(0, 0.5);
    // Increase the centre of the pumpkin
    this.size = this.size + growth;
    this.size = constrain(this.size, 0, this.maxSize);
  }

  //handles the pumpkin being stomped by Santa
  destroy() {
    this.size = this.size - 20;
    this.alive = false;
  }

  // display()
  // Displays the pumpkin on the canvas
  display() {
    push();
    imageMode(CENTER);
    image(pumpkinImg, this.x, this.y, this.size, this.size);
    pop();
  }

  mousePressed() {
    // Calculate the distance between this pumpkin and the mouse
    let d = dist(this.x, this.y, mouseX, mouseY);
    // Check if the distance is less than the head of the pumpkin
    if (d < this.size / 2) {
      // If it is, this pumpkin was clicked, so increase its stem length
      this.size = this.size + 2;
      this.size = constrain(this.size, 0, this.maxSize);
    }
  }
}
