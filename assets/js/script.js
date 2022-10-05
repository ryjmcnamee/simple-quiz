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
        question: "Question 1",
        answers: [
            { text: "Answer 1", correct: true },
            { text: "Answer 2", correct: false },
            { text: "Answer 3", correct: false },
        ]
    },
    {
        question: "Question 1",
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
    for(var i = 0; i < quizQuestions[questionIndex].answers.length;i++){
        var answerButton = document.createElement("button");

        answerButton.setAttribute("value",i);
        answerButton.setAttribute("onclick","submitAnswer()");
        answerButton.innerHTML = quizQuestions[questionIndex].answers[i].text;
        console.log(answerButton);
        answerList.appendChild(answerButton);
    }
}

//---------------------------//
//Advance Question


//DEBUG 
displayQuestion(1);
