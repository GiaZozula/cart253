class Candy {
  constructor(x, y) {
    this.x = mouseX;
    this.y = mouseY;
    this.size = 40;
  }

  display() {
    push();
    imageMode(CENTER);
    image(candyImg, this.x, this.y);
    pop();
  }
}
