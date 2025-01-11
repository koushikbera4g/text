const questions=[
    {
        question: "Virat Kohli is related to which Sport?",
        answers:[
            {text:"Foot Ball",correct:false},
            {text:"Cricket",correct:true},
            {text:"Kabaddi",correct:false},
            {text:"Hockey",correct:false},
        ]
    },
    {
        question: "Which is the smallest Country in the World?",
        answers:[
            {text:"Vatican City",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"Shri Lanka",correct:false},
        ] 
    },
    {
        question: "Which is the largest Animal in the World?",
        answers:[
            {text:"shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },
    {
        question: "Which is the national Animal of India?",
        answers:[
            {text:"Tiger",correct:true},
            {text:"Lion",correct:false},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
        ]
    },
    {
        question: "Which is the national Flower of India?",
        answers:[
            {text:"Rose",correct:false},
            {text:"Sunflower",correct:false},
            {text:"Lili",correct:false},
            {text:"Lotus",correct:true},
        ] 
    },
    {
        question: "Which is the smallest State in India?",
        answers:[
            {text:"Goa",correct:true},
            {text:"Sikkim",correct:false},
            {text:"Tripura",correct:false},
            {text:"Manipur",correct:false},
        ]
    },
    {
        question: "Which is the national Fruit of India?",
        answers:[
            {text:"Apple",correct:false},
            {text:"Orange",correct:false},
            {text:"Mango",correct:true},
            {text:"Banana",correct:false},
        ]
    },
    {
        question: "Who built the 'Taj Mahal'?",
        answers:[
            {text:"Akbar",correct:false},
            {text:"Jahangir",correct:false},
            {text:"Shah Jahan",correct:true},
            {text:"Aurangzeb",correct:false},
        ]
    },
    {
        question: "Which city is known as the 'Silicon Valley' of India?",
        answers:[
            {text:"Mumbai",correct:false},
            {text:"Pune",correct:false},
            {text:"Hyderabad",correct:false},
            {text:"Bangalore",correct:true},
        ]
    },
    {
        question: "Which Indian scientist is known as the 'Missile Man'?",
        answers:[
            {text:"a.P.J Abdul Kalam",correct:true},
            {text:"C.V Raman",correct:false},
            {text:"Homi J. Bhabha",correct:false},
            {text:"Vikram Sarabhai",correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft;
let timerInterval;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    timeLeft=120;
    nextButton.innerHTML ="Next";
    startTimer();
    showQuestion();
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz(); 
        }
    }, 1000); 
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
const selectedBtn = e.target;
const iscorrect = selectedBtn.dataset.correct === "true";
if(iscorrect){
    selectedBtn.classList.add("correct");
    score++;
}else{
    selectedBtn.classList.add("incorrect");
}
Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct  === "true"){
        button.classList.add("correct");
    }
    button.disabled = "true";
});
nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

 
startQuiz();