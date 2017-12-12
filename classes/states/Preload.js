class Preload extends Phaser.State {
  init() {
      this.preloader = this.add.sprite(this.game.width / 2, this.game.height / 2, `preloader`);
      this.preloader.animations.add(`preloading`);
      this.preloader.animations.play(`preloading`, 30, true);
      this.preloader.anchor.setTo(0.5, 0.5);
    }

    preload() {
      this.load.audio(`tacoHit`, `assets/sounds/splat.mp3`);
      this.load.audio(`flamethrowerSound`, `assets/sounds/flamethrower.mp3`);
      this.load.audio(`bgm`, `assets/sounds/foodfrenzy.mp3`);
      this.load.audio(`icywind`, `assets/sounds/icywind.mp3`);
      //
      // this.load.image(`bg`, `assets/bg.png`);
      //
      // this.load.atlasJSONHash(`tiles`, `assets/tiles.png`, `assets/tiles.json`);
      // this.load.atlasJSONHash(`components`, `assets/components.png`, `assets/components.json`);
      // this.load.atlasJSONHash(`player`, `assets/player.png`, `assets/player.json`);

      //this.load.bitmapFont(`roadfont`, `assets/road_fighter_font.png`, `assets/road_fighter_font.fnt`);

      this.load.image(`sea`, `assets/images/sea.png`);
      this.load.image(`bg2`, `assets/images/8.jpg`);
      this.load.image(`bullet`, `assets/images/taco.png`);
      this.load.spritesheet('greenEnemy', 'assets/images/enemy.png', 32, 32);
      this.load.spritesheet('explosion', 'assets/images/explosion.png', 32, 32);
      //this.load.spritesheet('player', 'assets/images/player.png', 200, 235);
      this.load.spritesheet('player', 'assets/images/ticotaco-walk.png', 252, 254);
      //this.load.image(`player`, `assets/images/ticotaco.png`);
      this.load.image(`playerTwo`, `assets/images/tuttifrutti.png`);
      this.load.image(`heart`, `assets/images/heart.png`);
      this.load.image(`button`, `assets/images/bomb.png`);
    }
    create() {
      this.state.start(`Intro`);
    }
}

module.exports = Preload;
