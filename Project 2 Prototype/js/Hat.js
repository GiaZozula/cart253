class Hat extends Product {
  // Create a new Hat object that moves to the right
  constructor(x, y) {
    // Call the Product's constructor()
    // Remember, it's called super() when we call it from a subclass
    super(x, y);
    // Set our properties to the specific Hat values
    this.width = 30;
    this.height = 10;
    this.vx = 10;
  }

  // Display the Hat as a skinny rectangle
  display() {
    // Remember to call the superclass' version of this method!
    super.display();

    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 255, 0);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
