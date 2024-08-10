import { useEffect, useState, useRef } from "react";
import Question from "./Question";
import DifficultyButtons from "./DifficultyButtons";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Confetti from "react-confetti";

function MainScreen(props) {
  const [allQuestions, setAllQuestions] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetchedData = useRef(false);

  // pull questions data from openTriviaDB
  useEffect(fetchNewQuestions, [isChecked]);

  function fetchNewQuestions() {
    // if ref wasn't updated it will not fetch new data
    if (!hasFetchedData.current) {
      setIsLoading(true);
      hasFetchedData.current = true;

      async function fetchQuestions() {
        try {
          const response = await fetch(
            `https://opentdb.com/api.php?amount=5&category=9&difficulty=${props.difficulty}&type=multiple`
          );

          if (response.status !== 200) {
            throw new Error(`Failed to fetch: Status ${response.status}`);
          }

          const data = await response.json();

          setAllQuestions(data.results?.map(constructQuestionObj));
        } catch (error) {
          console.error("Failed to fetch questions: ", error);
          alert(
            "Something went wrong when loading questions. Please, try to reload the page"
          );
        } finally {
          setIsLoading(false);
        }
      }

      fetchQuestions();
    }
  }

  // helper functions
  function constructQuestionObj(item) {
    const correctAnswerId = nanoid();

    const answers = [item.correct_answer, ...item.incorrect_answers].map(
      (answer, index) => ({
        // give correct answer on the first place predefined id
        id: index === 0 ? correctAnswerId : nanoid(),
        value: decode(answer),
      })
    );

    return {
      id: nanoid(),
      question: item.question,
      answers: shuffleArr(answers),
      correctAnswerId,
      selectedAnswerId: undefined,
    };
  }

  function shuffleArr(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  // choose or change an option
  function chooseAnswer(questionId, answerId) {
    setAllQuestions(prevQuestions => {
      return prevQuestions.map(question => {
        if (questionId === question.id) {
          return {
            ...question,
            selectedAnswerId: answerId,
          };
        } else {
          return question;
        }
      });
    });
  }

  function countCorrectAnswers() {
    return allQuestions.reduce((correctAnswers, question) => {
      if (question.selectedAnswerId === question.correctAnswerId) {
        return correctAnswers + 1;
      } else {
        return correctAnswers;
      }
    }, 0);
  }

  function handleClick() {
    setIsChecked(prevIsChecked => {
      // play again button is clicked
      if (prevIsChecked) {
        hasFetchedData.current = false;
      }

      // check answers button is clicked
      if (allQuestions.every(question => question.selectedAnswerId)) {
        return !prevIsChecked;
      } else {
        alert("Please choose an answer for every question");
      }
    });
  }

  // construct JSX elements
  let questionComponents = [];

  if (allQuestions) {
    questionComponents = allQuestions.map(question => {
      return (
        <Question
          key={question.id}
          questionId={question.id}
          question={decode(question.question)}
          answers={question.answers}
          selectedAnswerId={question.selectedAnswerId}
          correctAnswerId={question.correctAnswerId}
          chooseAnswer={chooseAnswer}
          isChecked={isChecked}
        />
      );
    });
  }

  if (isLoading) {
    return (
      <div className="loader__container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section className="quiz">
      {isChecked && countCorrectAnswers() === 5 && <Confetti />}
      {questionComponents}
      <footer className="quiz__footer">
        <button
          className="quiz__button button"
          onClick={handleClick}
        >
          {isChecked ? "Play again" : "Check answers"}
        </button>
        {isChecked && (
          <>
            <p className="quiz__result">{`You scored ${countCorrectAnswers()}/5 correct answers`}</p>
            <DifficultyButtons setDifficulty={props.setDifficulty} />
          </>
        )}
      </footer>
    </section>
  );
}

export default MainScreen;
