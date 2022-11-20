var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStart = false;

$("#level-title").click(function (e) {
	if (!gameStart) {
		$("#level-title").text(`Level ${level}`);
		nextSequence();
        $("p").hide()
		gameStart = true;
	}
});

$(".btn").click(function (event) {
	userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	animateClick(userChosenColor);
	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
	level++;
	userClickedPattern = [];
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColors[randomNumber];

	gamePattern.push(randomChosenColor);

	$("#" + randomChosenColor)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColor);

	$("#level-title").text(`Level ${level}`);
}

function playSound(name) {
	var sound = new Audio(`sounds/${name}.mp3`);
	sound.play();
}

function animateClick(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("wrong");

		playSound("wrong");

		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

        $("#level-title").text("Game Over, Click/Tap Here To Restart")
        
        startOver()
	}
}

function startOver(){
    level = 0
    gamePattern = []
    gameStart = false
    $("p").show()
}