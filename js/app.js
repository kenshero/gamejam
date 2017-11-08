var GameState = {
  init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.game.physics.arcade.gravity.y = 1000
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 350;
  },
  preload: function() {
    this.load.image('ground', 'assets/images/ground.png')
    this.load.image('platform', 'assets/images/platform.png')
    this.load.image('goal', 'assets/images/gorilla3.png')
    this.load.image('arrowButton', 'assets/images/arrowButton.png')
    this.load.image('actionButton', 'assets/images/actionButton.png')
    this.load.image('barrel', 'assets/images/barrel.png')
    this.load.image('ringfire', 'assets/images/ringfire.png')
    this.load.image('pipe', 'assets/images/pipe.png')

    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1)
    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1)

    this.load.text('level3', 'assets/data/level3.json')
  },
  create: function() {
    //ground
    this.ground = this.add.sprite(0, 600, 'ground')
    this.ground.width = 1024
    this.game.physics.arcade.enable(this.ground)
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;


    //parse the file
    this.levelData = JSON.parse(this.game.cache.getText('level3'));

    //platforms
    this.platforms = this.add.group()
    this.platforms.enableBody = true


    this.levelData.platformData.forEach(function(element){
      this.platforms.create(element.x, element.y, 'platform')
    }, this)
    this.platforms.setAll('body.immovable', true)
    this.platforms.setAll('body.allowGravity', false)

    //ring of fire
    this.ringfires = this.add.group()
    this.ringfires.enableBody = true

    this.levelData.ringOfFireData.forEach(function(element){
      this.ringfires.create(element.x, element.y, 'ringfire')
    }, this)
    this.ringfires.setAll('body.immovable', true)
    this.ringfires.setAll('body.allowGravity', false)

    //pipe
    this.pipe = this.add.sprite(960, 546, 'pipe')
    this.game.physics.arcade.enable(this.pipe)
    this.pipe.body.allowGravity = false;
    this.pipe.body.immovable = true;

    //player
    this.player = this.add.sprite(30, 500, 'goal')
    // this.player.animations.add('walking', [0, 1, 2, 1], 6, true)
    this.game.physics.arcade.enable(this.player);
  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.ground)
    this.game.physics.arcade.collide(this.player, this.platforms)
    this.game.physics.arcade.collide(this.player, this.pipe, this.tidPipe)

    this.game.physics.arcade.overlap(this.player, this.ringfires, this.killPlayer)

    this.player.body.velocity.x = 0;

    if(this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      // this.player.scale.setTo(1, 1);
      // this.player.play('walking');
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      // this.player.scale.setTo(-1, 1);
      // this.player.play('walking');
    }
    else {
      // this.player.animations.stop();
      // this.player.frame = 3;
    }

    if(this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
      // this.player.customParams.mustJump = false;
    }

  },
  spinging: function() {
    console.log("play");
    this.sping.play("jumping")
  },
  killPlayer: function() {
    console.log("die")
    game.state.start('GameState')
  },
  tidPipe: function() {
    console.log("die")
    game.state.start('GameState')
  }
}

//initiate the Phaser framework
var game = new Phaser.Game(1024, 628, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
