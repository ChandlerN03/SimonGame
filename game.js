
 var buttonColors = ["red","blue","green","yellow"];
 var gamePattern = [];
 var userClickedPattern = [];
 var gameStarted = false;
 var level = 0;

 $(document).on("keydown",function(){
    if(!gameStarted){
        $("h1").html("Level "+level);
        nextSequence();
        gameStarted = true;
    }
});    

 $(".btn").on("click" ,function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
});

function nextSequence(){
userClickedPattern = [];
level++;
$("h1").html("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
     
}

function playSound(name){
    switch(name){
        case "green":
            var audio = new Audio('./sounds/green.mp3');
            audio.play();
        break;
        case "red": 
            var audio = new Audio('./sounds/red.mp3');
            audio.play();
        break;
        case "blue": 
            var audio = new Audio('./sounds/blue.mp3');
            audio.play();
        break;
        case "yellow": 
            var audio = new Audio('./sounds/yellow.mp3');
            audio.play();
        break;
        default:
            var audio = new Audio('./sounds/wrong.mp3');
            audio.play();
    }
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentlevel){
    if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            
        }
    }
    else{
        playSound();
        $("body").addClass("game-over");
        $("h1").html("Game Over, Press any Key to Restart");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    gameStarted = false;
}


    



