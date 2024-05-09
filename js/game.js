/* global Phaser */

import SplashScene from "./splashScene.js"
import TitleScene from "./titleScene.js"

//Our game scene
const splashScene = new SplashScene()
const titleScene = new TitleScene()

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  physics: {
    default: 'arcade',
    arcade: {
    debug: true,
  },
},
// set background color
backgroundColor: 0xffffff,
scale: {
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
// start title
game.scene.start("splashScene")
//game.scene.start('titleScene')