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
    initKeys();
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

  boundsCheck: function(object){
    if(object.position.x < 0){
      object.position.x = SCREENWIDTH;
    }else if(object.position.x > SCREENWIDTH){
      object.position.x = 0;
    }
    if(object.position.y < 0){
      object.position.y = SCREENHEIGHT;
    }else if(object.position.y > SCREENHEIGHT){
      object.position.y = 0;
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
    var xChanged = false;
    var yChanged = false;

    var speedX = this.player.playerSpeedX;
    var speedY = this.player.playerSpeedY;

    if(speedX < 0 && xChanged == false){
      speedX = speedX * -1;
      xChanged = true;
    }

    if(speedY < 0 && xChanged == false){
      speedY = speedY * -1;
      yChanged = true;
    }

    if(speedX > 0 && xChanged == false){
      this.player.playerSpeedX -= 0.05;
      speedY -= 0.05;
    }

    if(speedY > 0 && yChanged == false){
      this.player.playerSpeedY -= 0.05;
      speedY -= 0.05;
    }

    if(speedX > 0 && xChanged == true){
      this.player.playerSpeedX += 0.05;
      speedX -= 0.05;
    }

    if(speedY > 0 && yChanged == true){
      this.player.playerSpeedY += 0.05;
      speedY -= 0.05;
    }

    if(speedX == 0.0){
      xChanged = false;
      this.player.playerSpeedX = 0.0;
    }

    if(speedY == 0.0){
      yChanged = false;
      this.player.playerSpeedY = 0.0;
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
  Game.scrollBackground();
  Game.updatePlayer();

  Game.boundsCheck(Game.player);

  requestAnimFrame(Loop); //update the screen
  Game.render.render(Game.stage); //draw the backbuffer to the screen
}

function initKeys(){
  document.body.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 38 || evt.keyCode == 87) {
      Game.accelerate();
    }
  });

  document.body.addEventListener('keyup', function (evt) {
    if (evt.keyCode === 38 || evt.keyCode == 87) {
      Game.slowDown();
    }
  });


  document.body.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 40 || evt.keyCode == 83) {
      Game.useBreaks();
    }
  });

  document.body.addEventListener('keyup', function (evt) {
    if (evt.keyCode === 40 || evt.keyCode == 83) {
      Game.slowDown();
    }
  });

  document.body.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 37 || evt.keyCode == 65) {
      Game.moveLeft();
    }
  });

  document.body.addEventListener('keyup', function (evt) {
    if (evt.keyCode === 37 || evt.keyCode == 65) {
      Game.slowDown();
    }
  });

  document.body.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 39 || evt.keyCode == 68) {
      Game.moveRight();
    }
  });

  document.body.addEventListener('keyup', function (evt) {
    if (evt.keyCode === 39 || evt.keyCode == 68) {
      Game.slowDown();
    }
  });
}
