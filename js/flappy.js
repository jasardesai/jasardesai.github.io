// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
    // set the background colour of the scene
var score = 0;
var labelScore;
var player;
var pipes = [];
var End = [];
var highScore = 0;
var interval = -200
var interval2 = 2
var gravity = 400
var delay = 0
var jump = -200
var balloons = []
var weight = []
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "../assets/yellow-flappy.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipeBlock","../assets/pipe_yellow.png")
game.load.image("desertImg","../assets/desert.jpg")
game.load.image("balloons","../assets/balloons.png")
game.load.image("weight","../assets/weight.png")
game.load.image("PipeEnd", "../assets/pipe-end_yellow.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  var background = game.add.image(0, 0, "desertImg");
  background.width = 790
  background.height = 400;
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);
  labelScore = game.add.text(20, 20, "Player 1 score : 0")
  player = game.add.sprite(100, 200, "playerImg");
  player.anchor.setTo(0.5, 0.5);
  player.scale.setTo(43 / 149, 33 / 108);
  game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(easy)
  game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(medium)
  game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(hard)
  game.input.keyboard.addKey(Phaser.Keyboard.F).onDown.add(impossible)
  generatePipe();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y = gravity;
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
  var pipeInterval = interval2 * Phaser.Timer.SECOND;
  game.time.events.loop(
    pipeInterval,
    generatePipe
  );
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(
    player, pipes, gameOverall);
    game.physics.arcade.overlap(
    player, End, gameOverall);
    if(player.body.y < -40) {
      gameOverall();
    }

    if(player.body.y > 440) {
      gameOverall();
    }
    player.rotation = Math.atan(player.body.velocity.y / 200);
}


function gameOverall() {
  game.destroy()
}
function spaceHandler() {
  game.sound.play("score")
}
function changeScore() {
  score = score + 1;
  labelScore.setText("Player 1 score : "+score.toString())
}

function generatePipe() {
 var gap = game.rnd.integerInRange(1 ,5);
 for (var count=-3; count<11; count++) {
 if (count != gap && count != gap+1) {
   addPipeBlock(780, count*50);
   var pipeEnd = game.add.sprite(775, gap*50-5, "PipeEnd");
   End.push(pipeEnd);
   game.physics.arcade.enable(pipeEnd);
   pipeEnd.body.velocity.x = interval;
   var pipeEnd = game.add.sprite(775, gap*50+100, "PipeEnd")
   End.push(pipeEnd);
   game.physics.arcade.enable(pipeEnd);
   pipeEnd.body.velocity.x = interval;
  }
 }
changeScore();
 }

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock")
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = interval
}
function playerJump() {
  player.body.velocity.y = jump;
}
function easy() {
  interval = -150
  interval2 = 2.5
  gravity = 350
}
function medium() {
  interval = -250
  interval2 = 2
  gravity = 300
}
function hard() {
  interval = -350
  interval2 = 1.5
  gravity = 250
}
function impossible() {
  interval = -450
  interval2 = 1
  gravity = 200
}
