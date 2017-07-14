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
var score2 = 0;
var labelScore;
var labelScore2;
var player;
var player2;
var pipes = [];
var End = [];
var highScore = 0;
var interval = -200
var interval2 = 2
var gravity = 400
var dead1 = false
var dead2 = false
var bothdead = false
var delay = 0
var jump = -200
var balloons = [];
var weight = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "../assets/yellow-flappy.png");
game.load.image("player2Img", "../assets/green-flappy.jpg.png")
game.load.audio("score", "../assets/point.ogg");
game.load.image("backgroundImg", "../assets/background.jpg")
game.load.image("pipeBlock","../assets/pipe.png")
game.load.image("balloons", "../assets/balloons.png")
game.load.image("weight", "../assets/weight.png")
game.load.image("PipeEnd", "../assets/pipe-end.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  var background = game.add.image(0, 0, "backgroundImg");
  background.width = 790
  background.height = 400;
  labelScore = game.add.text(20, 20, "Player 1 score : 0")
  labelScore2 = game.add.text(20, 50, "Player 2 score : 0")
  player = game.add.sprite(100, 200, "playerImg");
  player2 = game.add.sprite(100, 230, "player2Img")
  player.anchor.setTo(0.5, 0.5);
  player2.anchor.setTo(0.5, 0.5);
  player.scale.setTo(43 / 149, 33 / 108);
  player2.scale.setTo(43 / 83, 33 / 63);
  generatePipe();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  game.physics.arcade.enable(player2);
  player.body.gravity.y = gravity;
  player2.body.gravity.y = gravity;
  game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(playerJump);
  game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(player2Jump);
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
    player, pipes, gameOver1);
  game.physics.arcade.overlap(
    player2, pipes, gameOver2);
  game.physics.arcade.overlap(
    player, End, gameOver1);
  game.physics.arcade.overlap(
    player2, End, gameOver2);
    if(player.body.y < -40) {
      gameOver1();
    }
    if(player.body.y > 440) {
      gameOver1();
    }
    if(player2.body.y < -40) {
      gameOver2();
    }
    if(player2.body.y > 440) {
      gameOver2();
    }
    player.rotation = Math.atan(player.body.velocity.y / 200);
    player2.rotation = Math.atan(player2.body.velocity.y / 200);
}

function gameOver1() {
  player.kill();
  dead1 = true;
  if (dead2){
  gameOverall()
}
}
function gameOver2() {
player2.kill();
dead2 = true
if (dead1){
  gameOverall()
}
}
function gameOverall() {
  game.destroy()
}
function spaceHandler() {
  game.sound.play("score")
}
function changeScore() {
  if(dead1 == false){
  score = score + 1;
  labelScore.setText("Player 1 score : "+score.toString())
}
  if(dead2 == false){
    score2 = score2 + 1;
    labelScore2.setText("Player 2 score : "+score2.toString())
}
}
function moveRight() {
  player.x += 10;
}
function moveLeft() {
  player.x -=10;
}
function moveUp() {
  player.y -=10;
}
function moveDown() {
  player.y +=10;
}
function generatePipe() {
 var gap = game.rnd.integerInRange(1 ,5);
 var random = game.rnd.integerInRange(-25, 25)
 for (var count=-3; count<11; count++) {
 if (count != gap && count != gap+1) {
   addPipeBlock(780, count*50 + random);
   var pipeEnd = game.add.sprite(775, gap*50 - 10 + random, "PipeEnd");
   End.push(pipeEnd);
   game.physics.arcade.enable(pipeEnd);
   pipeEnd.body.velocity.x = interval;
   var pipeEnd = game.add.sprite(775, gap*50 + 90 + random, "PipeEnd")
   End.push(pipeEnd);
   game.physics.arcade.enable(pipeEnd);
   pipeEnd.body.velocity.x = interval;
  }
 }
changeScore();
 }

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = interval;
}
function playerJump() {
  player.body.velocity.y = jump;
}
function player2Jump() {
  player2.body.velocity.y = jump;
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
function generateBalloons(){
 var bonus = game.add.sprite(780, 360, "balloons");
 balloons.push(bonus);
 game.physics.arcade.enable(bonus);
 bonus.body.velocity.x = -200;
 bonus.body.velocity.y = -game.rnd.integerInRange(60,100);
}
function generateWeight(){
 var bonus2 = game.add.sprite(780, 20, "weight");
 weight.push(bonus2);
 game.physics.arcade.enable(bonus2);
 bonus2.body.velocity.x = -200;
 bonus2.body.velocity.y = game.rnd.integerInRange(60,100);
}
function generate() {
 var diceRoll = game.rnd.integerInRange(1, 10);
  if(diceRoll==1) {
    generateBalloons();
  } else if(diceRoll==2) {
    generateWeight();
  } else{
    generatePipe();
  }
}
