/* global Phaser */

import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"
import MenuScene from "./menuScene.js"
import GameScene from "./gameScene.js"

//Our game scene
const splashScene = new SplashScene()
const titleScene = new TitleScene()
const menuScene = new MenuScene()
const gameScene = new GameScene()

const config = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
    debug: false,
  },
},
// set background color
backgroundColor: 0xffffff,
scale: { width: 1920,
    height: 1080,
    mode: Phaser.Scale.FIT,
    //we place it in the middle of the page.
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
}


const game = new Phaser.Game(config)
// console.log(game)

// load scenes
// NOTE: remember any "key" is global and CAN NOT be reused
game.scene.add("splashScene", splashScene)
game.scene.add("titleScene", titleScene)
game.scene.add("menuScene", menuScene)
game.scene.add("gameScene", gameScene)

// start title
game.scene.start("splashScene")
//game.scene.start('titleScene')