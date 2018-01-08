this.game = require('../states/GameState');

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

    this.triggerRestart = new Phaser.Signal();

    this.triggerTaco = new Phaser.Signal();
    this.triggerFlamethrower = new Phaser.Signal();
    this.triggerIceCream = new Phaser.Signal();
    this.triggerIcyWind = new Phaser.Signal();
    this.triggerWalkUp = new Phaser.Signal();
    this.triggerWalkDown = new Phaser.Signal();
    this.triggerWalkUpTwo = new Phaser.Signal();
    this.triggerWalkDownTwo = new Phaser.Signal();

    this.gameRunning = false;

    this.walkUpBool = false;
    this.walkDownBool = false;
    this.walkUpBoolTwo = false;
    this.walkDownBoolTwo = false;

    this.blueLedBool = true;
    this.redLedBool = true;

    this.hotAirBool = false;
    this.coldAirBool = false;

    this.board.on("ready", () => {
      const taco = new five.Button({
        pin: 6,
        isPullup: true
      });

      const flamethrower = new five.Button({
        pin: 7,
        isPullup: true
      });

      const iceCream = new five.Button({
        pin: 9,
        isPullup: true
      });

      const icyWind = new five.Button({
        pin: 8,
        isPullup: true
      });

      const walkUp = new five.Button({
        pin: 10,
        isPullup: true
      });

      const walkDown = new five.Button({
        pin: 11,
        isPullup: true
      });

      const walkUpTwo = new five.Button({
        pin: 12,
        isPullup: true
      });

      const walkDownTwo = new five.Button({
        pin: 13,
        isPullup: true
      });

      this.hotAir = new five.Led(14);
      this.coldAir = new five.Led(15);

      this.blueLedTwo = new five.Led(4)
      this.redLedTwo = new five.Led(3)


      taco.on("down", (value) => {
        this.triggerTaco.dispatch();
        //console.log(this.triggerTaco);
        if (this.gameRunning === false) {
          this.triggerRestart.dispatch();
        }
      });

      flamethrower.on("down", (value) => {
        console.log('flamethrower');
        this.triggerFlamethrower.dispatch();
        if (this.gameRunning === false) {
          this.triggerRestart.dispatch();
        }
      });

      iceCream.on("down", (value) => {
        console.log('icec');
        this.triggerIceCream.dispatch();
        if (this.gameRunning === false) {
          this.triggerRestart.dispatch();
        }
      });

      icyWind.on("down", (value) => {
        console.log('icywind1');
        this.triggerIcyWind.dispatch();
        if (this.gameRunning === false) {
          this.triggerRestart.dispatch();
        }
      });

      walkUp.on("down", (value) => {
        this.walkUpBool = true;
      });

      walkUp.on("release", (value) => {
        console.log('release up');
        this.walkUpBool = false;
      });

      walkDown.on("down", (value) => {
        this.walkDownBool = true;
      });

      walkDown.on("release", (value) => {
        this.walkDownBool = false;
      });

      walkUpTwo.on("down", (value) => {
        this.walkUpBoolTwo = true;
      });

      walkUpTwo.on("release", (value) => {
        this.walkUpBoolTwo = false;
      });

      walkDownTwo.on("down", (value) => {
        this.walkDownBoolTwo = true;
      });

      walkDownTwo.on("release", (value) => {
        this.walkDownBoolTwo = false;
      });

      //
      // this.joystick = new five.Joystick({
      //   //   [ x, y ]
      //   pins: ["A0", "A1"]
      // });
      //
      // this.joystickTwo = new five.Joystick({
      //   //   [ x, y ]
      //   pins: ["A2", "A3"]
      // });

    });
  }

  update() {

    if (this.walkUpBool === true) {
      this.triggerWalkUp.dispatch();
    }
    if (this.walkDownBool === true) {
      this.triggerWalkDown.dispatch();
    }
    if (this.walkUpBoolTwo === true) {
      this.triggerWalkUpTwo.dispatch();
    }
    if (this.walkDownBoolTwo === true) {
      this.triggerWalkDownTwo.dispatch();
    }

    if(this.board.isReady === true) {

      if (this.redLedBool === true) {
        //console.log('red', this.redLedBool);
        this.redLedTwo.on();
      }
      if(this.redLedBool === false) {
        //console.log('red', this.redLedBool);
        this.redLedTwo.off();
      }

      if (this.blueLedBool === true) {
        //console.log('blue', this.blueLedBool);
        this.blueLedTwo.on();
      }
      if(this.blueLedBool === false) {
        //console.log('blue', this.blueLedBool);
        this.blueLedTwo.off();
      }



      if (this.hotAirBool === true) {
        this.hotAir.on();
      }
      if(this.hotAirBool === false) {
        this.hotAir.off();
      }

      if (this.coldAirBool === true) {
        this.coldAir.on();
      }
      if(this.coldAirBool === false) {
        this.coldAir.off();
      }

    };


  }
}


module.exports = ArduinoPlugin;
