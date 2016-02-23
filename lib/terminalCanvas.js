
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
    ctx = canvas.getContext('2d');
    ctx.fillStyle = "rgb(0,0,0)";
    canvasData = data;
  }
  initializeCanvas({width: process.stdout.columns, height: 200});
  var storeImage = function(cb){
    console.log(canvas.toString());
    initializeCanvas(canvasData);
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
      } else {
        //console.log("dtccc")
        dtc(ctx, data);
      }
    },
    function end(){
      //console.log("endd")
      var th = this;
      ctx.beginPath();
      ctx.arc(75, 75, 50, 0, 2 * Math.PI);
      ctx.stroke();
      console.log(canvas.toString());
      //storeImage(function(file){
      //  th.emit("data", file + "\n");
      //  th.emit("end");
      //});
    }
  );
};
