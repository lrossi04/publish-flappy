// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

  player = game.load.image("playerImg", "../assets/Kimmy.png");
  game.load.image("playerImg2", "../assets/Kimmy1 .png");
  game.load.audio("score", "../assets/1023.wav");
  game.load.image("pipeBlock", "../assets/Trump2.0.png");
  game.load.image("background1", "../assets/North-Korean-Base.jpg");


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

  backyweed = game.add.sprite(0,0, "background1" );
  backyweed.height = 400;
  backyweed.width = 790;

  game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of the scene
    game.stage.setBackgroundColor("#ffffff");

    labelScore = game.add.text(700, 0, score.toString());

    generatePipe();


    game.add.text(0, 0, "The World Is");
    game.add.text(160, 0, " Kimmy's!");
    game.add.text(100, 200, "Super Flappy Kim", {font: "60px Arial", fill: "#000000"});
    //game.add.sprite(50, 200, "playerImg2");
    player = game.add.sprite(200, 200, "playerImg2");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 200;

    player.height = 50;
    player.width = 50;

    // game.input
    //   .keyboard.addKey(Phaser.Keyboard.RIGHT)
    //   .onDown.add(moveRight);
    //
    //   game.input
    //     .keyboard.addKey(Phaser.Keyboard.LEFT)
    //     .onDown.add(moveLeft);
    //
    //     game.input
    //       .keyboard.addKey(Phaser.Keyboard.UP)
    //       .onDown.add(moveUp);
    //
    //       game.input
    //         .keyboard.addKey(Phaser.Keyboard.DOWN)
    //         .onDown.add(moveDown);

    game.input.onDown.add(clickHandler);

  game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump);

    var pipeInterval = 3.5 * Phaser.Timer.SECOND;
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
        player,
      pipes,
   gameOver);
}

function gameOver() {
  location.reload();
}

function clickHandler(event) {
  game.add.sprite(event.x, event.y, "playerImg");
  game.sound.play("score");

  changeScore();

}

function playerJump(){
  player.body.velocity.y = -140;
}

// function moveRight() {
//   player.x += 10;
// }
//
// function moveLeft() {
//   player.x = player.x - 10;
// }
//
// function moveUp() {
//   player.y = player.y - 10;
// }
//
// function moveDown() {
//   player.y = player.y + 10;
// }



function spaceHandler() {
  game.sound.play("score");
}

function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}

function addPipeBlock(x, y) {
  var block = game.add.sprite (x, y, "pipeBlock");
  pipes.push(block);

  game.physics.arcade.enable(block);
  block.body.velocity.x = -150;
}

function generatePipe() {
  var gapStart = game.rnd.integerInRange(1, 5);
  for(var count=0; count < 8; count = count + 1) {
    if(count != gapStart && count != gapStart + 1) {
    addPipeBlock(800, count * 50);
}
  }
  changeScore();

//   var gapStart = game.rnd.integerInRange(1, 5);
//   for(var count=0; count < 8; count = count + 1) {
//     if(count != gapStart && count != gapStart + 1) {
//     addPipeBlock(500, count * 50);
// }
//   }

}
