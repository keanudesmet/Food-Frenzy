const Player = require('../objects/Player');

class GameState extends Phaser.State {
  preload() {
    // this.load.image(`sea`, `assets/images/sea.png`);
    // this.load.image(`bullet`, `assets/images/taco.png`);
    // this.load.spritesheet('greenEnemy', 'assets/images/enemy.png', 32, 32);
    // this.load.spritesheet('explosion', 'assets/images/explosion.png', 32, 32);
    // //this.load.spritesheet('player', 'assets/images/player.png', 200, 235);
    // this.load.spritesheet('player', 'assets/images/ticotaco-walk.png', 252, 254);
    // //this.load.image(`player`, `assets/images/ticotaco.png`);
    // this.load.image(`playerTwo`, `assets/images/tuttifrutti.png`);
    // this.load.image(`heart`, `assets/images/heart.png`);
  }
  create() {

    this.setupBackground();
    this.setupPlayer();
    this.setupHealth();
    this.setupTacos();
    this.setupIcecream();
    this.setupFire();
    this.setupGlobals();
    this.setupSounds();
    //this.setupExplosions();
    //this.setupText();
    this.cursors = this.input.keyboard.createCursorKeys();

    this.game.arduinoPlugin.triggerTaco.add(() => {
      console.log('TRIGGER TACO');
      this.fireTaco();
    });

    this.game.arduinoPlugin.triggerFlamethrower.add(() => {
      console.log('TRIGGER FLAMETHROWER');
      this.loadFire();
    });

    this.game.arduinoPlugin.triggerIceCream.add(() => {
      console.log('TRIGGER ICECREAM');
      this.fireIcecream();
    });

    this.game.arduinoPlugin.triggerIcyWind.add(() => {
      console.log('TRIGGER FREEZE');
      if (this.pTwoSpecialAvailable == true) {
        this.freezePlayerOne();
      }
    });

    this.game.arduinoPlugin.triggerWalkUp.add(() => {
      console.log('TRIGGER WALKUP');
      this.playerTwo.body.velocity.y = -this.playerTwo.data.speed;
    });

    this.game.arduinoPlugin.triggerWalkDown.add(() => {
      console.log('TRIGGER WALKUP');
      this.playerTwo.body.velocity.y = this.playerTwo.data.speed;
    });

  }
  update() {

    //this.sea.tilePosition.y += 0.4;
    this.checkCollisions();
    this.processPlayerInput();
    this.yVelocity = this.yVelocity + 2;

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  }

  render() {
    // this.game.debug.body(this.bullet);
    // this.game.debug.body(this.enemy);
    //this.game.debug.body(this.player);
  }
  // enemyHit(bullet, enemy) {
  //   bullet.kill();
  //   enemy.kill();
  //   this.explode(enemy);
  //   //this.addToScore(100);
  // }
  playerHit(player, icecream){
    if (this.healthPlayer === 1) {
      this.healthPlayer -=1;
      player.kill();
      this.gameEnded = true;
    }else {
      this.healthPlayer -=1;
    }
    this.updateHealth();
    icecream.kill();
    //this.explode(player);
  }

  playerTwoHit(player, taco){
    if (this.healthPlayerTwo === 1) {
      console.log(this.healthPlayerTwo);
      this.healthPlayerTwo -=1;
      player.kill();
    }else {
      this.healthPlayerTwo -=1;
      console.log(this.healthPlayerTwo);
    }

    this.updateHealth();
    this.tacoHitSound.play();

    taco.kill();
    //this.explode(player);
    //   this.addToScore(' GAME OVEUR');
  }

  attackCollide(taco, iceCream) {
    taco.kill();
    iceCream.kill();
  }

  // setupText(){
  //   this.score = 0;
  //   this.scoreText = this.add.text(this.game.width / 2, 30, '' + this.score,
  //   { font: '20px monospace', fill: '#fff', align: 'center' } );
  //   this.scoreText.anchor.setTo(0.5, 0.5);
  // }
  // addToScore(score) {
  //   this.score += score;
  //   this.scoreText.text = this.score;
  // }

