//global phaser//
//Created by Daron McCarthy
//This is the Splash Scene



class OutroScene extends Phaser.Scene {
  constructor() {
    super({ key: 'outroScene' })
    console.log('Splash Scene')
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#000000')
  }

  preload() {
    
  }


  create (data) {
    // Show outro video
    this.add.video(1920/2,1080/2,'outroScene').play().setScale(1.3).on("complete", function (){
      this.scene.switch('menuScene')
    }.bind(this))
  }

  update(time, delta) {
    
 }
}
export default OutroScene