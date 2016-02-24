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
  initializeCanvas({width: process.stdout.columns, height: 200});
  var storeImage = function(cb){
    console.log(canvas.toString());
  }
  return es.through(
    function write(data){
      //console.log(data)
      var th = this;
      if(data.type == "initialize"){
        //console.log(data);
        initializeCanvas(data);
      } else if(data.type == "newframe"){
         console.log(canvas.toString());
         sleep.usleep(300000);
         initializeCanvas(canvasData);
      } else if (data.type == "circles") {
        canvas.lineWidth = "1"
        for (i = 1; i < 361; i++) {
            canvas.beginPath()
            canvas.moveTo(data.data[0][0].x+data.data[0][1]*Math.cos(i), data.data[0][0].y+data.data[0][1]*Math.sin(i))
            canvas.lineTo(data.data[0][0].x+data.data[0][1]*Math.cos(i+1), data.data[0][0].y+data.data[0][1]*Math.sin(i+1))
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
