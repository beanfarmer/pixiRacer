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
  }

};

function Loop(){
  requestAnimFrame(Loop); //update the screen
  Game.render.render(Game.stage); //draw the backbuffer to the screen
}
