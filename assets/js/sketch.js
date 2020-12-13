var p5sketch = function (p) {
  p.setup = function () {
    p.createCanvas(100, 100);

    p.playing = false;
    p.progress = 0;
    p.wdX = 50;
    p.wdY = 50;

    p.strokeWeight(4);
    p.stroke(255);
    p.fill('rgba(0,0,0,0)');

    p.rect(4, 4,p.wdX,p.wdY);

  }

  p.draw = function () {
    if(p.playing == true) {
      p.clear();
      p.progress++;
      p.wdX = p.progress / 5 % 96;
      p.wdY = p.progress / 5 % 96;
      p.rect(4, 4,p.wdX,p.wdY);
    }
  }

  p.windowResized = function () {
    // console.log('resized');
  }
};