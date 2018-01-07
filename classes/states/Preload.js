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
      this.load.audio(`bgm`, `assets/sounds/FOODFRENZY2.mp3`);
      this.load.audio(`icywind`, `assets/sounds/icywind2.mp3`);
      this.load.audio(`powerup`, `assets/sounds/powerup.wav`);

      this.load.atlasJSONHash(`tico-atlas`, `assets/images/tico-atlas.png`, `assets/images/tico-atlas.json`);
      this.load.atlasJSONHash(`tutti-atlas`, `assets/images/tuttiatlas.png`, `assets/images/tuttiatlas.json`);

      //this.load.bitmapFont(`roadfont`, `assets/road_fighter_font.png`, `assets/road_fighter_font.fnt`);

      this.load.image(`bg-menu`, `assets/images/bg-menu.jpg`);
      this.load.image(`play`, `assets/images/play.png`);
      this.load.image(`replay`, `assets/images/replay.png`);
      this.load.image(`bg2`, `assets/images/bg.png`);
      this.load.image(`bullet`, `assets/images/taco2.png`);
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
