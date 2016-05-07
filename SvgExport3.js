var paper = require('./paperjs/paper-core.js');
var path = require('path');
var fs = require('fs');

var svgString = ("176.2,24.9 76.8,15.3 111.4,119.6 91.2,138.4 115.9,194.3 100.8,248.8 308.7,360.7 298.1,434 315.1,440.7 376.4,343.2 345.5,240.5 379.7,209.9 342.1,180.9 339.2,132.3 244,93.4 214.1,114").split(" ");

var stripHeight = 200;
var flatTabDepth = 40;

var stripTabSize = 25;
var flatTabWidth = 20;
var flatTabHeight = 6;

var cut = {strokeColor: 'black'};
var score = {strokeColor: 'black', dashArray: [2, 10]};

with (paper) {
  paper.setup(new Size(5000, 5000));

  // get points from svg
  var flatPoints = []
  for (var i = 0; i < svgString.length; i++) {
    var a = svgString[i].split(",");

    var x = Number(a[0]);
    var y = Number(a[1]);

    flatPoints.push(new Point(x, y));
  }

  // get distance between flat points
  var flatDists = []
  for (var i = 0; i < flatPoints.length; i++) {
    var d = 0;

    if (i != flatPoints.length -1) {
      d = flatPoints[i].getDistance(flatPoints[i + 1]);
    } else {
      d = flatPoints[i].getDistance(flatPoints[0]);
    }

    flatDists.push(d);
  }

  // set up strip
  var stripStart = new Point(100, 100);
  var stripX = stripStart.x;

  // draw strip inner
  for (var i = 0; i < flatPoints.length; i++) {
    stripX = stripX + flatDists[i];

    // score lines
    new Path(
      new Point(stripX, stripStart.y),
      new Point(stripX, stripStart.y + stripHeight)
    ).style = score;

    // flat tabs
    if(flatDists[i] > flatTabWidth * 4) {
      new Path(
        new Point(stripX - flatDists[i] / 2 + flatTabWidth / 2, stripStart.y + flatTabDepth),
        new Point(stripX - flatDists[i] / 2 + flatTabWidth / 2, stripStart.y + flatTabDepth - flatTabHeight)
      ).style = cut;

      new Path(
        new Point(stripX - flatDists[i] / 2 - flatTabWidth / 2, stripStart.y + flatTabDepth),
        new Point(stripX - flatDists[i] / 2 - flatTabWidth / 2, stripStart.y + flatTabDepth - flatTabHeight)
      ).style = cut;

      new Path(
        new Point(stripX - flatDists[i] / 2 - flatTabWidth / 2, stripStart.y + flatTabDepth - flatTabHeight),
        new Point(stripX - flatDists[i] / 2 + flatTabWidth / 2, stripStart.y + flatTabDepth - flatTabHeight)
      ).style = cut;
    }
  }
  new Path(
    new Point(stripStart.x + stripX, stripStart.y),
    new Point(stripStart.x + stripX, stripStart.y + stripHeight)
  ).style = score;

  // draw strip outer
  new Path(
    new Point(stripStart.x, stripStart.y),
    new Point(stripStart.x + stripX, stripStart.y),
    new Point(stripStart.x + stripX + stripTabSize, stripStart.y + stripTabSize),
    new Point(stripStart.x + stripX + stripTabSize, stripStart.y + stripHeight - stripTabSize),
    new Point(stripStart.x + stripX, stripStart.y + stripHeight),
    new Point(stripStart.x, stripStart.y + stripHeight),
    new Point(stripStart.x, stripStart.y)
  ).style = cut;

  var svg = project.exportSVG({ asString: true });

  fs.writeFile(path.resolve('./out.svg'),svg, function (err) {
      if (err) throw err;
      console.log('Saved!');
  });
}
