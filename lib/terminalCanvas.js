var _ = require("lodash");
var es = require("event-stream");
var Canvas = require("drawille-canvas");
var sleep = require("sleep");
var printf = require("printf");
var dtc = require("./dataToCanvas.js");

module.exports = function(){
  var canvas = null;
  var ctx = null
  var canvasData = null;
  var frame = 0;

  var initializeCanvas = function(data){
    //console.log(data)
    canvas = new Canvas(data.width, data.height);
    canvas.fillStyle = "rgb(0,0,0)";
    canvasData = data;
  }
  initializeCanvas({width: process.stdout.columns*2, height: process.stdout.rows*3.3});
  var storeImage = function(cb){
    console.log(canvas.toString());
  }
  var toRadians = function(angle) {
  return angle * (Math.PI / 180);
  }
  resetScreen = function () {
  return process.stdout.write('\033c');
  }
  return es.through(
    function write(data){
      var th = this;
      if(data.type == "initialize"){
        resetScreen();
        initializeCanvas(data);
      } else if(data.type == "newframe"){
         console.log(canvas.toString());
         sleep.usleep(300000);
         resetScreen();
         initializeCanvas(canvasData);
      } else if (data.type == "circles") {
        canvas.lineWidth = "1"
        for (i = 1; i < 361; i++) {
            canvas.beginPath()
            canvas.moveTo(data.data[0][0].x+data.data[0][1]*Math.cos(toRadians(i)), data.data[0][0].y+data.data[0][1]*Math.sin(toRadians(i)))
            canvas.lineTo(data.data[0][0].x+data.data[0][1]*Math.cos(toRadians(i+1)), data.data[0][0].y+data.data[0][1]*Math.sin(toRadians(i+1)))
            canvas.stroke()
        }
      } else {
        dtc(canvas, data);
      }
    },
    function end(){
        console.log(canvas.toString());
    }
  );
};
