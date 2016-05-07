var svgString = "176.2,24.9 76.8,15.3 111.4,119.6 91.2,138.4 115.9,194.3 100.8,248.8 308.7,360.7 298.1,434 315.1,440.7 376.4,343.2 345.5,240.5 379.7,209.9 342.1,180.9 339.2,132.3 244,93.4 214.1,114 ";

svgString = svgString.split(" ");

var svgPoints = [];
var paperPoints = [];
for (var s = 0; s < svgString.length; s++) {
  svgPoints.push(svgString[s].split(","));
}

function arrayToPoint(array) {
  var x = array[0];
  var y = array[1];

  var point = new Point(Number(x), Number(y));
  return point;
}

for (var p = 0; p < svgPoints.length; p++) {
  paperPoints.push(arrayToPoint(svgPoints[p]));
}

var path = new Path(paperPoints);
    path.closed = true;
    path.strokeColor = 'black';

console.log(paperPoints);