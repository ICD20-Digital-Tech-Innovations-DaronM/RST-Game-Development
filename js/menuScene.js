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
    
    // this.introVideo = this.add.video(0, 0, 'introVideo').setScale(3.00)
    // this.introVideo.loadURL('././assets/introScene.mp4')
    // this.introVideo.play()

    // this.introVideo.on('complete', function () {
    //   this.scene.start('gameScene')
    // }, this)
  }


  create (data) {
    this.titleMenuBackgroundImage = this.add.image(0, 0, 'menuSceneBackground').setScale(3.00)
  this.titleMenuBackgroundImage.x = 1920 / 2
  this.titleMenuBackgroundImage.y = 1080 / 2

  this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton').setScale(0.60)
    this.startButton.setInteractive({ useHandCursor: true })
    this.startButton.on('pointerdown', () => this.clickButton())
  }

  update(time, delta) {
  }

   clickButton() {
    //his.scene.start('gameScene')
     this.introVideo = this.add.video(1920 / 2, 1080 / 2, 'introVideo').setScale(1.15)
     this.introVideo.play()

     this.introVideo.on('complete', function () {
       this.scene.start('gameScene')
     }, this)
  }
}

export default MenuScene