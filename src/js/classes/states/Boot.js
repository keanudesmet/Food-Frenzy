export default class Boot extends Phaser.State {
  preload() {
    this.load.image(`preloader`, `assets/images/preloader.png`);
    this.load.spritesheet(`preloader`, `assets/images/preloader.png`, 222, 4);
  }
  create() {
    this.state.start(`Preload`);
  }
}
