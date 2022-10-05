//Initialize Quiz Question Object
var quizQuestions = [
    {
        question: "Question 1",
        answers: [
            { text: "Answer 1", correct: true },
            { text: "Answer 2", correct: false },
            { text: "Answer 3", correct: false },
        ]
    },
    {
        question: "Question 2",
        answers: [
            { text: "Answer 1", correct: true },
            { text: "Answer 2", correct: false },
            { text: "Answer 3", correct: false },
        ]
    },
    {
        question: "Question 3",
        answers: [
            { text: "Answer 1", correct: true },
            { text: "Answer 2", correct: false },
            { text: "Answer 3", correct: false },
        ]
    },

]
//---------------------------//
//Initialize Global Variables
const numOfHighScores = 5;

//Containers
var questionBox = document.getElementById("questionBox");
var questionText = document.getElementById("questionText");
var answerList = document.getElementById("answerList");
var scoreScreen = document.getElementById("scoreScreen");
var highScoreScreen = document.getElementById("highScoreScreen");
var highScoreList = document.getElementById("highScoreList");

//Inputs
var viewHighScoresButton = document.getElementById("viewHighScoresButton");
var retryButton = document.getElementById("retryButton");

//---------------------------//
//Initialize Event Listeners
viewHighScoresButton.addEventListener("click", displayHighScores);
retryButton.addEventListener("click", startQuizOver)

//---------------------------//
//Display Question
function displayQuestion(questionIndex) {
    //Populate question text element
    questionText.textContent = quizQuestions[questionIndex].question;

    //Check if previous score exists -> initializes to 0
    if(questionIndex == 0){localStorage.setItem('simple-quiz.score',0)};

    //Initialize answer list to empty if existing
    if (answerList.childElementCount > 0) {
        answerList.innerHTML = "";
    }
    //Iterate over answers and create buttons from object data
    for (var i = 0; i < quizQuestions[questionIndex].answers.length; i++) {
        var answerButton = document.createElement("button");

        answerButton.setAttribute("value", i);
        answerButton.setAttribute("onclick", "submitAnswer(" + questionIndex + "," + i + ")");
        answerButton.innerHTML = quizQuestions[questionIndex].answers[i].text;

        answerList.appendChild(answerButton);
    }
}

//---------------------------//
//Submit Answer

function submitAnswer(questionIndex, chosenAnswerIndex) {
    //If correct
    if (quizQuestions[questionIndex].answers[chosenAnswerIndex].correct) {
        //If score exists -> add +1
        //Else -> set to 1
        if (questionIndex != 0) {
            localStorage.setItem("simple-quiz.score", (parseInt(localStorage.getItem("simple-quiz.score")) + 1))
        }
        else {
            localStorage.setItem("simple-quiz.score", 1)
        }
    }

    if (questionIndex + 1 < quizQuestions.length) { displayQuestion(questionIndex + 1); }
    else {
        displayScore()
    };

}

//---------------------------//
//Display Score
function displayScore() {
    //Change displayed screen
    questionBox.setAttribute("style", "display:none;");
    scoreScreen.setAttribute("style", "display:block;");

    //Locals
    var score = localStorage.getItem("simple-quiz.score");
    var scoreContainer = document.createElement("div");

    var highScoreSubmissionForm = document.createElement("form");
    var highScoreSubmissionInstructionsSpan = document.createElement("span");
    var highScoreSubmissionInstructions = "Please enter your name below to save your highscore -";
    var highScoreNameInput = document.createElement("input");
    var highScoreSubmitBtn = document.createElement("button");


    //Initialize score message
    var scoreMessage =
        "YOU GOT" + "\n"
        + score + "\n"
        + "POINTS";

    //Initialize form elements
    highScoreNameInput.setAttribute('type', 'text');
    highScoreNameInput.setAttribute('placeholder', 'e.g Jimmy Proton');

    highScoreSubmitBtn.setAttribute('type', 'button');
    highScoreSubmitBtn.textContent = 'Submit';



    //Construct form
    highScoreSubmissionForm.appendChild(highScoreSubmissionInstructionsSpan);
    highScoreSubmissionInstructionsSpan.textContent = highScoreSubmissionInstructions;
    highScoreSubmissionForm.appendChild(highScoreNameInput);
    highScoreSubmissionForm.appendChild(highScoreSubmitBtn);

    //Submit score
    function scoreSubmit() {
        recordScore(score, highScoreNameInput.value);
        displayHighScores();
    }

    //Initialize Screen
    scoreScreen.innerHTML = '';

    //Construct screen
    scoreContainer.textContent = scoreMessage;
    scoreScreen.appendChild(scoreContainer);
    scoreScreen.appendChild(highScoreSubmissionForm);

    //Event Listener for form
    highScoreSubmitBtn.addEventListener('click', scoreSubmit);

};

