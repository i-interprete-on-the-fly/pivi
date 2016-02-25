[![Build Status](https://travis-ci.org/LittleHelicase/pivi.svg)](https://travis-ci.org/LittleHelicase/pivi)

# Pivi
Pivi (short for Pipeviewer) is a tool that simplifies visualization tasks. It has a simple stream based input format and can output its results into an image as well as directly to the terminal. 

# Installation
You need Cairo to create the images. We use [node-canvas](https://github.com/Automattic/node-canvas) to create the images they have an [installation guide](https://github.com/Automattic/node-canvas/wiki/_pages) on their project page.

Then you simply run:

```
npm install -g pivi
```

Or if you want to use pivi in your project you can use

```
npm install pivi
```

# Example
The following program generates a zigzag line and outputs it as a PNG image.

```
echo "polyline (0 0) (100 100) (100 0) (0 100)" | pivi
```
The same line displayed in the terminal:
```
echo "polyline (0 0) (100 100) (100 0) (0 100)" | pivi -t
```
# Supported Commands
All points can be written as a tupel or you can simply omit all commas or brackets.
- `point 1 2`
- `points (1 2) (3 3)`
- `line (0, 0) (20 30)`
- `lines ((0, 0) (20 40)) ((0,0) (40,20))` (draws one line for each pair of points)
- `polyline 0 0 ... 100 0`
- `circle ((centerx,centery) radius)`
- `circles ((100,100) 20) ((centerx,centery) radius)`

# Development
If you want to work on pivi you can follow these steps:

1. clone it
2. install necessary dependencies (currently cairo and Image Magicks convert for animations)
3. install npm (e.g. via [NVM](https://github.com/creationix/nvm))
4. run `npm install` in the projects root directory
5. run `npm test` to check if everything works

You should install gulp (`npm install -g gulp`) to run all the tasks during development. You can see
all available tasks in `gulpfile.js` or via `gulp --tasks`.

# Alternatives
- You can try ImageMagick's convert. You can pass arguments to it that function similar to our commands. More
[here](http://www.imagemagick.org/Usage/draw)
- Terminal plotting is also possible with gnuplot. More [here](http://www.gnuplot.info/)

# Contributors
- Rasmus Buchmann
- Maximilian Klein
