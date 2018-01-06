//const Button = require('../objects/Button');

class Intro extends Phaser.State {
  create() {
    this.setupBackground();
    this.setupPlay();
  }
  setupBackground(){
    //this.sea = this.add.tileSprite(0, 0, this.world.width, this.world.height, `bg-menu`);
    this.add.sprite(0, 0, 'bg-menu');
  }
  setupPlay() {
    this.start = this.add.button(this.game.width/2, 580, 'play', this.startClick, this);
    this.start.anchor.setTo(0.5,0.5);
  }
  startClick() {
    //this.bgSound.play();
    this.state.start(`GameState`);
  }

}

module.exports = Intro;
