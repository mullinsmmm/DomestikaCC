const canvasSketch = require('canvas-sketch');

//Setup
const settings = {
  dimensions: [1080, 1080],
};

//sketch function
const sketch = () => {
  //render Function
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);
