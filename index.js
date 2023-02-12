//API ELEMENTS USED
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

//SETUP FUNCTION
const settings = {
  dimensions: [1080, 1080],
  //animate: true,
};

//SKETCH FUNCTION
const sketch = () => {
  //Variable Decleration
  let x, y, w, h, fill, stroke, blend;
  let angle, rx, ry;

  //const num = 40;
  //const degrees = -30;

  //const rects = [];

  //const tectColors = [
  //random.pick(risoColors),
  //random.pick(risoColors),
  //random.pick(risoColors),
  //];

  //const bgColor = random.pick(risoColors).hex;

  // for (let i = 0; i < num; i++) {
  //   x = random.range(0, width);
  //   y = random.range(0, height);
  //   w = random.ramge(600, width);
  //   h = random.range(40, 200);

  //   fill = random.pick(rectColors).hex;
  //   stroke = random.pick(rectColors).hex;

  //   blend = random.value() > 0.5 ? 'overlay' : 'source-over';

  //   rects.push({ x, y, w, h, fill, stroke, blend });
  // }

  //RENDER FUNCTION
  return ({ context, width, height }) => {
    // context.fillStyle = bgColor;

    //Background colour
    context.fillStyle = 'pink';
    //Background fill area
    context.fillRect(0, 0, width, height);

    // rects.forEach((rect) => {
    //   const { x, y, w, h, fill, stroke, blend } = rect;
    //   let shadowColor;

    //   context.save();

    //   context.strokestyle = stroke;
    //   context.fillstyle = fill;
    //   context.linewidth = 10;

    //   context.globalCompositeOperation = 'blend';

    //   drawSkewedRect({ context, w, h, degrees });

    //   shadowColor = Color.offsetHSL(fill, 0, 0, -20);
    //   shadowColor.rgba[3] = 0.5;

    //   context.shadowColor = color.style(shadowColor.rgba);
    //   context.shadowOffsetX = -10;
    //   context.shadowOffsetY = 20;

    //   context.fill();

    //   context.shadowColor = null;
    //   context.stroke();

    //   context.globalCompositeOperation = 'source-over';

    //   context.lineWidth = 2;
    //   contextStrokeStyle = 'black';
    //   context.stroke();

    //   context.restore();
    // });

    //Declare Parameters
    //0.5 = Half canvas
    //0.1 = 1/10th canvas
    //0.6 = 6/10th canvas
    x = width * 0.5;
    y = height * 0.5;
    w = width * 0.6;
    h = height * 0.1;

    //Good practice to save then restore after code block when using translate so x,y,w,h can be used later in code if needed
    context.save();

    //Moves rect to centre of canvas
    context.translate(x, y);
    //line colour
    context.strokeStyle = 'blue';

    //context.strokeRect(w * -0.5, h * -0.5, w, h);

    //Call draw rect function (within the context of the canvas)
    drawSkewedRect({ context });
    context.stroke();

    context.restore();
  };
};

//FUNCTION DECLERATION
//Creates Skewed box function context = draw area,w = width, h = height, degrees = angle of skew
const drawSkewedRect = ({ context, w = 600, h = 200, degrees = -45 }) => {
  //Variable Decleration (uses const as its inside a function and doesnt change)
  //used 'util' cavnas-sketch API to convert angle to radiun
  //declare radius, horizonal = 0, vertical = 90
  const angle = math.degToRad(degrees);
  //radius * width
  const rx = Math.cos(angle) * w;
  const ry = Math.sin(angle) * w;

  //good practice to save then restore
  context.save();

  //translates points so when drawn point by point can be represented as 0
  context.translate(rx * -0.5, (ry + h) * -0.5);

  //Draw rect point by point isuing rx/ry to decide angle
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath();
  context.stroke();

  //good practice to save then restore
  context.restore();

  //draw small radius lines to illustrate radius
  // context.beginPath();
  // context.moveTo(0, 0);
  // context.lineTo(x, y);
  // context.stroke();
};

canvasSketch(sketch, settings);
