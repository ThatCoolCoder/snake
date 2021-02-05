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

#### wrk.js
This is a modified version of the [wrk.js](https://github.com/That-Cool-Coder/wrk.js) library.
It is based on wrk 1.2.0 with some minor bug fixes.

#### Snake.js
This file contains the Snake class and nothing else.
It is strongly bound to the other classes and can't be dropped into another project easily.
The snake class relies upon `wrk.js` and `Segment.js`.

#### Segment.js
This file contains the Segment class and nothing else.
It is strongly bound to the other classes and can't be dropped into another project easily.
A Snake is made up of Segments.
The Segment class relies upon `wrk.js`.

#### Apple.js
This file contains the Apple class and nothing else.
It is strongly bound to the other classes and can't be dropped into another project easily.
The apple is the thing that the snake chases.
The Apple class relies upon `wrk.js`

#### PlayScene.js
This file contains the PlayScene class.
It is strongly bound to the other classes and can't be dropped into another project easily.
The PlayScene class manages all of the items in the game.
The PlayScene class relies upon `wrk.js`, `Segment.js` and `Snake.js`