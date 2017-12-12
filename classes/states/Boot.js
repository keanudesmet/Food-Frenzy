const ArduinoPlugin = require('../plugins/ArduinoPlugin');

class Boot extends Phaser.State {
  preload() {
    this.load.image(`preloader`, `assets/images/preloader.png`);
    this.load.spritesheet(`preloader`, `assets/images/preloader.png`, 222, 4);
    this.game.arduinoPlugin = this.game.plugins.add(ArduinoPlugin);
  }
  create() {
    this.state.start(`Preload`);
  }
}


module.exports = Boot;
