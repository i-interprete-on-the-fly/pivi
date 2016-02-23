#!/bin/bash

g++ sinus.cpp
./a.out | node ../../pivi.js -t
