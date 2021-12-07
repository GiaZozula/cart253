class Conveyorbelt {
  // Create a new Dropzone object
  constructor() {
    this.x = 600;
    this.y = 600;
    this.height = 375;
    this.width = 1200;
    this.topEdge = 400;
    this.bottomEdge = 750;
    this.padding = 50;
    this.outOfBounds = false;
    this.stroke = 255;
    this.fill = 0;
  }

  display() {
    // to check overlap for UI feedback
    // if (
    //   mouseX > this.x - this.width / 2 &&
    //   mouseX < this.x + this.width / 2 &&
    //   mouseY > this.y - this.height / 2 &&
    //   mouseY < this.y + this.height / 2
    // ) {
    //   this.fill = color(255);
    // } else {
    //   this.fill = color(0);
    // }
    //this draws the product deposit conveyor belt
    push();
    rectMode(CENTER);
    stroke(this.stroke);
    fill(this.fill);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  //
  // // //https://editor.p5js.org/pippinbarr/sketches/fVWa_F6j2
  //
  checkOverlap(product) {
    if (
      (product.x > this.x - this.width / 2 &&
        product.x < this.x + this.width / 2 &&
        product.y > this.y - this.height / 2 &&
        product.y < this.y + this.height / 2) ||
      dropzone.overlap
    ) {
      this.outOfBounds = false;
    } else {
      this.outOfBounds = true;
      // let index = products.indexOf(product);
      // products.splice(index, 1);
    }
  }
}
