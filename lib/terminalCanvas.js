
var es = require("event-stream");
var Canvas = require("drawille-canvas");

var printf = require("printf");
var dtc = require("./dataToCanvas.js");

module.exports = function(outfile){
  outfile = outfile || "./out%d.png";
  // in javascript every array has stack functionality
  var canvas = null;
  var ctx = null
  var canvasData = null;
  var frame = 0;

  var initializeCanvas = function(data){
    canvas = new Canvas(data.width, data.height);
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(0,0,0)";
    canvasData = data;
  }
  initializeCanvas({width: 200, height: 200});
  var storeImage = function(cb){
    console.log(canvas.toString())
    initializeCanvas(canvasData);
  }
  return es.through(
    function write(data){
      var th = this;
      if(data.type == "initialize"){
        initializeCanvas(data);
      } else if(data.type == "newframe"){
        storeImage(function(file){
          th.emit("data", file + "\n");
        });
      } else {
        dtc(ctx, data);
      }
    },
    function end(){
      var th = this;
      storeImage(function(file){
        th.emit("data", file + "\n");
        th.emit("end");
      });
    }
  );
};
