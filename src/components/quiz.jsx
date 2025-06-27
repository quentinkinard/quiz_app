import React, { useState } from "react";
import Results from "../components/results";

function Quiz() {
  const initialAnswers = [null, null, null];
  const [usersAnswers, setUsersAnswers] = useState(initialAnswers);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const selectedAnswer = usersAnswers[currentQuestion];

  const questionBank = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Rome"],
      answer: "Paris",
    },
    {
      question: "What language is used for web apps?",
      options: ["PHP", "Python", "JavaScript", "All"],
      answer: "All",
    },
    {
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "Java Syntax eXtension",
        "Just a Simple eXample",
        "None of the above",
      ],
      answer: "JavaScript XML",
    },
  ];

  function handleSelectOption(option) {
    const newUserAnswers = [...usersAnswers];
    newUserAnswers[currentQuestion] = option;

    setUsersAnswers(newUserAnswers);
  }

  function goToNext() {
    if (currentQuestion === questionBank.length - 1) {
      setIsQuizFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function goToPrev() {
    setCurrentQuestion(currentQuestion - 1);
  }

  if (isQuizFinished) {
    return (
      <Results
        userAnswers={usersAnswers}
        questionBank={questionBank}
        restartQuiz={restartQuiz}
      />
    );
  }
  function restartQuiz() {
    setUsersAnswers(initialAnswers);
    setCurrentQuestion(0);
    setIsQuizFinished(false);
  }
  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      <p className="question">{questionBank[currentQuestion].question}</p>

      {questionBank[currentQuestion].options.map((option) => (
        <button
          className={`option ${selectedAnswer === option ? "selected" : ""}`}
          onClick={() => handleSelectOption(option)}
        >
          {option}
        </button>
      ))}

      <div className="nav-buttons">
        <button onClick={goToPrev} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!selectedAnswer}>
          {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
