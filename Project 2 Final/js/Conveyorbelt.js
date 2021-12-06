class Conveyorbelt {
  // Create a new Dropzone object
  constructor() {
    this.x = 400;
    this.y = 750;
    this.topEdge = 400;
    this.bottomEdge = 750;
    this.padding = 50;
    this.overlap = false;
    this.stroke = 255;
    this.fill = 0;
  }

  display() {
    //to check overlap for UI feedback
    if (
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2
    ) {
      this.fill = color(0, 0, 0);
    } else {
      this.fill = color(255);
    }
    //this draws the product deposit conveyor belt
    push();
    // rectMode(CENTER);
    stroke(this.stroke);
    fill(0);
    rect(0, this.topEdge, width, this.bottomEdge / 2);
    pop();
  }
  //
  // // //https://editor.p5js.org/pippinbarr/sketches/fVWa_F6j2
  //
  // checkOverlap(product) {
  //   if (
  //     product.x > this.x - this.width / 2 &&
  //     product.x < this.x + this.width / 2 &&
  //     product.y > this.y - this.height / 2 &&
  //     product.y < this.y + this.height / 2
  //   ) {
  //     product.vx = 0;
  //     product.vy += -15;
  //     this.overlap = true;
  //   } else {
  //     this.overlap = false;
  //   }
  // }
}
