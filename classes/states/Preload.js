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
      this.load.audio(`powerup`, `assets/sounds/powerup.wav`);
      //
      // this.load.image(`bg`, `assets/bg.png`);
      //
      this.load.atlasJSONHash(`tico-atlas`, `assets/images/tico-atlas.png`, `assets/images/tico-atlas.json`);
      this.load.atlasJSONHash(`tutti-atlas`, `assets/images/tuttiatlas.png`, `assets/images/tuttiatlas.json`);
      //this.load.atlasJSONHash(`tico-atlas`, `assets/images/player2.png`, `assets/images/player2.json`);
      // this.load.atlasJSONHash(`components`, `assets/components.png`, `assets/components.json`);
      // this.load.atlasJSONHash(`player`, `assets/player.png`, `assets/player.json`);

      //this.load.bitmapFont(`roadfont`, `assets/road_fighter_font.png`, `assets/road_fighter_font.fnt`);

      this.load.image(`bg-menu`, `assets/images/bg-menu.jpg`);
      this.load.image(`play`, `assets/images/play.jpg`);
      this.load.image(`bg2`, `assets/images/8.jpg`);
      this.load.image(`bullet`, `assets/images/taco.png`);
      this.load.image(`icecream-fire`, `assets/images/icecream-shoot.png`);
      this.load.spritesheet(`flamethrower`, `assets/images/flamethrower.png`,1712 ,162);
      this.load.image(`playerTwo`, `assets/images/tuttifrutti.png`);
      this.load.image(`heart`, `assets/images/heart.png`);
      this.load.image(`jalapeno`, `assets/images/jalapeno.png`);
      this.load.image(`icecream`, `assets/images/icecream.png`);
    }
    create() {
      this.state.start(`Intro`);
    }
}

module.exports = Preload;