//---------------------------//
//Record Score
function recordScore(earnedScore, enteredName) {
    //Initialize array variable to be later copied
    var scoreArray = JSON.parse(localStorage.getItem("simple-quiz.highScores"))

    //If scoreArray is null, no high scores exist -> scoreArray to be initalized as array
    if (scoreArray == null) { scoreArray = [] };

    //Construct object
    var recordedScore = { score: earnedScore, name: enteredName }
    
    //Check if array has entries -> check score against entries to determine sort order
    if (scoreArray.length > 0) {
        
        //Locals
        const scoreArrayLength = scoreArray.length
        var isInserted = false;

        //Check against each current member
        for (var i = 0; i < scoreArrayLength; i++) {
            //If higher or equal to, insert and break
            if (earnedScore >= scoreArray[i].score) 
            { scoreArray.splice(i, 0, recordedScore); isInserted = true; break; }
        }

        //If no insertion, append to end
        if(!isInserted){scoreArray.push(recordedScore);}
        }
    else {scoreArray.push(recordedScore);}

    //Send first N scores to local storage
    localStorage.setItem("simple-quiz.highScores", JSON.stringify(scoreArray.slice(0, numOfHighScores)));
}


//---------------------------//
//Display High Scores
function displayHighScores() {
    //Change displayed screen
    questionBox.setAttribute("style", "display:none;");
    scoreScreen.setAttribute("style", "display:none;");
    highScoreScreen.setAttribute("style", "display:block;");
    retryButton.setAttribute("style", "display:block;");

    //Initialize/clear list
    highScoreList.innerHTML = '';

    //Container to be filled
    var highScoreListContainer = document.createElement("ol");

    //Storage Variable
    var highScoreListArray = JSON.parse(localStorage.getItem("simple-quiz.highScores"));

    try {
        for (var i = 0; i < numOfHighScores; i++) {
            //Locals
            var listItem = document.createElement("li");
            
            //Score object
            var selectedScore = highScoreListArray[i];

            //Assemble string
            listItem.textContent =
                " "
                + selectedScore.name
                + " EARNED "
                + selectedScore.score
                + " PTS!";
            //Append completed list item
            highScoreListContainer.appendChild(listItem);
        }
    }
    catch {
        //Triggers once end of list
    }
    //Append
    highScoreList.appendChild(highScoreListContainer);
}

//---------------------------//
//Start Quiz Over
function startQuizOver() {
    displayQuestion(0);
    questionBox.setAttribute("style", "display:block;");
    scoreScreen.setAttribute("style", "display:none;");
    highScoreScreen.setAttribute("style", "display:none;");
    retryButton.setAttribute("style", "display:none;");
}

//DEBUG 
displayQuestion(0);
recordScore(18, "Entry 2");
recordScore(16, "Entry 4");
recordScore(18, "Entry 1");
recordScore(17, "Entry 3");
recordScore(12, "Not Visible");
recordScore(12, "Entry 5");
