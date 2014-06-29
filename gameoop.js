//globle consts
var MAXSPEED = 5.0;
var MINSPEED = -5.0;

var PLAYERSTARTX = 70;
var PLAYERSTARTY = 240;

var SCREENWIDTH = 320;
var SCREENHEIGHT = 480;

//Game Class
var Game = {
  Loop: null,
  stage: null,
  render: null,
  player: null,
  playerSpeedX: null,
  playerSpeedY: null,
  background: null,
  score: null,
  texture: [],
  enemies: [],
  trucks: [],
  shots: [],

  init: function(){
    this.stage = new PIXI.Stage();
    this.render = PIXI.autoDetectRenderer(SCREENWIDTH, SCREENHEIGHT);
    document.body.appendChild(this.render.view);
    score = 0;
    this.loadTextures();

    this.background = this.setupSprite(this.texture[0], 0.0, 0.0, 0, -260); //setup the background;
    this.stage.addChild(this.background);

    this.player = this.setupSprite(this.texture[1], 0.5, 0.5, PLAYERSTARTX, PLAYERSTARTY); //setup the player
    this.stage.addChild(this.player);

    requestAnimFrame(Loop);
  },

  loadTextures: function(){
    this.texture[0] = PIXI.Texture.fromImage('img/road.png');
    this.texture[1] = PIXI.Texture.fromImage('img/car.png');
    this.texture[2] = PIXI.Texture.fromImage('img/enCar.png');
    this.texture[3] = PIXI.Texture.fromImage('img/shot00.png');
    this.texture[4] = PIXI.Texture.fromImage('img/truckDturbo.png');
    this.texture[5] = PIXI.Texture.fromImage('img/Dturbo.png');
  },

  setupSprite: function(texture, anchorX, anchorY, startX, startY){
    var sprite = new PIXI.Sprite(texture);

    sprite.anchor.x = anchorX;
    sprite.anchor.y = anchorY;

    sprite.position.x = startX;
    sprite.position.y = startY;

    return sprite;
  },

  checkKeys: function(){
    kd.UP.down(Game.accelerate);
    kd.DOWN.down(Game.useBreaks);
    kd.LEFT.down(Game.moveLeft);
    kd.RIGHT.down(Game.moveRight);
    kd.SPACE.down(Game.shoot);

    if(kd.UP.isDown() == false){ //yay
      Game.slowDown();
    }

    if(kd.DOWN.isDown() == false){ //yay
      Game.slowDown();
    }

    if(kd.LEFT.isDown() == false){ //yay
      Game.slowDown();
    }

    if(kd.RIGHT.isDown() == false){ //yay
      Game.slowDown();
    }
  },

  accelerate: function(){
    if(this.playerSpeedY > MINSPEED){
      this.playerSpeedY -= 0.2;
    }
  },

  useBreaks: function(){
    if(this.playerSpeedY < MAXSPEED){
      this.playerSpeedY += 0.2;
    }
  },

  moveLeft: function(){
    if(this.playerSpeedX > MINSPEED){
      this.playerSpeedX -= 0.2;
    }
  },

  moveRight: function(){
    if(this.playerSpeedX < MAXSPEED){
      this.playerSpeedX += 0.2;
    }
  },

  slowDown: function(){
    if(this.playerSpeedY > 0.0){
      this.playerSpeedY -= 0.05;
    }
    if(this.playerSpeedY < 0.0){
      this.playerSpeedY += 0.05;
    }
    if(this.playerSpeedX > 0.0){
      this.playerSpeedX -= 0.05;
    }
    if(this.playerSpeedX < 0.0){
      this.playerSpeedX += 0.05;
    }
  },

  scrollBackground: function(){
    if(this.background.position.y < 0){
        this.background.position.y += 4;
    }else{
      this.background.position.y = -260;
    }
  },

  updatePlayer: function(){
    this.player.position.x += this.playerSpeedX;
    this.player.position.y += this.playerSpeedY;
  }

};


function Loop(){
  kd.tick();

  Game.scrollBackground();
  Game.checkKeys();
  Game.updatePlayer();

  requestAnimFrame(Loop); //update the screen
  Game.render.render(Game.stage); //draw the backbuffer to the screen
}
