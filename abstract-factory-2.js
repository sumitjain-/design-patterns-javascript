setHeading('Abstract Factory Pattern - 2');

const ShapeFactory = {
  makeSquare() {
    return {
      x: Math.floor(Math.random() * window.innerWidth),
      y: Math.floor(Math.random() * window.innerHeight),
      side: Math.random() * 50,
    };
  },
  makeCircle() {
    return {
      x: Math.floor(Math.random() * window.innerWidth),
      y: Math.floor(Math.random() * window.innerHeight),
      radius: Math.random() * 50,
    };
  }
};

const RandomShapeFactory = {
  makeShape() {
    const methods = [
      ShapeFactory.makeSquare,
      ShapeFactory.makeCircle,
    ];
    const idx = Math.floor(Math.random() * methods.length);
    return (methods[idx])();
  }
};

function BalancedShapeFactory() {
  // some logic to always keep number of each of the shapes close to equal
}
