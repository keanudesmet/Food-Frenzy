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
    this.setupArduino();
    this.setupSpecialGroups();
    this.setupSpawnSpecials();
    //this.setupExplosions();
    //this.setupText();
    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {

    this.checkCollisions();
    if (this.gameEnded === false) {
      this.processPlayerInput();
    }

    if ((this.player.body.velocity.y === 0) && (this.shootAnim.isPlaying === false) && (this.fireAnim.isPlaying === false) && (this.frozenAnim.isPlaying === false)) {
      this.player.animations.play('stand');
    }
    if ((this.playerTwo.body.velocity.y === 0) && (this.shootAnimTwo.isPlaying === false)) {
      this.playerTwo.animations.play('stand');
    }

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  }

  playerHit(player, icecream){
    if (this.healthPlayer === 1) {
      this.healthPlayer -=1;
      player.kill();
      this.shutdown();
    }else {
      this.healthPlayer -=1;
    }
    this.updateHealth();
    icecream.kill();

    this.p1Immume = true;
    this.immumeEffectP1();
    this.time.events.add(Phaser.Timer.SECOND * 3, this.fadeImmumeP1, this);
    this.tacoHitSound.play();
    //this.explode(player);
  }

  playerTwoHit(player, taco){
    if (this.healthPlayerTwo === 1) {
      //console.log(this.healthPlayerTwo);
      this.healthPlayerTwo -=1;
      player.kill();
      this.shutdown();
    }else {
      this.healthPlayerTwo -=1;
      //console.log(this.healthPlayerTwo);
    }

    this.updateHealth();
    this.tacoHitSound.play();
    this.p2Immume = true;
    this.immumeEffectP2();
    this.time.events.add(Phaser.Timer.SECOND * 3, this.fadeImmumeP2, this);

    taco.kill();

    //this.explode(player);
    //   this.addToScore(' GAME OVEUR');
  }

  playerTwoFireHit(player, fire){
    if (this.healthPlayerTwo === 1) {
      this.healthPlayerTwo -=1;
      player.kill();
      this.shutdown();
    }else {
      this.healthPlayerTwo -=1;
    }

    this.updateHealth();
    this.tacoHitSound.play();

    this.p2Immume = true;
    this.immumeEffectP2();
    this.time.events.add(Phaser.Timer.SECOND * 3, this.fadeImmumeP2, this);

  }

  fadeImmumeP1() {
    this.p1Immume = false;
    console.log(this.p1Immume);
  }

  immumeEffectP1() {
    if (this.p1Immume === true) {
      this.player.alpha = 0.5;
      this.time.events.add(Phaser.Timer.SECOND * 0.1, this.fadeInvisibilityP1, this);
    }
  }

  fadeInvisibilityP1() {
    this.player.alpha = 1;
    this.time.events.add(Phaser.Timer.SECOND * 0.1, this.immumeEffectP1, this);
  }

  fadeImmumeP2() {
    this.p2Immume = false;
    console.log(this.p2Immume);
  }

  immumeEffectP2() {
    if (this.p2Immume === true) {
      this.playerTwo.alpha = 0.5;
      this.time.events.add(Phaser.Timer.SECOND * 0.1, this.fadeInvisibilityP2, this);
    }
  }

  fadeInvisibilityP2() {
    this.playerTwo.alpha = 1;
    this.time.events.add(Phaser.Timer.SECOND * 0.1, this.immumeEffectP2, this);
  }

  attackCollide(taco, iceCream) {
    taco.kill();
    iceCream.kill();
  }

  pickupFlamethrower(player, powerup) {
    this.pOneSpecialAvailable = true;
    this.game.arduinoPlugin.redLedBool = true;
    this.powerupSound.play();
    powerup.kill();
    console.log(this.pOneSpecialAvailable);
  }

  pickupIcywind(player, powerup) {
    this.pTwoSpecialAvailable = true;
    this.game.arduinoPlugin.blueLedBool = true;
    console.log(this.pTwoSpecialAvailable);
    this.powerupSound.play();
    powerup.kill();
  }

  setupBackground(){
    this.bg = this.add.sprite(this.world.width/2,this.world.height/2, 'bg2');
    this.bg.anchor.setTo(0.5,0.5);
  }

  setupGlobals(){
    this.pOneSpecialAvailable = true;
    this.pTwoSpecialAvailable = true;
    this.gameEnded = true;
    this.playerOneFreeze = false;
    this.yVelocity = 0;

    this.p1Immume = false;
    this.p2Immume = false;

    this.setupCountdown();
  }

  setupCountdown() {
    this.counter = 0;
    if (this.counter === 0) {
      this.scoreText = this.add.text(this.world.width/2, this.world.height/2, `3`,{font: `200px Cubano`, fill: `#FFFFFF`, align: `center`});
      this.scoreText.anchor.setTo(0.5, 0.5);
    }
    this.countdownTimer = this.game.time.create(false);
    this.countdownTimer.loop(1000, this.updateCounter, this);
    this.countdownTimer.start();
  }

  updateCounter() {
    this.counter++;

    if (this.counter === 1) {
      this.scoreText.text = `2`;
    }
    if (this.counter === 2) {
      this.scoreText.text = `1`;
    }
    if (this.counter === 3) {
      this.scoreText.text = `GOOO!`;
    }
    if (this.counter === 4) {
      this.scoreText.destroy();
      this.countdownTimer.stop();
      this.gameEnded = false;
    }

  }

  setupSounds() {
    this.tacoHitSound = this.add.audio(`tacoHit`);
    this.flamethrowerSound = this.add.audio(`flamethrowerSound`);
    this.icyWindSound = this.add.audio(`icywind`);
    this.powerupSound = this.add.audio(`powerup`);
    this.bgSound = this.add.audio(`bgm`);
    this.bgSound.stop();
    this.bgSound.play();
  }

  setupArduino() {

    this.game.arduinoPlugin.triggerTaco.add(() => {
      console.log('TRIGGER TACO');
      this.fireTaco();
      this.player.animations.play(`shoot`);
    });

    this.game.arduinoPlugin.triggerFlamethrower.add(() => {
      console.log('TRIGGER FLAMETHROWER');
      if (this.pOneSpecialAvailable === true) {
        this.loadFire();
      }
    });

    this.game.arduinoPlugin.triggerIceCream.add(() => {
      console.log('TRIGGER ICECREAM');
      this.fireIcecream();
      this.playerTwo.animations.play(`shoot`);
    });

    this.game.arduinoPlugin.triggerIcyWind.add(() => {
      console.log('TRIGGER FREEZE');
      //console.log(this.pTwoSpecialAvailable);
      if (this.pTwoSpecialAvailable === true) {
        this.freezePlayerOne();
      }
    });

    this.game.arduinoPlugin.triggerWalkUp.add(() => {
      console.log('TRIGGER WALKUP');
      if (this.playerOneFreeze === false) {
        this.player.body.velocity.y = -this.player.data.speed;
        if (this.shootAnim.isPlaying)
        {
          return;
        } else {
          this.player.animations.play(`walk`);
        }
      }
    });

    this.game.arduinoPlugin.triggerWalkDown.add(() => {
      //console.log(this.playerOneFreeze);
      if (this.playerOneFreeze === false) {
        this.player.body.velocity.y = this.player.data.speed;
        if (this.shootAnim.isPlaying)
        {
          return;
        } else {
          this.player.animations.play(`walk`);
        }
      }
    });

    this.game.arduinoPlugin.triggerWalkUpTwo.add(() => {
      console.log('TRIGGER WALKUP2');
      this.playerTwo.body.velocity.y = -this.playerTwo.data.speed;
      if (this.shootAnimTwo.isPlaying)
        {
          return;
        } else {
          this.playerTwo.animations.play(`walk`);
        }
    });

    this.game.arduinoPlugin.triggerWalkDownTwo.add(() => {
      console.log('TRIGGER WALKUP2');
      this.playerTwo.body.velocity.y = this.playerTwo.data.speed;
      if (this.shootAnimTwo.isPlaying)
        {
          return;
        } else {
          this.playerTwo.animations.play(`walk`);
        }
    });
  }

  setupSpecialGroups() {
    this.flamethrowerPickupPool = this.add.group();
    this.flamethrowerPickupPool.enableBody = true;
    this.flamethrowerPickupPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.flamethrowerPickupPool.createMultiple(50, 'jalapeno');
    this.flamethrowerPickupPool.setAll('anchor.x', 0.5);
    this.flamethrowerPickupPool.setAll('anchor.y', 0.5);

    this.icywindPickupPool = this.add.group();
    this.icywindPickupPool.enableBody = true;
    this.icywindPickupPool.physicsBodyType = Phaser.Physics.ARCADE;
    this.icywindPickupPool.createMultiple(50, 'icecream');
    this.icywindPickupPool.setAll('anchor.x', 0.5);
    this.icywindPickupPool.setAll('anchor.y', 0.5);
  }

  setupSpawnSpecials() {
    this.time.events.add(Phaser.Timer.SECOND * this.game.rnd.integerInRange(10, 15), this.spawnSpecial, this);
    this.time.events.add(Phaser.Timer.SECOND * this.game.rnd.integerInRange(10, 15), this.spawnSpecialTwo, this);
    this.time.events.add(Phaser.Timer.SECOND * 15, this.setupSpawnSpecials, this);

  }

  spawnSpecial() {

    if (this.flamethrowerPickupPool.countDead() === 0) {
      return;
    }

    const bullet = this.flamethrowerPickupPool.getFirstExists(false);
    // Reset (revive) the sprite and place it in a new location
    bullet.reset(100, this.game.rnd.integerInRange(100, this.world.height - 100));

  }

  spawnSpecialTwo() {
    if (this.icywindPickupPool.countDead() === 0) {
      return;
    }

    const bullet = this.icywindPickupPool.getFirstExists(false);
    // Reset (revive) the sprite and place it in a new location
    bullet.reset(this.world.width - 100, this.game.rnd.integerInRange(100, this.world.height - 100));
  }

  render() {

    //this.icywindPickup.debug();
    //this.flamethrowerPickup.debug();
    //this.game.debug.body(this.player);
    //this.game.debug.body(this.playerTwo);

    //this.game.debug.body(this.flamethrowerPickup);

  }


  setupPlayer(){

    this.player = new Player(this.game, 100, this.world.height/2, 'tico-atlas');
    this.player.body.setSize(120, 230, 50, 100);
    this.player.scale.setTo(0.6, 0.6);

    this.player.animations.add(`stand`, Phaser.Animation.generateFrameNames(`stand`, 1, 8, `.png`, 1), 23, true, false);
    this.player.animations.add(`walk`, Phaser.Animation.generateFrameNames(`walk`, 1, 7, `.png`, 1), 25, true, false);
    this.frozenAnim = this.player.animations.add(`frozen`, Phaser.Animation.generateFrameNames(`frozen`, 1, 2, `.png`, 1), 10, true, false);
    this.shootAnim = this.player.animations.add(`shoot`, Phaser.Animation.generateFrameNames(`shoot`, 1, 7, `.png`, 1), 25, false, false);
    this.fireAnim = this.player.animations.add(`fire`, Phaser.Animation.generateFrameNames(`fire`, 1, 16, `.png`, 1), 25, false, false);

    this.player.animations.play(`stand`);

    this.add.existing(this.player);


    this.playerTwo = new Player(this.game,this.world.width - 100, this.world.height/2, 'tutti-atlas');
    this.playerTwo.body.setSize(120, 230, 50, 100);
    this.playerTwo.scale.setTo(0.6, 0.6);

    this.playerTwo.animations.add(`stand`, Phaser.Animation.generateFrameNames(`stand`, 1, 8, `.png`, 1), 25, true, false);
    this.playerTwo.animations.add(`walk`, Phaser.Animation.generateFrameNames(`walk`, 1, 7, `.png`, 1), 25, true, false);
    this.shootAnimTwo = this.playerTwo.animations.add(`shoot`, Phaser.Animation.generateFrameNames(`shoot`, 1, 7, `.png`, 1), 35, false, false);
    this.playerTwo.animations.play(`stand`);

    this.add.existing(this.playerTwo);
  }

  setupHealth() {
    this.healthPlayer = 3;
    this.healthPlayerTwo = 3;

    this.healthBar = this.add.group();
    this.healthBarTwo = this.add.group();

    for (let i = 0; i < this.healthPlayer; i++) {
      //this.live = this.add.sprite(10 + i*120,10, 'heart');
      this.healthBar.create(50 + i*120,50, 'heart');
    }

    for (let i = 0; i < this.healthPlayerTwo; i++) {
      this.healthBarTwo.create(this.world.width - 160 - i*120,50, 'heart');
    }

  }

  updateHealth() {

    this.healthBar.destroy();
    this.healthBarTwo.destroy();
    this.healthBar = this.add.group();
    this.healthBarTwo = this.add.group();

    for (let i = 0; i < this.healthPlayer; i++) {
      this.healthBar.create(50 + i*120,50, 'heart');
    }

    for (let i = 0; i < this.healthPlayerTwo; i++) {
      this.healthBarTwo.create(this.world.width - 160 - i*120,50, 'heart');
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
    this.icecreamPool.createMultiple(100, 'icecream-fire');
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
    //console.log(this.yVelocity);
    //console.log(bullet.body.x);

    //let playershoot = this.player.animations.add('playershoot');
    //this.player.animations.play('playershoot', 30, false);

    //this.player.animations.add(`shoot`, [`shoot2.png`], 0, false, false);
    this.player.animations.play(`shoot`);
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
    bullet.reset(this.playerTwo.x - 100, this.playerTwo.y - 20);
    bullet.body.velocity.x =  -1500;
    bullet.body.velocity.y =  -600;
    bullet.body.gravity.y = 1200;

    this.playerTwo.animations.play('shoot');
  }

  freezePlayerOne() {
    this.game.arduinoPlugin.coldAirBool = true;
    this.playerOneFreeze = true;
    this.pTwoSpecialAvailable = false;
    this.game.arduinoPlugin.blueLedBool = false;
    this.player.animations.play(`frozen`);
    this.icyWindSound.play();
    this.time.events.add(Phaser.Timer.SECOND * 1.5, this.fadeFreeze, this);
  }

  fadeFreeze() {
    this.game.arduinoPlugin.coldAirBool = false;
    this.playerOneFreeze = false;
    this.player.animations.play('stand');
  }

  setupFire() {
    this.nextFireAt = 0;
    this.fireDelay = 5000;

    // this.firePool = this.add.group();
    // this.firePool.enableBody = true;
    // this.firePool.physicsBodyType = Phaser.Physics.ARCADE;
    // // Add 100 'bullet' sprites in the group.
    // this.firePool.createMultiple(200, 'bullet');
    // this.firePool.setAll('anchor.x', 0.5);
    // this.firePool.setAll('anchor.y', 0.5);
    // // Automatically kill the bullet sprites when they go out of bounds
    // this.firePool.setAll('outOfBoundsKill', true);
    // this.firePool.setAll('checkWorldBounds', true);


  }

  loadFire() {
    this.playerOneFreeze = true;
    this.time.events.add(Phaser.Timer.SECOND * 0.4, this.breathFire, this);
    this.player.animations.play(`fire`);
  }

  breathFire() {
    this.game.arduinoPlugin.hotAirBool = true;
    this.firePool = this.add.sprite(this.player.x + 35,this.player.y - 115, 'flamethrower');
    this.firePool.animations.add('flamethrower');
    this.firePool.animations.play('flamethrower', 30, true);
    this.game.physics.arcade.enable(this.firePool);

    this.time.events.add(Phaser.Timer.SECOND * 1, this.fadeFire, this);

    this.playerOneFreeze = false;
    this.pOneSpecialAvailable = false;
    this.game.arduinoPlugin.redLedBool = false;
    //console.log(this.pOneSpecialAvailable);
    this.flamethrowerSound.play();

  }

  fadeFire() {
    this.game.arduinoPlugin.hotAirBool = false;
    this.firePool.destroy();
    this.setupFire();
    this.player.animations.play('stand');
  }

  checkCollisions(){

    if (this.p2Immume === false) {

      this.physics.arcade.overlap(
          this.playerTwo , this.tacoPool, this.playerTwoHit, null, this
      );

      this.physics.arcade.collide(
          this.playerTwo , this.firePool, this.playerTwoFireHit, null, this
      );

    }

    if (this.p1Immume === false) {

      this.physics.arcade.overlap(
          this.player , this.icecreamPool, this.playerHit, null, this
      );

    }

    this.physics.arcade.overlap(
        this.player , this.flamethrowerPickupPool, this.pickupFlamethrower, null, this
    );

    this.physics.arcade.collide(
        this.playerTwo , this.icywindPickupPool, this.pickupIcywind, null, this
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

    if (this.cursors.up.isDown) {
      this.playerTwo.body.velocity.y = -this.playerTwo.data.speed;
      if (this.shootAnimTwo.isPlaying)
        {
          return;
        } else {
          this.playerTwo.animations.play(`walk`);
        }
    } else if (this.cursors.down.isDown) {
      this.playerTwo.body.velocity.y = this.playerTwo.data.speed;
      if (this.shootAnimTwo.isPlaying)
        {
          return;
        } else {
          this.playerTwo.animations.play(`walk`);
        }
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

    if (this.playerOneFreeze === false) {

      if (this.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        this.player.body.velocity.y = -this.player.data.speed;
        if (this.shootAnim.isPlaying)
          {
            return;
          } else {
            this.player.animations.play(`walk`);
          }

      } else if (this.input.keyboard.isDown(Phaser.Keyboard.S)) {
        this.player.body.velocity.y = this.player.data.speed;
        if (this.shootAnim.isPlaying)
          {
            return;
          } else {
            this.player.animations.play(`walk`);
          }
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
    //this.game.arduinoPlugin.removeAll();
    //this.game.arduinoPlugin.triggerFlamethrower.remove();

    this.game.arduinoPlugin.triggerFlamethrower.remove(() => {});
    this.game.arduinoPlugin.triggerIceCream.remove(() => {});
    this.game.arduinoPlugin.triggerIcyWind.remove(() => {});
    this.game.arduinoPlugin.triggerWalkUp.remove(() => {});
    this.game.arduinoPlugin.triggerWalkDown.remove(() => {});
    this.game.arduinoPlugin.triggerWalkUpTwo.remove(() => {});
    this.game.arduinoPlugin.triggerWalkDownTwo.remove(() => {});
    this.gameEnded = true;

    this.flamethrowerPickupPool.destroy();
    this.icywindPickupPool.destroy();

    this.player.body.velocity.y = 0;
    this.playerTwo.body.velocity.y = 0;

    this.setupPlay();
  }

  setupPlay() {
    this.start = this.add.button(this.game.width/2, 800, 'replay', this.startClick, this);
    this.start.anchor.setTo(0.5,0.5);
    if (this.healthPlayer === 0) {
        this.playerTwo.y = 300;
        this.playerTwo.x = this.world.width/2;
        this.endingText = this.add.text(this.world.width/2, this.world.height/2 + 100, `3`,{font: `100px Cubano`, fill: `#FFFFFF`, align: `center`});
        this.endingText.anchor.setTo(0.5, 0.5);
        this.endingText.text = `Tutti Frutti won!`;
        this.playerTwo.scale.setTo(1.2, 1.2);
        this.playerTwo.body.velocity.y = 0;
    }
    if (this.healthPlayerTwo === 0) {
      this.player.y = 300;
      this.player.x = this.world.width/2;
      this.endingText = this.add.text(this.world.width/2, this.world.height/2 + 100, `3`,{font: `100px Cubano`, fill: `#FFFFFF`, align: `center`});
      this.endingText.anchor.setTo(0.5, 0.5);
      this.player.scale.setTo(1.2, 1.2);
      this.endingText.text = `Tico Taco won!`;
      this.playerTwo.body.velocity.y = 0;
    }
  }

  startClick() {
    this.bgSound.stop();
    this.setupGlobals();
    this.setupSpecialGroups();
    this.state.start(`GameState`);
    this.scoreText.destroy();
  }

}

module.exports = GameState;
