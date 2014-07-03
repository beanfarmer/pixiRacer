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
  xflip: null,
  yflip: null,
  background: null,
  score: null,
  isMoving: null,
  shot: null,
  texture: [],
  enemies: [],
  trucks: [],
  keys: [],
  shots: [],

  init: function(){
    this.initKeys();
    this.stage = new PIXI.Stage();
    this.render = PIXI.autoDetectRenderer(SCREENWIDTH, SCREENHEIGHT);
    document.body.appendChild(this.render.view);

    //setup vars
    this.score = 0;
    this.isMoving = false;
    this.xflip = false;
    this.yflip = false;
    this.loadTextures();
    this.shot = false;

    this.background = this.setupSprite(this.texture[0], 0.0, 0.0, 0, -260); //setup the background;
    this.stage.addChild(this.background);

    this.player = this.setupSprite(this.texture[1], 0.5, 0.5, PLAYERSTARTX, PLAYERSTARTY); //setup the player
    this.playerSpeedX = 0.0;
    this.playerSpeedY = 0.0;
    this.stage.addChild(this.player);

    requestAnimFrame(Loop);
  },

  initKeys: function(){
    for(var i = 0; i < 6; i++){
      this.keys[i] = false;
      console.log("key: " + this.keys[i]);
    }
    this.shot = false;
    document.body.addEventListener('keydown',Game.keyDownHandler, false);
    document.body.addEventListener('keyup',  Game.keyUpHandler, false);
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
  },

  shoot: function(){
    this.shots.push(this.setupSprite(this.texture[3], 0.5, 0.0, this.player.position.x, this.player.position.y - 20));

    this.stage.addChild(this.shots[this.shots.length -1]);
    this.shot = false;
  },

  keyDownHandler: function(event){
    	var keyPressed = String.fromCharCode(event.keyCode);

       if (keyPressed == "W")
         {
           Game.keys[0] = true;
           isMoving = true;
         }
      else if (keyPressed == "D")
           {
             Game.keys[1] = true;
             isMoving = true;
           }
      else if (keyPressed == "S")
        {
          Game.keys[2] = true;
          isMoving = true;
        }
      else if (keyPressed == "A")
        {
          Game.keys[3] = true;
          isMoving = true;
        }
      else if(keyPressed == "m")
        {
          Game.keys[4] = true;
          this.shot = true;
        }
  },

  keyUpHandler: function(event){
    var keyPressed = String.fromCharCode(event.keyCode);

     if (keyPressed == "W")
       {
         Game.keys[0] = false;
         isMoving = false;
       }
    else if (keyPressed == "D")
         {
           Game.keys[1] = false;
           isMoving = false;
         }
    else if (keyPressed == "S")
      {
        Game.keys[2] = false;
        isMoving = false;
      }
    else if (keyPressed == "A")
      {
        Game.keys[3] = false;
        isMoving = false;
      }
    else if(keyPressed == "m")
      {
        Game.keys[4] = false;
        Game.shot = false;
      }
  },

  keysHandler: function(){
    if(this.keys[0] === true){
      this.accelerate();
    }

    if(this.keys[1] === true){
      this.moveRight();
    }

    if(this.keys[2] === true){
      this.useBreaks();
    }

    if(this.keys[3] === true){
      this.moveLeft();
    }

    if(this.keys[4] === true){
      this.shoot();
    }
  },

  updateShots: function(){
    for(var i = 0; i < this.shots.length; i++){
      if(this.shots[i].position.y > 0){
        this.shots[i].position.y -= 5.0;
      }

      if(this.shots[this.shots.length - 1].position.y < 0){
        this.shots[this.shots.length -1].position.y = -100;
        this.stage.removeChild(this.shots[i]);
        this.shots.pop();
      }
    }
  }
};


function Loop(){
  Game.scrollBackground();
  Game.keysHandler();

  Game.boundsCheck(Game.player);
  Game.shoot();
    if(Game.shot === true){
      Game.shoot();
    }

  if(Game.shots.length -1 >= 0){
    Game.updateShots();
  }

  Game.updatePlayer();
  requestAnimFrame(Loop); //update the screen
  Game.render.render(Game.stage); //draw the backbuffer to the screen
}
