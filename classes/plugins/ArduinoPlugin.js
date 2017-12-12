const Readable = require('stream').Readable;
class MyStream extends Readable {
 constructor(opts) {
 super(opts);
 }
 _read() {
 }
}
// hook in our stream
process.__defineGetter__('stdin', () => {
 if (process.__stdin) return process.__stdin;
 process.__stdin = new MyStream();
 return process.__stdin;
});

const five = require('johnny-five');

class ArduinoPlugin extends Phaser.Plugin {
  constructor(game, parent) {
    super(game, parent);
    console.log('plugin created');
    this.board = new five.Board();

    this.triggerTaco = new Phaser.Signal();
    this.triggerFlamethrower = new Phaser.Signal();
    this.triggerIceCream = new Phaser.Signal();
    this.triggerIcyWind = new Phaser.Signal();
    this.triggerWalkUp = new Phaser.Signal();
    this.triggerWalkDown = new Phaser.Signal();
    this.triggerWalkUpTwo = new Phaser.Signal();
    this.triggerWalkDownTwo = new Phaser.Signal();

    this.board.on("ready", () => {
      const taco = new five.Button({
        pin: 7,
        isPullup: true
      });

      const flamethrower = new five.Button({
        pin: 6,
        isPullup: true
      });

      const iceCream = new five.Button({
        pin: 12,
        isPullup: true
      });

      const icyWind = new five.Button({
        pin: 11,
        isPullup: true
      });

      taco.on("down", (value) => {
        this.triggerTaco.dispatch();
        //console.log(this.triggerTaco);
      });

      flamethrower.on("down", (value) => {
        //console.log('flamethrower');
        this.triggerFlamethrower.dispatch();
      });

      iceCream.on("down", (value) => {
        console.log('icec');
        this.triggerIceCream.dispatch();
      });

      icyWind.on("down", (value) => {
        console.log('icywind1');
        this.triggerIcyWind.dispatch();
      });

      this.joystick = new five.Joystick({
        //   [ x, y ]
        pins: ["A0", "A1"]
      });

      this.joystickTwo = new five.Joystick({
        //   [ x, y ]
        pins: ["A2", "A3"]
      });

    });
  }

  update() {
    if (this.joystick !== undefined) {

      if (this.joystick.y < -0.7) {
        console.log('omhoog');
        this.triggerWalkUp.dispatch();
      }
      if (this.joystick.y > 0.7) {
        console.log('beneden');
        this.triggerWalkDown.dispatch();
      }

      if (this.joystickTwo.y < -0.7) {
        console.log('omhoog');
        this.triggerWalkUpTwo.dispatch();
      }
      if (this.joystickTwo.y > 0.7) {
        console.log('beneden');
        this.triggerWalkDownTwo.dispatch();
      }

    } else {
      console.log('BOARD NOT LOADED');
    }


  }
}


module.exports = ArduinoPlugin;
