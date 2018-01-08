//const Button = require('../objects/Button');

class Intro extends Phaser.State {
  create() {
    this.setupBackground();
    this.setupPlay();
    this.setupArduino();
  }
  setupBackground(){
    //this.sea = this.add.tileSprite(0, 0, this.world.width, this.world.height, `bg-menu`);
    this.bg = this.add.sprite(0, 0, 'bg-menu');
    this.bg.width = this.world.width;
    this.bg.scale.y = this.bg.scale.x;
    //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    //this.game.scale.startFullScreen(false);
  }
  setupArduino() {

      this.game.arduinoPlugin.triggerRestart.add(() => {
        this.state.start(`GameState`);
      });

      this.game.arduinoPlugin.hotAirBool = false;
      this.game.arduinoPlugin.coldAirBool = false;
      this.game.arduinoPlugin.blueLedBool = true;
      this.game.arduinoPlugin.redLedBool = true;

  }
  setupPlay() {
    this.start = this.add.button(this.game.width/2, this.bg.height/100 *55, 'play', this.startClick, this);
    this.start.anchor.setTo(0.5,0.5);
  }
  startClick() {
    //this.bgSound.play();
    console.log(this.game.arduinoPlugin.gameRunning);
    this.state.start(`GameState`);
  }

}

module.exports = Intro;
