//global phaser//
//Created by Daron McCarthy 
//This is the Splash Scene



class TitleScene extends Phaser.Scene {

  constructor() {
    super({ key: 'titleScene' })
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    console.log('Title Scene')
  }


  create (data) {
  }

  update(time, delta) {
  }
}

export default TitleScene