#!/usr/bin/env node

var canvas = require("canvas");
var es = require("event-stream");
var parse = require("./lib/grammar.js").parse;
var sc = require("./lib/streamCanvas.js");
var tc = require("./lib/terminalCanvas.js")
var argv = require("yargs")
          .usage("echo 'line (0 0) (200 200)' | $0 [options]")
          .default("f","./out%d.png")
          .describe("f", "The output file that gets generated")
          .default("a",false)
          .describe("a","create an animated gif")
          .default("t",false)
          .describe("t","print result to terminal")
          .help("h")
          .argv;
var api = require("./lib/api.js");

if(argv.a){
  if(argv.f == "./out%d.png"){
    argv.f = "out.gif";
  }
  process.stdin
    .pipe(es.split())
    .pipe(es.mapSync(parse))
    .pipe(sc())
    .pipe(api.createAnimationProcessor(argv.f));
} else {
  if(argv.t){
    console.log("Caution: Canvas size is " + process.stdout.columns+":200. Painting outside can result in strange behaviour. Use the canvas command to set appropriate size.")
    process.stdin
      .pipe(es.split())
      .pipe(es.mapSync(parse))
      .pipe(tc())
      .pipe(process.stdout);
  }
  else {
    process.stdin
      .pipe(es.split())
      .pipe(es.mapSync(parse))
      .pipe(sc(argv.f))
      .pipe(process.stdout);
    }
}
