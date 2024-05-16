//global phaser//
//Created by Daron McCarthy 
//This is the Menu Scene



class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameScene' })

    this.background = null
    this.fireMissile = false
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#fffff')
  }

  preload() {
    console.log('Game Scene')

    //background video
    this.load.video('gameSceneBackground', '././assets/Background.mp4')
    this.load.image('ship', '././assets/Goku.png')
    this.load.image('missle', '././assets/Kiblast.png')
  }


  create(data) {
    this.background = this.add.video(0, 0, 'gameSceneBackground').setScale(1.0)
    this.background.setOrigin(0, 0)
    this.background.play()
    this.background.on("complete", () => {
      this.background.play()
    }, this)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 / 2, 'ship').setScale(1.00)

    //create a group for the missles
    this.missleGroup = this.physics.add.group()


  }

  update(time, delta) {
    // Up and down keys

    const keyLeftObj = this.input.keyboard.addKey('LEFT') 
    const keyRightObj = this.input.keyboard.addKey('RIGHT')
    const keySpaceObj = this.input.keyboard.addKey('Z')

    if (keyLeftObj.isDown === true) {
      this.ship.x -= 15
      if (this.ship.x < 0) {
       this.ship.x = 0
      }
    }
    
    if (keyRightObj.isDown === true) {
        this.ship.x += 15
      if (this.ship.x > 1920) {
        this.ship.x = 1920
      }
    } 
    const keyUpObj = this.input.keyboard.addKey('UP') 
    
    const keyDownObj = this.input.keyboard.addKey('DOWN')

    if (keyUpObj.isDown === true) {
      this.ship.y -= 15
      if (this.ship.y < 0) {
        this.ship.y = 0
      }
    }

    if (keyDownObj.isDown === true) {
        this.ship.y += 15
      if (this.ship.y > 1080) {
        this.ship.y = 1080
      }
    } 

    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false ) {
        // fires missle
        this.fireMissile = true
        const aNewMissle = this.physics.add.sprite(this.ship.x, this.ship.y, 'missle')
        this.missleGroup.add(aNewMissle)
      }
    }

    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }
  }
}

export default GameScene