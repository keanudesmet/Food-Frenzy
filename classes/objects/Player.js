class Player extends Phaser.Sprite {
  constructor(game, x, y, sprite, frame) {
    super(game, x, y, sprite, frame);

    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;
    this.data.speed = 1000;
    this.anchor.setTo(0.5, 0.5);

  }
  update(){

  }

}

module.exports = Player;
