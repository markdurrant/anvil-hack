var svgString = "176.2,24.9 76.8,15.3 111.4,119.6 91.2,138.4 115.9,194.3 100.8,248.8 308.7,360.7 298.1,434 315.1,440.7 376.4,343.2 345.5,240.5 379.7,209.9 342.1,180.9 339.2,132.3 244,93.4 214.1,114";

svgString = svgString.split(" ");

var shapePoints = [];
for (var s = 0; s < svgString.length; s++) {
  var a = svgString[s].split(",");

  var x = Number(a[0]);
  var y = Number(a[1]);

  shapePoints.push(new Point(x, y));
}

var flat = new Path(shapePoints);
    flat.closed = true;
    flat.strokeColor = 'blue';

var shapeDistances = []
for (var i = 0; i < shapePoints.length; i++) {
  var d = 0;

  if (i != shapePoints.length -1) {
    d = shapePoints[i].getDistance(shapePoints[i + 1]);
  } else {
    d = shapePoints[i].getDistance(shapePoints[0]);
  }

  shapeDistances.push(d);
}

var startPoint = new Point(100, flat.bounds.height + 100);
var myHeight = 200;

var tabWidth = 10;
var tabHieght = 10;
var tabPos = .5;

var myX = startPoint.x;
for (var i = 0; i < shapePoints.length; i++) {
  myX = myX + shapeDistances[i];
  var path = new Path();
      path.style = {strokeColor: 'green', dashArray: [4, 4]};
      path.add(new Point(myX, startPoint.y));
      path.add(new Point(myX, startPoint.y + myHeight));

  if(shapeDistances[i] > tabWidth * 4) {
      var path2 = new Path();
        path2.style = {strokeColor: 'green'};
        path2.add(new Point(myX - shapeDistances[i] / 2 + tabWidth / 2, startPoint.y + myHeight * tabPos));
        path2.add(new Point(myX - shapeDistances[i] / 2 + tabWidth / 2, startPoint.y + myHeight * tabPos - tabHieght));

    var path3 = new Path();
        path3.style = {strokeColor: 'green'};
        path3.add(new Point(myX - shapeDistances[i] / 2 - tabWidth / 2, startPoint.y + myHeight * tabPos));
        path3.add(new Point(myX - shapeDistances[i] / 2 - tabWidth / 2, startPoint.y + myHeight * tabPos - tabHieght));

    var path4 = new Path();
        path4.style = {strokeColor: 'green'};
        path4.add(new Point(myX - shapeDistances[i] / 2 - tabWidth / 2, startPoint.y + myHeight * tabPos));
        path4.add(new Point(myX - shapeDistances[i] / 2 + tabWidth / 2, startPoint.y + myHeight * tabPos));
  }
}

var endTabHeight = myHeight / 1.4;
var endTabWidth = 40;

new Path(
  startPoint,
  startPoint + [myX, 0],
  // startPoint + [myX, myHeight / 2 - endTabHeight / 2],
  startPoint + [myX + endTabWidth, myHeight / 2 - endTabHeight / 2],
  startPoint + [myX + endTabWidth, myHeight / 2 + endTabHeight / 2],
  // startPoint + [myX, myHeight / 2 + endTabHeight / 2],
  startPoint + [myX, myHeight],
  startPoint + [0, myHeight],
  startPoint
).style = {strokeColor: 'green'};

new Path(
  startPoint + [myX, 0],
  startPoint + [myX, myHeight]
).style = {strokeColor: 'green', dashArray: [4, 4]};

console.log(project.exportSVG({ asString: true }));
