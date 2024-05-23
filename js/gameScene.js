class GameScene extends Phaser.Scene {

  constructor() {
    super({ key: 'gameScene' });
    this.backgroundMusic = null;
    this.background = null;
    this.fireMissile = false;
    this.score = 0;
    this.scoreText = null;
    this.scoreTextStyle = { font: '65px Lora', fill: '#c40606', align: 'center' }

    this.gameOverText = null;
    this.gameOverTextStyle = { font: '65px Lora', fill: '#c40606', align: 'center' }
  }

  init(data) {
    this.cameras.main.setBackgroundColor('#fffff');
  }

  preload() {
    console.log('Game Scene');
    // Background video
    this.load.video('gameSceneBackground', '././assets/Background.mp4');
    this.load.image('ship', '././assets/Goku.png');
    this.load.image('shipL', '././assets/Gokudash.png');
    this.load.image('shipF', '././assets/Gokufire.png');
    this.load.image('shipD', '././assets/Gokudown.png');
    this.load.image('shipR', '././assets/GokudashR.png');
    this.load.image('missile', '././assets/Kiblast.png');
    this.load.image('alien', '././assets/alien.png');
    this.load.image('f', '././assets/f.png')
    this.load.video('outroScene', '././assets/outroScene.mp4');

    // Sound
    this.load.audio('missileSound', '././assets/Kiblast.mp3');
    this.load.audio('backgroundMusic', '././assets/BGmusic.mp3');
    this.load.audio('explosion', '././assets/Explosion.mp3');

  }

  create(data) {
    
    this.background = this.add.video(0, 0, 'gameSceneBackground').setScale(1.0);
    this.background.setOrigin(0, 0);
    this.background.play(true); // Play the video in a loop

    this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle);

    this.ship = this.physics.add.sprite(1920 / 2, 1080 / 2, 'ship').setScale(1.00);


    // Create a group for the missiles
    this.missileGroup = this.physics.add.group();

    // Create a group for the aliens
    this.alienGroup = this.add.group();
    this.createAlien();

    // Collisions between missiles and aliens
    this.physics.add.collider(this.missileGroup, this.alienGroup, function(missileCollide, alienCollide) {

      alienCollide.destroy();
      missileCollide.destroy();
      this.sound.play('explosion');
      this.score += 1;
      this.scoreText.setText('Score: ' + this.score.toString());
      this.createAlien();
      this.createAlien();
    }.bind(this))

    // Collisions between aliens and ship
    this.physics.add.collider(this.ship, this.alienGroup, function(shipCollide, alienCollide) {
      this.sound.play('explosion');
      // this.physics.pause();
      // alienCollide.destroy();
      shipCollide.setAlpha(0);

      // Game over text and dimensions on the screen
      this.gameOverText = this.add.text(1920 / 2, 1080 / 2, 'Game Over!\nClick to play again.', this.gameOverTextStyle).setOrigin(0.5);
      this.gameOverText.setInteractive({ useHandCursor: true });

      // stop music
      this.backgroundMusic.stop()
      
      // Restarts the score if the game is over
      this.gameOverText.on('pointerdown', () => this.scene.restart());
    }.bind(this))


    // Play background music
    this.backgroundMusic = this.sound.add('backgroundMusic');
    this.backgroundMusic.play({ loop: true });

    this.frieza = this.physics.add.sprite(100, 1080 / 2, 'f').setScale(1)
    this.frieza.setPushable(false)

    this.friezaHP = 500
    this.friezaHpText = this.add.text(300,150, "Frieza HP : 500", {
      fontSize: "100px"
    })

    this.physics.add.collider(this.missileGroup, this.frieza, function(fre, missileCollide) {

      this.friezaHP -= 20
      missileCollide.destroy()
      if (this.friezaHP < 0) { 
        // stop music
        this.backgroundMusic.stop()
        this.scene.switch('outroScene')
        this.frieza.destroy();
      }
      this.friezaHpText.setText("Frieza HP : " + this.friezaHP)
      
      
    }.bind(this))
  }


  createAlien() {
    const alienYLocation = Math.floor(Math.random() * 1080) + 1;
    let alienYVelocity = Math.floor(Math.random() * 50) + 1; // This will get a number between 1 and 50
    alienYVelocity *= Math.round(Math.random()) ? 1 : -1; // This will decide direction
    const anAlien = this.physics.add.sprite(-100, alienYLocation, 'alien'); // Start alien from left side
    if (this.frieza) {
        this.frieza.y = anAlien.y
    }
  
    anAlien.body.velocity.x = 200; // Set velocity in x-direction for sideways movement
    anAlien.body.velocity.y = alienYVelocity;
    this.alienGroup.add(anAlien);
  }

  update(time, delta) {

    // Up, down, lkeys
    const keyLeftObj = this.input.keyboard.addKey('LEFT');
    const keyRightObj = this.input.keyboard.addKey('RIGHT');
    const keySpaceObj = this.input.keyboard.addKey('Z');
    const keyUpObj = this.input.keyboard.addKey('UP');
    const keyDownObj = this.input.keyboard.addKey('DOWN');

    this.ship.setTexture('ship').setScale(1);

    if (keyLeftObj.isDown) {
      this.ship.setTexture('shipL').setScale(0.3);
      this.ship.x -= 15;
      if (this.ship.x < 0) {
        this.ship.x = 0;
      }
    }
    if (keyRightObj.isDown) {
      this.ship.setTexture('shipR').setScale(1);
      this.ship.x += 15;
      if (this.ship.x > 1920) {
        this.ship.x = 1920;
      }
    }
    if (keyUpObj.isDown) {
      this.ship.y -= 15;
      if (this.ship.y < 0) {
        this.ship.y = 0;
      }
    }
    if (keyDownObj.isDown) {
      this.ship.setTexture('shipD').setScale(0.3);
      this.ship.y += 15;
      if (this.ship.y > 1080) {
        this.ship.y = 1080;
      }
    }
    if (keySpaceObj.isDown) {
      this.ship.setTexture('shipF').setScale(1);
      if (!this.fireMissile) {
        // Fires missile
        this.fireMissile = true;
        const aNewMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile');
        this.missileGroup.add(aNewMissile);
        this.sound.play('missileSound');
      }
    }
    if (keySpaceObj.isUp) {
      this.fireMissile = false;
    }
    this.missileGroup.children.each(function(item) {
      item.x -= 15;
      if (item.x < 0) {
        item.destroy();
      }
    }, this);
  }
}

export default GameScene;