  setupBackground(){
    //this.sea = this.add.tileSprite(0, 0, this.world.width, this.world.height, `sea`);
    this.bg = this.add.sprite(0,0, 'bg2');
  }

  setupGlobals(){
    this.pOneSpecialAvailable = true;
    this.pTwoSpecialAvailable = true;
    this.gameEnded = false;
    this.playerOneFreeze = false;
    this.yVelocity = 0;
  }

  setupSounds() {
    this.tacoHitSound = this.add.audio(`tacoHit`);
    this.flamethrowerSound = this.add.audio(`flamethrowerSound`);
  }

  setupPlayer(){
    // this.player = this.add.sprite(100,this.world.height/2, 'player');
    // this.physics.enable(this.player, Phaser.Physics.ARCADE);
    // this.player.data.speed = 1000;
    // this.player.body.setSize(50, 20, 7, 20);

    this.player = new Player(this.game, 100, this.world.height/2, 'player');
    this.add.existing(this.player);

    // this.playerTwo = this.add.sprite(this.world.width - 100, this.world.height/2, 'playerTwo');
    // this.playerTwo.anchor.setTo(0.5, 0.5);
    // this.physics.enable(this.playerTwo, Phaser.Physics.ARCADE);
    // this.playerTwo.data.speed = 700;
    // this.playerTwo.body.setSize(50, 20, 7, 20);

    this.playerTwo = new Player(this.game,this.world.width - 250, this.world.height/2, 'playerTwo');
    this.add.existing(this.playerTwo);
  }

  setupHealth() {
    this.healthPlayer = 3;
    this.healthPlayerTwo = 3;

    this.healthBar = this.add.group();
    this.healthBarTwo = this.add.group();

    for (let i = 0; i < this.healthPlayer; i++) {
      //this.live = this.add.sprite(10 + i*120,10, 'heart');
      this.healthBar.create(10 + i*120,10, 'heart');
    }

    for (let i = 0; i < this.healthPlayerTwo; i++) {
      this.healthBarTwo.create(this.world.width - 120 - i*120,10, 'heart');
    }

  }

  updateHealth() {

    this.healthBar.destroy();
    this.healthBarTwo.destroy();
    this.healthBar = this.add.group();
    this.healthBarTwo = this.add.group();

    for (let i = 0; i < this.healthPlayer; i++) {
      this.healthBar.create(10 + i*120,10, 'heart');
    }

    for (let i = 0; i < this.healthPlayerTwo; i++) {
      this.healthBarTwo.create(this.world.width - 120 - i*120,10, 'heart');
    }


  }

  setupTacos(){
    this.nextShotAt = 0;
    this.shotDelay = 500;

    // Add an empty sprite group into our game
    this.tacoPool = this.add.group();
    // Enable physics to the whole sprite group
    this.tacoPool.enableBody = true;
    this.tacoPool.physicsBodyType = Phaser.Physics.ARCADE;
    // Add 100 'bullet' sprites in the group.
    this.tacoPool.createMultiple(100, 'bullet');
    // By default this uses the first frame of the sprite sheet and
    // sets the initial state as non-existing (i.e. killed/dead)

    // Sets anchors of all sprites
    this.tacoPool.setAll('anchor.x', 0.5);
    this.tacoPool.setAll('anchor.y', 0.5);
    // Automatically kill the bullet sprites when they go out of bounds
    this.tacoPool.setAll('outOfBoundsKill', true);
    this.tacoPool.setAll('checkWorldBounds', true);
  }

