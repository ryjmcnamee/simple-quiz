//Initialize Quiz Object
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
//Initialize Element Variables

//Containers
var questionBox = document.getElementById("questionBox");
var questionText = document.getElementById("questionText");
var answerList = document.getElementById("answerList");
var scoreScreen = document.getElementById("scoreScreen");
var highScoreScreen = document.getElementById("highScoreScreen");

//Inputs
var viewHighScoresButton = document.getElementById("viewHighScoresButton");
var retryButton = document.getElementById("retryButton");

//---------------------------//
//Initialize Event Listeners
viewHighScoresButton.addEventListener("click",displayHighScores);
retryButton.addEventListener("click",startQuizOver)

//---------------------------//
//Display Question

function displayQuestion(questionIndex) {

    questionText.textContent = quizQuestions[questionIndex].question;

    if(answerList.childElementCount>0){
        answerList.innerHTML = "";
    }

    for(var i = 0; i < quizQuestions[questionIndex].answers.length;i++){
        var answerButton = document.createElement("button");

        answerButton.setAttribute("value",i);
        answerButton.setAttribute("onclick","submitAnswer("+questionIndex+","+i+")");
        answerButton.innerHTML = quizQuestions[questionIndex].answers[i].text;
        console.log(answerButton);
        answerList.appendChild(answerButton);
    }
}

//---------------------------//
//Submit Answer

function submitAnswer(questionIndex,chosenAnswerIndex){
    
    if(quizQuestions[questionIndex].answers[chosenAnswerIndex].correct){
        if(questionIndex != 0){
            localStorage.setItem("simple-quiz.score",(parseInt(localStorage.getItem("simple-quiz.score"))+1))
        }
        else{
            localStorage.setItem("simple-quiz.score",1)
        }
    }

    if(questionIndex+1 < quizQuestions.length){displayQuestion(questionIndex+1);}
    else{displayScore()};

}

//---------------------------//
//Display Score

function displayScore(){
    var score = document.getElementById("score");

    questionBox.setAttribute("style","display:none;");
    scoreScreen.setAttribute("style","display:block;");


};

//---------------------------//
//Display High Scores

function displayHighScores(){
    questionBox.setAttribute("style","display:none;");
    scoreScreen.setAttribute("style","display:none;");
    highScoreScreen.setAttribute("style","display:block;");
    retryButton.setAttribute("style","display:block;");
}

//---------------------------//
//Start Quiz Over
function startQuizOver(){
    displayQuestion(0);
    questionBox.setAttribute("style","display:block;");
    scoreScreen.setAttribute("style","display:none;");
    highScoreScreen.setAttribute("style","display:none;");
    retryButton.setAttribute("style","display:none;");
}

//DEBUG 
displayQuestion(0);
