//global phaser//
//Created by Daron McCarthy 
//This is the Menu Scene



class MenuScene extends Phaser.Scene {

  constructor() {
    super({ key: 'menuScene' })

    this.menuSceneBackgroundImage = null
    this.startButton
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#fffff')
  }

  preload() {
    console.log('Menu Scene')
    this.load.image('menuSceneBackground', '././assets/MenuScreen.jpeg')
    this.load.image('startButton', '././assets/Startbutton.png')
    this.load.video('introVideo', '././assets/introScene.mp4')


  }


  create (data) {
    this.reset = false
    this.titleMenuBackgroundImage = this.add.image(0, 0, 'menuSceneBackground').setScale(3.00)
  this.titleMenuBackgroundImage.x = 1920 / 2
  this.titleMenuBackgroundImage.y = 1080 / 2

  this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton').setScale(0.60)
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
  }

  update(time, delta) {
    (this.reset)? this.scene.restart() : null
  }

   clickButton() {
      this.introVideo = this.add.video(1920 / 2, 1080 / 2, 'introVideo').setScale(1.15)
      this.introVideo.play()

      this.introVideo.on('complete', function () {
        this.scene.switch('gameScene')
        this.reset = true;
      }, this)
  }
}

export default MenuScene