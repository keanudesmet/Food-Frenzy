const Boot = require('./states/Boot');
const Preload = require('./states/Preload');
const Intro = require('./states/Intro');
const GameState = require('./states/GameState');

class Game extends Phaser.Game {
  constructor() {
    //'content' -> in de content div
    super(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content');

    this.state.add('GameState', GameState);
    this.state.add(`Boot`, Boot);
    this.state.add(`Preload`, Preload);
    this.state.add(`Intro`, Intro);
    this.state.start('Boot');
  }
}

module.exports = Game;
