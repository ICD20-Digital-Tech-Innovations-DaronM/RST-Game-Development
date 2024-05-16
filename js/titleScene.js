//global phaser//
//Created by Daron McCarthy 
//This is the Splash Scene



class TitleScene extends Phaser.Scene {

  constructor() {
    super({ key: 'titleScene' })

    this.titleSceneBackgroundImage = null
    
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#000000')
  }

  preload() {
    console.log('Title Scene')
    this.load.image('titleSceneBackground', '././assets/Titlescreen.jpg')
  }


  create (data) {
    this.titleSceneBackgroundImage = this.add.image(0, 0, 'titleSceneBackground').setScale(1.40)
    this.titleSceneBackgroundImage.x = 1920 / 2
    this.titleSceneBackgroundImage.y = 1080 / 2
  }

  update(time, delta) {
    if (time > 9000) {
      this.scene.switch('menuScene')
    }
  }
}

export default TitleScene