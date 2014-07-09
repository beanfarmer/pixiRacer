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
  shotGap: null,
  texture: [],
  enemies: [],
  trucks: [],
  keys: [],
  shots: [],

  init: function(){
    //setup keylisteners
    this.initKeys();

    //setup the stage
    this.stage = new PIXI.Stage();
    this.render = PIXI.autoDetectRenderer(SCREENWIDTH, SCREENHEIGHT);
    document.body.appendChild(this.render.view);

    //setup vars
    this.score = 0;
    this.isMoving = false;
    this.xflip = false;
    this.yflip = false;
    this.shot = false;

    //get in our images
    this.loadTextures();

    //setup the background
    this.background = this.setupSprite(this.texture[0], 0.0, 0.0, 0, -260); //setup the background;
    this.stage.addChild(this.background);

    //setup the player
    this.player = this.setupSprite(this.texture[1], 0.5, 0.5, PLAYERSTARTX, PLAYERSTARTY); //setup the player
    this.playerSpeedX = 0.0;
    this.playerSpeedY = 0.0;
    this.stage.addChild(this.player);

    requestAnimFrame(Loop);
  },

  initKeys: function(){

    for(var i = 0; i < 6; i++){
      this.keys[i] = false; //set all our keys to false
      //console.log("key: " + this.keys[i]);
    }

    //add the keylistenters to the body
    document.body.addEventListener('keydown',Game.keyDownHandler, false);
    document.body.addEventListener('keyup',  Game.keyUpHandler, false);
  },

  loadTextures: function(){
    //add our images to an array of textures
    this.texture[0] = PIXI.Texture.fromImage('img/road.png');
    this.texture[1] = PIXI.Texture.fromImage('img/car.png');
    this.texture[2] = PIXI.Texture.fromImage('img/enCar.png');
    this.texture[3] = PIXI.Texture.fromImage('img/shot00.png');
    this.texture[4] = PIXI.Texture.fromImage('img/truckDturbo.png');
    this.texture[5] = PIXI.Texture.fromImage('img/Dturbo.png');
  },

  setupSprite: function(texture, anchorX, anchorY, startX, startY){
    //create a temp sprite
    var sprite = new PIXI.Sprite(texture);

    //set the anchor points for the sprite
    sprite.anchor.x = anchorX;
    sprite.anchor.y = anchorY;

    //set the start pos for the sprite
    sprite.position.x = startX;
    sprite.position.y = startY;

    //return our setup sprite
    return sprite;
  },

  boundsCheck: function(object){
    //width first
    //if the object is past the left of the screen
    if(object.position.x < 0){
      object.position.x = SCREENWIDTH; //come out on the right side
    }
    else if(object.position.x > SCREENWIDTH){ //flip above
      object.position.x = 0;
    }

    //then height
    //if the player is at the top of the screen
    if(object.position.y < 0){
      object.position.y = SCREENHEIGHT; // come out at the bottom
    }
    else if(object.position.y > SCREENHEIGHT){ //flip above
      object.position.y = 0;
    }
  },

  accelerate: function(){
    //move up the screen
    if(this.playerSpeedY > MINSPEED){
      this.playerSpeedY -= 0.2;
    }
  },

  useBreaks: function(){
    //move down the screen
    if(this.playerSpeedY < MAXSPEED){
      this.playerSpeedY += 0.2;
    }
  },

  moveLeft: function(){
    //guess what this does
    if(this.playerSpeedX > MINSPEED){
      this.playerSpeedX -= 0.2;
    }
  },

  moveRight: function(){
    //and this bet you cant tell
    if(this.playerSpeedX < MAXSPEED){
      this.playerSpeedX += 0.2;
    }
  },


  scrollBackground: function(){
    //loop the background
    if(this.background.position.y < 0){
        this.background.position.y += 4;
    }else{
      this.background.position.y = -260;
    }
  },

  updatePlayer: function(){
    //move the player
    this.player.position.x += this.playerSpeedX;
    this.player.position.y += this.playerSpeedY;
  },

  shoot: function(){
    //add the new spirte to the shots array
    this.shots.push(this.setupSprite(this.texture[3], 0.5, 0.0, this.player.position.x, this.player.position.y - 20));

    //add that to the array
    this.stage.addChild(this.shots[this.shots.length -1]);

    //set shots to false for key tracking
    this.shot = false;
  },

  keyDownHandler: function(event){
    //get the key that triggered the event
    	var keyPressed = String.fromCharCode(event.keyCode);

       if (keyPressed == "W")
         {
           Game.keys[0] = true; //tell our array we have pressed a key
           isMoving = true; //tell the engine we want to be moving
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
      else if(keyPressed == " ")
        {
          Game.keys[4] = true; //keys[4] is shooting
          this.shot = true; // tell the game to update the shots
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
    else if(keyPressed == " ")
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

      if(this.shots[i].position.y <= 0){
        this.shots[i].position.y = -100;
      }
    }
  },

  flushShots: function(){
    shotsLen = this.shots.length - 1;
    if(shotsLen > 200){
      for(;shotsLen > 0; shotsLen--){
        this.stage.removeChild(this.shots[shotsLen]);
        this.shots.pop();
      }
    }
  }
};


function Loop(){
  Game.scrollBackground();
  Game.keysHandler();

  Game.boundsCheck(Game.player);
    if(Game.shot === true){
      Game.shoot();
      Game.flushShots();
    }
  if(Game.shots.length -1 >= 0){
    Game.updateShots();
  }

  Game.updatePlayer();
  requestAnimFrame(Loop); //update the screen
  Game.render.render(Game.stage); //draw the backbuffer to the screen
}