  setupIcecream(){
    this.nextIcecreamAt = 0;
    this.icecreamDelay = 500;

    // Add an empty sprite group into our game
    this.icecreamPool = this.add.group();
    // Enable physics to the whole sprite group
    this.icecreamPool.enableBody = true;
    this.icecreamPool.physicsBodyType = Phaser.Physics.ARCADE;
    // Add 100 'bullet' sprites in the group.
    this.icecreamPool.createMultiple(100, 'bullet');
    // By default this uses the first frame of the sprite sheet and
    // sets the initial state as non-existing (i.e. killed/dead)

    // Sets anchors of all sprites
    this.icecreamPool.setAll('anchor.x', 0.5);
    this.icecreamPool.setAll('anchor.y', 0.5);
    // Automatically kill the bullet sprites when they go out of bounds
    this.icecreamPool.setAll('outOfBoundsKill', true);
    this.icecreamPool.setAll('checkWorldBounds', true);
  }
  fireTaco() {
    if (this.nextShotAt > this.time.now) {
      return;
    }
    if (this.tacoPool.countDead() === 0) {
      return;
    }
    if (!this.player.alive || this.nextShotAt > this.time.now) {
      return;
    }
    this.nextShotAt = this.time.now + this.shotDelay;
    // Find the first dead bullet in the pool
    const bullet = this.tacoPool.getFirstExists(false);
    // Reset (revive) the sprite and place it in a new location
    bullet.reset(this.player.x + 100, this.player.y);
    bullet.body.velocity.x =  1500;
    bullet.body.velocity.y =  -600;
    bullet.body.gravity.y = 1200;
    console.log(this.yVelocity);
    console.log(bullet.body.x);

    let playershoot = this.player.animations.add('playershoot');
    //this.player.animations.play('playershoot', 30, false);
  }

  fireIcecream() {
    if (this.nextIcecreamAt > this.time.now) {
      return;
    }
    if (this.icecreamPool.countDead() === 0) {
      return;
    }
    if (!this.playerTwo.alive || this.nextIcecreamAt > this.time.now) {
      return;
    }
    this.nextIcecreamAt = this.time.now + this.icecreamDelay;
    // Find the first dead bullet in the pool
    const bullet = this.icecreamPool.getFirstExists(false);
    // Reset (revive) the sprite and place it in a new location
    bullet.reset(this.playerTwo.x, this.playerTwo.y - 20);
    bullet.body.velocity.x =  -1500;
    bullet.body.velocity.y =  -600;
    bullet.body.gravity.y = 1200;
  }

  freezePlayerOne() {
    this.playerOneFreeze = true;
    this.pTwoSpecialAvailable = false;
    //this.showFreezeTimer();
    this.time.events.add(Phaser.Timer.SECOND * 1, this.fadeFreeze, this);
    //this.time.events.add(Phaser.Timer.SECOND * 5, this.resetPTwoSpecialAttack, this);
  }

  // showFreezeTimer() {
  //
  // }

  fadeFreeze() {
    this.playerOneFreeze = false;
  }

  setupFire() {
    this.nextFireAt = 0;
    this.fireDelay = 5000;

    this.firePool = this.add.group();
    this.firePool.enableBody = true;
    this.firePool.physicsBodyType = Phaser.Physics.ARCADE;
    // Add 100 'bullet' sprites in the group.
    this.firePool.createMultiple(200, 'bullet');
    this.firePool.setAll('anchor.x', 0.5);
    this.firePool.setAll('anchor.y', 0.5);
    // Automatically kill the bullet sprites when they go out of bounds
    this.firePool.setAll('outOfBoundsKill', true);
    this.firePool.setAll('checkWorldBounds', true);
  }

  loadFire() {
    this.playerOneFreeze = true;
    this.time.events.add(Phaser.Timer.SECOND * 0.5, this.breathFire, this);
  }

