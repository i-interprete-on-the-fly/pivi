
var es = require("event-stream");
var Canvas = require("canvas");
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
    var fs = require('fs');
    var outfilename = printf(outfile, frame);
    var out = fs.createWriteStream(outfilename);

    var stream = canvas.pngStream();

    stream.on('data', function(chunk){
      out.write(chunk);
    });

    stream.on("end", function(){
      // sadly node-canvas sends the "end" callback too early
      // the file doesn't exists when it fires and thus further
      // programs cannot process the png yet.. So we wait a bit :(
      setTimeout(function(){cb(outfilename)},100);
    });
    frame++;
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
