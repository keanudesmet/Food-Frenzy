// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// import Game from './classes/Game'
const Game = require('./classes/Game');
const GameState = require('./classes/states/GameState');


const init = () => {
  new Game();

  // const five = require('johnny-five');
  // const board = new five.Board();
  //
  // board.on("ready", () => {
  //
  //     // Create a new `joystick` hardware instance.
  //     var joystick = new five.Joystick({
  //       //   [ x, y ]
  //       pins: ["A0", "A1"]
  //     });
  //
  //     joystick.on("change", function() {
  //       console.log("Joystick");
  //       console.log("  x : ", this.x);
  //       console.log("  y : ", this.y);
  //       console.log("--------------------------------------");
  //     });

  //});

  // const five = require('johnny-five');
  // const board = new five.Board();
  //
  // board.on('ready', function() {
  //   const led = new five.Led(13); // pin 13
  //   led.blink(500); // 500ms interval
  // });

};

init();





// const five = require('johnny-five');
// const board = new five.Board();
//
// board.on("ready", () => {
//  const led = new five.Led(13);
//  led.blink(100);
// });
