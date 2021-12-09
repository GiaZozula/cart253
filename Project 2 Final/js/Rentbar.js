class Rentbar {
  constructor(x, y) {
    //this is the default placement and size of the bar's "frame"/stroke
    this.x = 20;
    this.y = 20;
    this.framewidth = 500;
    this.width = 10;
    this.height = 20;
    //if the bar reaches this number, gameover.
    this.min = -1;
    //if the bar reaches this number, victory!
    this.max = 100;
    //adding these variables as milestones to reach
    this.rent = false;
    this.food = false;
    this.childcare = false;
    this.healthcare = false;
    this.win = 500;
  }

  // Display the Rentbar
  display() {
    push();
    fill(255, 0, 0);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
    pop();

    push();
    noFill();
    stroke(255);
    rect(this.x, this.y, this.framewidth, this.height);
    pop();
  }
}
