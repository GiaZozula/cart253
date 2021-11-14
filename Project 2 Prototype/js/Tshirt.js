// NEW! 1. We show that the Toaster is a subclass of Product by using the
// key word "extends" and then the name of the class it extends
// Our Toaster extends the Product class...
class Tshirt extends Product {
  // Create a new Toaster object that moves to the right
  constructor(x, y) {
    // NEW! 2. We call the Product's constructor() first! Because the Product
    // is the superclass for our Toaster, we call its constructor super()!
    // So super(x,y) means: call the superclass' constructor with arguments
    // x and y (values passed in as arguments when the Toaster is created)
    super(x, y);
    // After using the Product's constructor() we need to set
    // the Product properties to the specific values for a Hat
    this.width = 40;
    this.height = 40;
    this.vx = undefined;
  }

  // 3. We don't need to define move() or wrap() because they are already part
  // of the Product class so our Toaster inherits them

  // 4. We do want to define our display() method because the Toaster
  // has a specific visual appearance: a rectangle with four wheels
  display() {
    // Even though the Product's version of display() does nothing, we should STILL
    // call it. The variable "super" contains a reference to the Product part of this Toaster,
    // so we can call the Product version of the display() method by writing:
    super.display();

    push();
    rectMode(CENTER);
    noStroke();
    fill(0, 0, 255);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
