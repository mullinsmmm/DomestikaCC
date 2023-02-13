//API ELEMENTS USED
//Calls canvas-sketch
const canvasSketch = require('canvas-sketch');
//Calls math
const math = require('canvas-sketch-util/math');
//Calls random function
const random = require('canvas-sketch-util/random');
//Calls color
const Color = require('canvas-sketch-util/color');
//Calls Riso color palette
const risoColors = require('riso-colors');

//Adds a random seed, dictated by the date and time
// const seed = '599404';
const seed = Date.now();

//SETUP FUNCTION
const settings = {
  dimensions: [1080, 1080],
  name: seed,
};

//SKETCH FUNCTION
const sketch = ({ context, width, height }) => {
  random.setSeed(seed);

  //Variable Decleration
  let x, y, w, h, fill, stroke, blend;

  //Number of Rects
  const num = 40;
  //Angle of skew
  const degrees = -30;

  const rects = [];

  const rectColors = [random.pick(risoColors), random.pick(risoColors)];

  const bgColor = random.pick(risoColors).hex;

  const mask = {
    radius: width * 0.4,
    sides: 3,
    x: width * 0.5,
    y: height * 0.58,
  };

  //Variables outside of RENDER FUNCTION to enable save of specific frame (Not Applicable in browser)
  for (let i = 0; i < num; i++) {
    x = random.range(0, width);
    y = random.range(0, height);
    w = random.range(600, width);
    h = random.range(40, 200);

    fill = random.pick(rectColors).hex;
    stroke = random.pick(rectColors).hex;

    blend = random.value() > 0.5 ? 'overlay' : 'source-over';

    rects.push({ x, y, w, h, fill, stroke, blend });
  }

  //RENDER FUNCTION
  return ({ context, width, height }) => {
    //Background color
    context.fillStyle = bgColor;
    //Background fill area
    context.fillRect(0, 0, width, height);

    //Good practice to save then restore variables when altering them
    context.save();
    //Move composition to centee of canvas
    context.translate(mask.x, mask.y);

    //Draws Polygon clipping mask
    drawPolygon({ context, radius: mask.radius, sides: mask.sides });

    context.clip();

    //forEach instead of forLoop
    rects.forEach((rect) => {
      //Variable Decleration
      const { x, y, w, h, fill, stroke, blend } = rect;
      let shadowColor;

      //Good Practice
      context.save();
      //Centres Mask
      context.translate(-mask.x, -mask.y);
      //Centres x Y values
      context.translate(x, y);

      //Stroke controls
      context.strokeStyle = stroke;
      context.fillStyle = fill;
      context.lineWidth = 10;

      //Blend Mode
      context.globalCompositeOperation = blend;

      //Calls draw rect function from below
      drawSkewedRect({ context, w, h, degrees });

      //Shadow color control
      shadowColor = Color.offsetHSL(fill, 0, 0, -20);
      shadowColor.rgba[3] = 0.5;

      //Offset of colors
      context.shadowColor = Color.style(shadowColor.rgba);
      context.shadowOffsetX = -10;
      context.shadowOffsetY = 20;

      context.fill();

      context.shadowColor = null;
      context.stroke();

      context.globalCompositeOperation = 'source-over';

      context.lineWidth = 2;
      context.strokeStyle = 'black';
      context.stroke();

      context.restore();
    });

    context.restore();

    // polygon outline
    context.save();
    context.translate(mask.x, mask.y);
    context.lineWidth = 20;

    drawPolygon({
      context,
      radius: mask.radius - context.lineWidth,
      sides: mask.sides,
    });

    context.globalCompositeOperation = 'color-burn';
    context.strokeStyle = rectColors[0].hex;
    context.stroke();

    context.restore();
  };
};

//FUNCTION DECLERATION
//Creates skewed box function context=draw area, w=width h=height degrees=angle of skew
const drawSkewedRect = ({ context, w = 600, h = 200, degrees = -45 }) => {
  //Converts degrees to radians using math API
  const angle = math.degToRad(degrees);
  //works out radians * width
  const rx = Math.cos(angle) * w;
  const ry = Math.sin(angle) * w;

  //Good practice
  context.save();
  //translates points so when drawn point by point can be represented as 0
  context.translate(rx * -0.5, (ry + h) * -0.5);

  //Draw rect point by point using rx/ry to decide angle
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath();

  //good practice
  context.restore();
};

//FUNCTION DECLERATION
//Draws polygon overlay
const drawPolygon = ({ context, radius = 100, sides = 3 }) => {
  const slice = (Math.PI * 2) / sides;

  context.beginPath();
  context.moveTo(0, -radius);

  for (let i = 1; i < sides; i++) {
    const theta = i * slice - Math.PI * 0.5;
    context.lineTo(Math.cos(theta) * radius, Math.sin(theta) * radius);
  }

  context.closePath();
};

canvasSketch(sketch, settings);
