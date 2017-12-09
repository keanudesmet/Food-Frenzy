export default class Player extends Phaser.Sprite {
  constructor(game, x, y, sprite, frame) {
    super(game, x, y, sprite, frame);

    this.game.physics.arcade.enableBody(this);
    this.body.collideWorldBounds = true;
    this.data.speed = 1000;
    this.body.setSize(50, 20, 7, 20);

    let stand = this.animations.add('stand');
    this.animations.play('stand', 30, true);
  }
  update(){
    
  }

}
