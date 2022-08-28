var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0,randomChosenColour;
var start = false;

$(document).on("keypress",()=>{
    if(!start){
        nextSequence();
        start = true;
    }
});

$('.btn').click(function(){
    let userChosenColor =  $(this).attr('id');
    //console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    sound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    level++;
    $('#level-title').text('level = '+level);
    let randomNumber = Math.floor(Math.random()*3);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeOut(150).fadeIn(150);
    sound(randomChosenColour);
    userClickedPattern = [];
    console.log(randomChosenColour);
    console.log(gamePattern);
}
function checkAnswer(i){
        if(userClickedPattern[i]===gamePattern[i]){
            if(userClickedPattern.length===gamePattern.length){
                setTimeout(() => {
                    nextSequence();
                    }, 1500);
                    console.log('right');
            }
        }else{
            console.log('wrong');
            sound('wrong');
            $("body").addClass('game-over');
            setTimeout(()=>{
                $("body").removeClass('game-over');
            },200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            gameOver();
        }
}
function sound(btn){
    new Audio('sounds/'+btn+'.mp3').play();
}
function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed');
    },100)
}
function gameOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    start = false;
}