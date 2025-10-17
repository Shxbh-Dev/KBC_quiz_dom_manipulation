const questionPool = [
  {
    question: "Which country is called the land of the Rising Sun?",
    options: ["China", "Australia", "India", "Japan"],
    correctIndex: 3,
  },

  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    correctIndex: 2,
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Leo Tolstoy",
      "Mark Twain",
    ],
    correctIndex: 0,
  },
  {
    question: "Which gas is most abundant in the Earth's atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
    correctIndex: 1,
  },
  {
    question: "Which country is called the Land of the Rising Sun?",
    options: ["China", "Australia", "New Zealand", "Japan"],
    correctIndex: 3,
  },
  {
    question: "The Great Wall of China is visible from space. True or False?",
    options: ["True", "False", "Not sure", "It depends on the season"],
    correctIndex: 1,
  },
  {
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctIndex: 2,
  },
  {
    question: "HTML stands for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Mark Language",],
    correctIndex: 0,
  },
  {
    question: "Which year did India gain independence?",
    options: ["1945", "1947", "1950", "1952"],
    correctIndex: 1,
  },
  {
    question: "Who is known as the father of Geometry?",
    options: ["Archimedes", "Pythagoras", "Aristotle", "Euclid"],
    correctIndex: 3,
  }
];

let questions = [];
let currentIndex = 0;
let score = 0;
const totalQuestions = 10;

// Quiz container
const quiz = document.getElementById('quiz');
// Quiz Area
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsListEl = document.getElementById('options-list');
const nextButton = document.getElementById('next-button');
// Scroreboard screen
const scoreBoardEl = document.getElementById('scoreboard');
const scoreMessageEl = document.getElementById('score-message');
const restartButton = document.getElementById('restart-button');

window.addEventListener("DOMContentLoaded", function(){
    initializeQuiz();
})

// Functions 

function initializeQuiz(){
    questions = shuffleArray(questionPool).slice(0, totalQuestions);

    currentIndex = 0;
    score = 0;
    
    quiz.classList.remove('hidden');
    scoreBoardEl.classList.add('hidden');

    displayQuestion();
}

function displayQuestion(){ 
    clearOptions();

    const currentQuestion = questions[currentIndex];  

    questionNumberEl.textContent = `Question ${currentIndex+1} of ${totalQuestions}`;
    questionTextEl.textContent = currentQuestion.question; 

    currentQuestion.options.forEach((optionText, index) => {
        const li = document.createElement("li");
        if(index===0) li.textContent= `A) ${optionText}`;
        if(index===1) li.textContent= `B) ${optionText}`;
        if(index===2) li.textContent= `C) ${optionText}`;
        if(index===3) li.textContent= `D) ${optionText}`;
      
        li.addEventListener("click", function(){handleOptionClick(index);});
        optionsListEl.appendChild(li);
    });

    if(currentIndex === totalQuestions-1){
        nextButton.textContent = "Finish";
    } else{
        nextButton.textContent = "Next Question";
    }

    nextButton.disabled = true; 
}   

function handleOptionClick(selectedIndex){
    const currentQuestion = questions[currentIndex];
    const correctIndex = currentQuestion.correctIndex;

    const optionsEl = optionsListEl.querySelectorAll('li');
    optionsEl.forEach(function(li, idx){
        if(idx === correctIndex){
            li.classList.add('correct-option');
        }
        if(idx === selectedIndex && selectedIndex !== correctIndex){
            li.classList.add('incorrect-option')
        }

        li.style.pointerEvents = "none"
    });

    if(selectedIndex === correctIndex){ 
        score++;
     }

    nextButton.disabled = false; 
}

function clearOptions(){
    optionsListEl.innerHTML = "";
}

nextButton.addEventListener("click", function(){
    currentIndex++;
    if(currentIndex < totalQuestions){
        displayQuestion();
    } else{
        endQuiz();
    }
})

function endQuiz(){
    scoreBoardEl.classList.remove('hidden');
    quiz.classList.add('hidden');

    scoreMessageEl.textContent =  `You scored ${score} out of ${totalQuestions}!`;
}

restartButton.addEventListener("click", function(){
  initializeQuiz();
});

function shuffleArray(array){
    const arr = [...array];
    for(let i = arr.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [arr[i],arr[j]] = [arr[j],arr[i]];  
    }
    return arr;
};
