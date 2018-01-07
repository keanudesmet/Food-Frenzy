//const Button = require('../objects/Button');

class Intro extends Phaser.State {
  create() {
    this.setupBackground();
    this.setupPlay();
  }
  setupBackground(){
    //this.sea = this.add.tileSprite(0, 0, this.world.width, this.world.height, `bg-menu`);
    this.bg = this.add.sprite(0, 0, 'bg-menu');
    this.bg.width = this.world.width;
    this.bg.scale.y = this.bg.scale.x;
    //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    //this.game.scale.startFullScreen(false);
  }
  setupPlay() {
    this.start = this.add.button(this.game.width/2, this.bg.height/100 *55, 'play', this.startClick, this);
    this.start.anchor.setTo(0.5,0.5);
  }
  startClick() {
    //this.bgSound.play();
    this.state.start(`GameState`);
  }

}

module.exports = Intro;
