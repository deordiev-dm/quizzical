import { useEffect, useState } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

// todo: start making call to API when page first loads, not when MainScreen is being rendered

function MainScreen(props) {
  const [allQuestions, setAllQuestions] = useState([]);

  // pull data from openTriviaDB
  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
    )
      .then(res => res.json())
      .then(data => setAllQuestions(data.results));
  }, []);

  // create questions
  let questionComponents = [];

  if (allQuestions) {
    questionComponents = allQuestions.map(item => {
      const shuffledOptions = shuffleOptions([
        ...item.incorrect_answers,
        item.correct_answer,
      ]);

      return (
        <Question
          key={nanoid()}
          id={nanoid()}
          question={decode(item.question)}
          options={shuffledOptions}
          chooseOption={chooseOption}
        />
      );
    });
  }

  function shuffleOptions(options) {
    return options.sort(() => Math.random() - 0.5);
  }

  // choose or change an option
  function chooseOption(questionId, optionId) {
    console.log({ questionId, optionId });
  }

  return (
    <section className="quiz">
      {questionComponents}
      <button className="quiz__button button">Check answers</button>
    </section>
  );
}

export default MainScreen;
