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
    this.overlap = true;
    this.outOfBounds = false;
    this.stroke = 255;
    this.fill = 0;
    this.hboxX = 0;
    this.hboxY = 0;
    this.hboxH = 425;
    this.hboxW = 1200;
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
    rectMode(CORNER);
    stroke(this.stroke);
    fill(100);
    rect(this.hboxX, this.hboxY, this.hboxW, this.hboxH);
    pop();
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
      this.overlap = true;
    } else {
      // print("dsjkf");
      this.overlap = false;
    }
  }

  checkOutOfBounds() {
    if (
      (product.x > this.hboxX - this.hboxW / 2 &&
        product.x < this.hboxX + this.hboxW / 2 &&
        product.y > this.hboxY - this.hboxH / 2 &&
        product.y < this.hboxY + this.hboxH / 2) ||
      !dropzone.overlap
    ) {
      print("dsjkf");
      this.outOfBounds = true;
    } else {
      this.outOfBounds = false;
    }
  }
}
