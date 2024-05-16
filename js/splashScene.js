//global phaser//
//Created by Daron McCarthy
//This is the Splash Scene



class SplashScene extends Phaser.Scene {
  constructor() {
    super({ key: 'splashScene' })
    console.log('Splash Scene')
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#000000')
  }

  preload() {
    console.log('Splash Scene')
    this.load.video('splashSceneBackground','././assets/splashSceneVideo.mp4')
  }


  create (data) {
    this.splashSceneBackgroundImage = this.add.video(0, 0, 'splashSceneBackground')
    this.splashSceneBackgroundImage.play()
    this.splashSceneBackgroundImage.x = 1920 / 2
    this.splashSceneBackgroundImage.y = 1080 / 2
    this.scale.startFullscreen()
  }

  update(time, delta) {
    if (time > 6000) {
    this.scene.switch('titleScene')
  }
 }
}
export default SplashScene