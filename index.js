const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

//Setup
const settings = {
  dimensions: [1080, 1080],
  //animate: true,
};

//sketch function
const sketch = () => {
  let x, y, w, h, fill, stroke, blend;

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

  //render Function
  return ({ context, width, height }) => {
    // context.fillStyle = bgColor;
    context.fillStyle = 'pink';
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

    context.translate(x, y);

    context.save();
    //context.translate(x, y);
    context.translate(w * -0.5, h * -0.5);

    context.strokeStyle = 'blue';
    //context.strokeRect(w * -0.5, h * -0.5, w, h);

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(w, 0);
    context.lineTo(w, h);
    context.lineTo(0, h);
    context.closePath();
    context.stroke();

    context.restore();
  };
};

canvasSketch(sketch, settings);
