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
//Initialize Event Listeners

var questionBox = document.getElementById("questionBox");
var answerList = document.getElementById("answerList");
var submitButton = document.getElementById("submitButton");


//---------------------------//
//Display Question

function displayQuestion(questionIndex) {

    questionBox.textContent = quizQuestions[questionIndex].question;

    if(answerList.childElementCount>0){
        answerList.innerHTML = "";
    }

    for(var i = 0; i < quizQuestions[questionIndex].answers.length;i++){
        var answerButton = document.createElement("button");

        answerButton.setAttribute("value",i);
        answerButton.setAttribute("onclick","submitAnswer("+questionIndex+")");
        answerButton.innerHTML = quizQuestions[questionIndex].answers[i].text;
        console.log(answerButton);
        answerList.appendChild(answerButton);
    }
}

//---------------------------//
//Submit Answer

function submitAnswer(previousQuestionIndex){
    try{displayQuestion(previousQuestionIndex+1);}
    catch{calculateAnswers()};
}

//---------------------------//
//Calculate Answers

function calculateAnswers();


//DEBUG 
displayQuestion(0);
