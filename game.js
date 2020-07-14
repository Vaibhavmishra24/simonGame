var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

// When the user presses any key to start the game
$(document).keydown(function() {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});


//Checking which button the user clicked
$(".btn").click(function(e) {
  var userChosenColour = e.target.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});


//Computer Generating a random sequence function
function nextSequence() {
  userClickedPattern = [];

  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  $("#level-title").text("Level " + level);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}



function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    //4. If the user got the most recent answer right then check if the whole sequence is completed Else continue taking button inputs
    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay if successful in current level
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    var gameOver= new Audio("sounds/wrong.mp3");
    gameOver.play();
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    started = false;
    level = 0;
    gamePattern = [];
    $("#level-title").text("Game Over, Press Any Key to Restart");


  }
}
