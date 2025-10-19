const questionPool = [];

let questions = [];
let currentIndex = 0;
let score = 0;
const totalQuestions = 10;

// Quiz container
const quiz = document.getElementById("quiz");
// Quiz Area
const questionNumberEl = document.getElementById("question-number");
const questionTextEl = document.getElementById("question-text");
const optionsListEl = document.getElementById("options-list");
const nextButton = document.getElementById("next-button");
// Scroreboard screen
const scoreBoardEl = document.getElementById("scoreboard");
const scoreMessageEl = document.getElementById("score-message");
const restartButton = document.getElementById("restart-button");

window.addEventListener("DOMContentLoaded", startQuiz);

async function startQuiz() {
  questionTextEl.textContent = "Loading Random Questions..."
  console.log("Starting quiz...");
  const apiResults = await fetchQuestions(); // fetch directly here
  questionPool.splice(0, questionPool.length, ...formatQuestions(apiResults)); // fill it

  initializeQuiz();
}

// Functions

async function fetchQuestions() {
  const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple"); // Example API
  const data = await response.json();
  return data.results;
}

function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function formatQuestions(apiResults) {
  return apiResults.map((item) => {
    // Combine correct + incorrect answers, then shuffle
    const allOptions = [...item.incorrect_answers, item.correct_answer];

    const shuffledOptions = [...allOptions].sort(() => Math.random() - 0.5);
    return {
      question: decodeHTML(item.question),
      options: shuffledOptions.map(decodeHTML),
      correctIndex: shuffledOptions.indexOf(item.correct_answer)
    };
  });
}

function initializeQuiz() {
  questions = shuffleArray(questionPool).slice(0, totalQuestions);

  currentIndex = 0;
  score = 0;

  quiz.classList.remove("hidden");
  scoreBoardEl.classList.add("hidden");

  displayQuestion();
}

function displayQuestion() {
  clearOptions();

  const currentQuestion = questions[currentIndex];

  questionNumberEl.textContent = `Question ${
    currentIndex + 1
  } of ${totalQuestions}`;
  questionTextEl.textContent = currentQuestion.question;

  currentQuestion.options.forEach((optionText, index) => {
    const li = document.createElement("li");
    if (index === 0) li.textContent = `A) ${optionText}`;
    if (index === 1) li.textContent = `B) ${optionText}`;
    if (index === 2) li.textContent = `C) ${optionText}`;
    if (index === 3) li.textContent = `D) ${optionText}`;

    li.addEventListener("click", function () {
      handleOptionClick(index);
    });
    optionsListEl.appendChild(li);
  });

  if (currentIndex === totalQuestions - 1) {
    nextButton.textContent = "Finish";
  } else {
    nextButton.textContent = "Next Question";
  }

  nextButton.disabled = true;
}

function handleOptionClick(selectedIndex) {
  const currentQuestion = questions[currentIndex];
  const correctIndex = currentQuestion.correctIndex;

  const optionsEl = optionsListEl.querySelectorAll("li");
  optionsEl.forEach(function (li, idx) {
    if (idx === correctIndex) {
      li.classList.add("correct-option");
    }
    if (idx === selectedIndex && selectedIndex !== correctIndex) {
      li.classList.add("incorrect-option");
    }

    li.style.pointerEvents = "none";
  });

  if (selectedIndex === correctIndex) {
    score++;
  }

  nextButton.disabled = false;
}

function clearOptions() {
  optionsListEl.innerHTML = "";
}

nextButton.addEventListener("click", function () {
  currentIndex++;
  if (currentIndex < totalQuestions) {
    displayQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  scoreBoardEl.classList.remove("hidden");
  quiz.classList.add("hidden");

  scoreMessageEl.textContent = `You scored ${score} out of ${totalQuestions}!`;
}

restartButton.addEventListener("click", function () {
  startQuiz();
});

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
