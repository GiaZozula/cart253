class Dropzone {
  // Create a new Dropzone object
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 650;
    this.overlap = false;
    this.stroke = 255;
    this.fill = 255;
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
    rectMode(CENTER);
    stroke(this.stroke);
    fill(this.fill, 0, 0);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  // //https://editor.p5js.org/pippinbarr/sketches/fVWa_F6j2

  checkOverlap(product) {
    if (
      product.x > this.x - this.width / 2 &&
      product.x < this.x + this.width / 2 &&
      product.y > this.y - this.height / 2 &&
      product.y < this.y + this.height / 2
    ) {
      product.canBeClicked = false;
      product.vx = 0;
      product.vy += -15;
      this.overlap = true;
    } else {
      this.fill = color(255);
      this.overlap = false;
    }
  }

  checkColour(product) {
    if (this.overlap == true && product.colour == currentOrder) {
      print("correct order");
      rentbar.width += 10;
    } else if (conveyorbelt.onBelt) {
      //this is what happens when a product is picked up but put back down on the conveyor belt (to stop it from reducing points)
      print("dontworry");
    } else {
      print("incorrect order");
      rentbar.width -= 10;
    }
  }
}
