const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
  {
    question: "What is the capital of France?",
    answers: {
      a: "Berlin",
      b: "Madrid",
      c: "Paris"
    },
    correctAnswer: "c"
  },
  {
    question: "Who is the CEO of Tesla?",
    answers: {
      a: "Jeff Bezos",
      b: "Elon Musk",
      c: "Bill Gates"
    },
    correctAnswer: "b"
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: {
      a: "Earth",
      b: "Jupiter",
      c: "Saturn"
    },
    correctAnswer: "b"
  }
];

function buildQuiz() {
  const output = [];

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];

    for (letter in currentQuestion.answers) {
      answers.push(
        `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter} :
          ${currentQuestion.answers[letter]}
        </label>`
      );
    }

    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
      <div class="answers"> ${answers.join('')} </div>`
    );
  });

  quizContainer.innerHTML = output.join('');
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll('.answers');

  let numCorrect = 0;
  let numIncorrect = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[questionNumber].style.color = 'green';
    } else {
      numIncorrect++;
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

  const quizContainerElement = document.querySelector('.quiz-container');
  if (numCorrect === myQuestions.length) {
    quizContainerElement.style.backgroundColor = 'lightgreen';
  } else if (numIncorrect === myQuestions.length) {
    quizContainerElement.style.backgroundColor = 'red';
  } else {
    quizContainerElement.style.backgroundColor = 'white'; // Default color
  }
}

buildQuiz();

submitButton.addEventListener('click', showResults);
