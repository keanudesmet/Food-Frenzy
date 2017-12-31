//const Button = require('../objects/Button');

class Intro extends Phaser.State {
  create() {
    this.setupBackground();
    this.setupPlay();
    this.bgSound = this.add.audio(`bgm`);
  }
  setupBackground(){
    this.sea = this.add.tileSprite(0, 0, this.world.width, this.world.height, `bg-menu`);
  }
  setupPlay() {
    this.start = this.add.button(this.game.width/2, 709, 'play', this.startClick, this);
    this.start.anchor.setTo(0.5,0.5);
  }
  startClick() {
    //this.bgSound.play();
    this.state.start(`GameState`);
  }

}

module.exports = Intro;
