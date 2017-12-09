export default class Intro extends Phaser.State {
  create() {
    this.setupBackground();
    this.setupPlay();
    this.bgSound = this.add.audio(`bgm`);
  }
  setupBackground(){
    this.sea = this.add.tileSprite(0, 0, this.world.width, this.world.height, `sea`);
  }
  setupPlay() {
    this.start = this.add.button(this.game.width/2, 300, 'button', this.startClick, this);
    this.start.anchor.setTo(0.5,0.5);
  }
  startClick() {
    this.bgSound.play();
    this.state.start(`GameState`);

  }

}