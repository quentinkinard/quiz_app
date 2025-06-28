import React, { useState } from "react";
import Results from "../components/results";
import axios from "axios";

function Quiz() {
  const initialAnswers = [null, null, null];
  const [usersAnswers, setUsersAnswers] = useState(initialAnswers);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const selectedAnswer = usersAnswers[currentQuestion];

  const getQuestions = () => {
    axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((response) => {
        console.log(response.data.results);
        const cleaned = response.data.results.map((q) => {
          const options = [...q.incorrect_answers];
          options.splice(Math.floor(Math.random() * 4), 0, q.correct_answer);
          return {
            question: decodeHTML(q.question),
            options: options.map(decodeHTML),
            answer: decodeHTML(q.correct_answer),
          };
        });

        setQuestions(cleaned);
        setUsersAnswers(Array(cleaned.length).fill(null));
        setCurrentQuestion(0);
      })
      .catch((err) => console.error(err));
  };

  function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function handleSelectOption(option) {
    const newUserAnswers = [...usersAnswers];
    newUserAnswers[currentQuestion] = option;
    setUsersAnswers(newUserAnswers);
  }

  function goToNext() {
    if (currentQuestion === questions.length - 1) {
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
        questions={questions}
        userAnswers={usersAnswers}
        restartQuiz={restartQuiz}
      />
    );
  }
  function restartQuiz() {
    setUsersAnswers([]);
    setCurrentQuestion(0);
    setIsQuizFinished(false);
  }

  if (questions.length === 0) {
    return (
      <button className="option" onClick={getQuestions}>
        Start Quiz
      </button>
    );
  }
  return (
    <div>
      <h2>Question {currentQuestion + 1}</h2>
      {questions.length > 0 && (
        <p className="question">{questions[currentQuestion].question}</p>
      )}

      {questions.length > 0 &&
        questions[currentQuestion] &&
        questions[currentQuestion].options.map((option) => (
          <button
            key={option}
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
          {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
