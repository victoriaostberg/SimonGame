
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var numberOfColors = $(".btn").length;
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
    if (!started) {
        $("#level-title").text("Level " + level);    
        nextSequence();
        started = true;
    }
});

// Function to track user's clicked patterns

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    makeSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var wrong = new Audio('sounds/wrong.mp3');
        wrong.play();

        $("body").addClass("game-over");
        $("h1").text("Game over! Press any key to restart.");

        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        

        startOver();

    }
}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random(numberOfColors)*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    flash(randomChosenColor);
    makeSound(randomChosenColor);
    
}

// Function for sounds

function makeSound(randomChosenColor) {
    switch (randomChosenColor) {
        case "red":
            var red = new Audio('sounds/red.mp3');
            red.play();
            break;

        case "green":
            var green = new Audio('sounds/green.mp3');
            green.play();                
            break;

        case "yellow":
            var yellow = new Audio('sounds/yellow.mp3');
            yellow.play();
            break;

        case "blue":
            var blue = new Audio('sounds/blue.mp3');
            blue.play();
            break;
    
        default: console.log(randomChosenColor)
            break;
    }
};

// Function for flashing buttons

function flash(randomChosenColor) {
$("#" + randomChosenColor).fadeOut(100).fadeIn(100);
};

// Animates user's choice

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);

}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
};