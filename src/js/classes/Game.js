import Boot from './states/Boot';
import Preload from './states/Preload';
import Intro from './states/Intro';
import GameState from './states/GameState';

export default class Game extends Phaser.Game {
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
