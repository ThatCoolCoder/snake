# Snake

JavaScript snake clone

## Coords vs Positions:
Coords refers to the position on the grid.
Position refers to the position on the canvas.

## Files (in no particular order)

#### indexPlain.html
This is a html page that contains the game, nothing else.
This is the master copy and is designed for inserting into other pages.

#### indexNalton.html
This is a html page that fits on the naltonsoftware website.

#### script.js
This is links all of the other scripts together and sets everything up.
This file relies on all of the other script files.

#### Snake.js
This file contains the Snake class and nothing else.
It is strongly bound to the other classes and can't be dropped into another project easily.
The snake class relies upon `pixi.js` and the global `cellSize`.