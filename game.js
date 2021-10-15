
let buttonColors = ["red", "blue", "green", "yellow"];

// Declare arrays for game & user patterns
let gamePattern = [];
let userClickedPattern = [];

let started = false;

// set game level to 0
let level = 0;

// keypress event
$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    };
})

// click event
$(".btn").click(function(){
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

// Checks for answer
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Generates next sequence
function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// Starts game over
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

// Play sound
function playSound(name){
    let audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}

// Color animation for buttons
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
