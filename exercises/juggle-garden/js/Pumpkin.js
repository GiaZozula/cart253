class Pumpkin {
  // The constructor() sets up a pumpkin's properties
  constructor(x, y, size, stemLength, petalColor) {
    // Position and size information
    this.x = x;
    this.y = y;
    this.size = size;
    this.maxSize = size; // NEW! To limit growth
    this.stemLength = stemLength;
    this.stemThickness = 10;
    this.petalThickness = 10;
    this.maxPetalThickness = 10; // NEW! To limit growth
    // Color information
    this.stemColor = {
      r: 50,
      g: 150,
      b: 50,
    };
    this.petalColor = petalColor;
    this.centreColor = {
      r: 50,
      g: 0,
      b: 0,
    };
    this.alive = true;
  }

  // shrink()
  // Shrinks the pumpkin
  shrink() {
    // Choose a random amount to shrink
    let shrinkage = random(0, 0.1);
    // Reduce the petal thickness (divide by 10 to make it less rapid)
    this.petalThickness = this.petalThickness - shrinkage / 10;
    // Reduce the centre of the pumpkin
    this.size = this.size - shrinkage;

    // If any of the key properties reach 0 or less, the pumpkin is dead
    if (this.petalThickness <= 0 || this.size <= 0) {
      this.alive = false;
    }
  }

  // NEW! pollinate() handles the pumpkin being pollinated (it grows)
  pollinate() {
    // Choose a random amount to grow
    let growth = random(0, 0.5);
    // Increase the petal thickness (divide by 10 to make it less rapid)
    this.petalThickness = this.petalThickness + growth / 10;
    // Increase the centre of the pumpkin
    this.size = this.size + growth;

    // Constrain the elements
    this.petalThickness = constrain(
      this.petalThickness,
      0,
      this.maxPetalThickness
    );
    this.size = constrain(this.size, 0, this.maxSize);
  }

  // display()
  // Displays the pumpkin on the canvas
  display() {
    push();
    imageMode(CENTER);
    image(pumpkinImg, this.x, this.y, this.size, this.size);
    pop();
  }
}