  breathFire() {
    if (this.nextFireAt > this.time.now) {
      return;
    }
    if (this.firePool.countDead() === 0) {
      return;
    }

    this.nextFireAt = this.time.now + this.fireDelay;

    for (var i = 0; i < 30; i++) {
      const bullet = this.firePool.getFirstExists(false);
      bullet.reset(this.player.x + i*60, this.player.y);
    }
      this.time.events.add(Phaser.Timer.SECOND * 1, this.fadeFire, this);
    //this.time.events.add(Phaser.Timer.SECOND * 5, this.resetSpecialAttackTimer, this);
    this.playerOneFreeze = false;
    this.pOneSpecialAvailable = false;
    this.flamethrowerSound.play();

  }

  resetSpecialAttackTimer() {
    this.pOneSpecialAvailable = true;
  }

  fadeFire() {
    this.firePool.destroy();
    this.setupFire();
  }

  // setupExplosions(){
  //   this.explosionPool = this.add.group();
  //   this.explosionPool.enableBody = true;
  //   this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
  //   this.explosionPool.setAll('anchor.x', 0.5);
  //   this.explosionPool.setAll('anchor.y', 0.5);
  //   this.explosionPool.forEach(explosion => {
  //     this.explosionPool.animations.add('boom');
  //   });
  // }
  // explode(sprite) {
  //   if (this.explosionPool.countDead() === 0) {
  //     return;
  //   }
  //   const explosion = this.explosionPool.getFirstExists(false);
  //   explosion.reset(sprite.x, sprite.y);
  //   explosion.play('boom', 15, false, true);
  //   explosion.body.velocity.x = sprite.body.velocity.x;
  //   explosion.body.velocity.y = sprite.body.velocity.y;
  // }
  checkCollisions(){
    this.physics.arcade.overlap(
        this.playerTwo , this.tacoPool, this.playerTwoHit, null, this
    );
    this.physics.arcade.overlap(
        this.player , this.icecreamPool, this.playerHit, null, this
    );

    this.physics.arcade.overlap(
        this.playerTwo , this.firePool, this.playerTwoHit, null, this
    );

    this.physics.arcade.overlap(
        this.tacoPool , this.icecreamPool, this.attackCollide, null, this
    );
  }

  processPlayerInput(){

    // TUTTI FRUTTI
    //-------------

    //this.playerTwo.body.velocity.x = 0;
    this.playerTwo.body.velocity.y = 0;
    this.playerTwo.body.collideWorldBounds = true;

    // if (this.cursors.left.isDown) {
    //   this.playerTwo.body.velocity.x = -this.playerTwo.data.speed;
    // } else if (this.cursors.right.isDown) {
    //   this.playerTwo.body.velocity.x = this.playerTwo.data.speed;
    // }

    if (this.cursors.up.isDown) {
      this.playerTwo.body.velocity.y = -this.playerTwo.data.speed;
    } else if (this.cursors.down.isDown) {
      this.playerTwo.body.velocity.y = this.playerTwo.data.speed;
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.M))
    {
        this.fireIcecream();
    }

    //special attack
    if (this.pTwoSpecialAvailable == true) {
      if (this.input.keyboard.isDown(Phaser.Keyboard.P))
      {
          this.freezePlayerOne();
      }
    }



    // TICO TACO
    //-------------

    //this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    this.player.body.collideWorldBounds = true;

    // if (this.input.keyboard.isDown(Phaser.Keyboard.Q)) {
    //   this.player.body.velocity.x = -this.player.data.speed;
    // } else if (this.input.keyboard.isDown(Phaser.Keyboard.D)) {
    //   this.player.body.velocity.x = this.player.data.speed;
    // }

    if (this.playerOneFreeze === false) {

      if (this.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        this.player.body.velocity.y = -this.player.data.speed;
      } else if (this.input.keyboard.isDown(Phaser.Keyboard.S)) {
        this.player.body.velocity.y = this.player.data.speed;
      }

      if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
      {
          this.fireTaco();
      }
      //special attack
      if (this.pOneSpecialAvailable == true) {
        if (this.input.keyboard.isDown(Phaser.Keyboard.X))
        {
            this.loadFire();
        }
      }
    }
  }

  shutdown() {
    // todo: remove de listeners
  }

}

module.exports = GameState;
