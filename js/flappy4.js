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
var score3 = 0;
var score4 = 0;
var labelScore;
var labelScore2;
var labelScore3;
var labelScore4;
var player;
var player2;
var player3;
var player4;
var pipes = [];
var End = [];
var highScore = 0;
var interval = -200
var interval2 = 2
var gravity = 400
var dead1 = false
var dead2 = false
var dead3 = false
var dead4 = false
var bothdead = false
var delay = 0
var jump = -200
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "../assets/yellow-flappy.png");
game.load.image("player2Img", "../assets/green-flappy.jpg.png")
game.load.image("player3Img", "../assets/red-flappy.png")
game.load.image("player4Img", "../assets/blue-flappy.png")
game.load.audio("score", "../assets/point.ogg");
game.load.image("backgroundImg", "../assets/ocean.jpg")
game.load.image("pipeBlock","../assets/pipe_blue.png")
game.load.image("PipeEnd", "../assets/pipe-end_blue.png")
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  var background = game.add.image(0, 0, "backgroundImg");
  background.width = 790
  background.height = 400;
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);
  labelScore = game.add.text(20, 20, "Player 1 score : 0",)
  labelScore2 = game.add.text(20, 50, "Player 2 score : 0")
  labelScore3 = game.add.text(20, 80, "Player 3 score : 0")
  labelScore4 = game.add.text(20, 110, "Player 4 score : 0")
  player = game.add.sprite(100, 200, "playerImg");
  player2 = game.add.sprite(100, 230, "player2Img")
  player3 = game.add.sprite(100, 260, "player3Img")
  player4 = game.add.sprite(100, 290, "player4Img")
  player.anchor.setTo(0.5, 0.5);
  player2.anchor.setTo(0.5, 0.5);
  player3.anchor.setTo(0.5, 0.5);
  player4.anchor.setTo(0.5, 0.5);
  player.scale.setTo(43 / 149, 33 / 108);
  player2.scale.setTo(43 / 82, 33 / 63);
  player3.scale.setTo(43 / 149, 33 / 108);
  player4.scale.setTo(43 / 159, 33 / 116)
  game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(easy)
  game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(medium)
  game.input.keyboard.addKey(Phaser.Keyboard.F).onDown.add(hard)
  game.input.keyboard.addKey(Phaser.Keyboard.G).onDown.add(impossible)
  generatePipe();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  game.physics.arcade.enable(player2);
  game.physics.arcade.enable(player3);
  game.physics.arcade.enable(player4);
  player.body.gravity.y = gravity;
  player2.body.gravity.y = gravity;
  player3.body.gravity.y = gravity;
  player4.body.gravity.y = gravity;
  game.input.keyboard.addKey(Phaser.Keyboard.Q).onDown.add(playerJump);
  game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.add(player2Jump);
  game.input.keyboard.addKey(Phaser.Keyboard.I).onDown.add(player3Jump);
  game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(player4Jump);
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
    player3, pipes, gameOver3);
  game.physics.arcade.overlap(
    player4, pipes, gameOver4);
    game.physics.arcade.overlap(
      player, End, gameOver1);
    game.physics.arcade.overlap(
      player2, End, gameOver2);
    game.physics.arcade.overlap(
      player3, End, gameOver3);
    game.physics.arcade.overlap(
      player4, End, gameOver4);
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
    if(player3.body.y < -40) {
      gameOver3();
    }
    if(player3.body.y > 440) {
      gameOver3();
    }
    if(player4.body.y < -40) {
      gameOver4();
    }
    if(player4.body.y > 440) {
      gameOver4();
    }
    player.rotation = Math.atan(player.body.velocity.y / 200);
    player2.rotation = Math.atan(player2.body.velocity.y / 200);
    player3.rotation = Math.atan(player3.body.velocity.y / 200);
    player4.rotation = Math.atan(player4.body.velocity.y / 200);
}
function gameOver1() {
player.kill();
dead1 = true;
if (dead2 && dead3 && dead4){
  gameOverall()
}
}
function gameOver2() {
player2.kill();
dead2 = true
if (dead1 && dead3 && dead4){
  gameOverall()
}
}
function gameOver3() {
player3.kill();
dead3 = true
if (dead1 && dead2 && dead4){
  gameOverall()
}
}
function gameOver4() {
player4.kill();
dead4 = true
if (dead1 && dead2 && dead3){
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
  if(dead3 == false){
    score3 = score3 + 1;
    labelScore3.setText("Player 3 score : "+score3.toString())
}
  if(dead4 == false){
    score4 = score4 + 1;
    labelScore4.setText("Player 4 score : "+score4.toString())
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
 // calculate a random position for the gap
 var gap = game.rnd.integerInRange(1 ,5);
 // generate the pipes, except where the gap should be
 for (var count=-3; count<11; count++) {
 if (count != gap && count != gap+1) {
   addPipeBlock(780, count*50);
   var pipeEnd = game.add.sprite(775, gap*50-25, "PipeEnd");
   End.push(pipeEnd);
   game.physics.arcade.enable(pipeEnd);
   pipeEnd.body.velocity.x = interval;
   var pipeEnd = game.add.sprite(775, gap*50+100, "PipeEnd")
   End.push(pipeEnd);
   game.physics.arcade.enable(pipeEnd);
   pipeEnd.body.velocity.x = interval;
 }
 }
 changeScore()
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
function player2Jump() {
  player2.body.velocity.y = jump;
}
function player3Jump() {
  player3.body.velocity.y = jump;
}
function player4Jump() {
  player4.body.velocity.y = jump;
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
