const canvasSketch = require('canvas-sketch');

//Setup
const settings = {
  dimensions: [1080, 1080],
};

//sketch function
const sketch = () => {
  let x, y, w, h;

  //render Function
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    //Declare Parameters
    //0.5 = Half canvas
    //0.1 = 1/10th canvas
    //0.6 = 6/10th canvas
    x = width * 0.5;
    y = height * 0.5;
    w = width * 0.6;
    h = height * 0.1;

    //Drawing rectangle code block
    //save to avoid disrupting code later down
    //Translate points to make rect central
    context.save();
    context.translate(x, y);
    context.translate(w * -0.5, h * -0.5);

    context.strokeStyle = 'red';

    //acturallly draw rect, from top left, along to top right then followed
    //finally adding a stroke
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(w, 0);
    context.lineTo(w, h);
    context.lineTo(0, h);
    context.closePath();
    context.stroke();

    //Restore x,y,w,h to initial declared value
    context.restore();
  };
};

canvasSketch(sketch, settings);
