import { useEffect, useState } from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

/*
 * // // todo: redesign allQuestion state
 *     // // todo: give an ID to all option when creating state
 *     // // todo: give an ID to a question when creating state
 *     // // todo: complete the chooseAnswer function
 * // --> todo: write the logic for checking correct answers
 * // todo: write the logic for starting a new game
 * // todo:imporove styles
 *     // // todo: give .selected class to the selected option
 *     // todo: create a smaller container
 *     // todo: make a question underline span the whole width of a container
 * // todo: start making a call to the API when the page first loads, not when MainScreen is being rendered
 */

function MainScreen() {
  const [allQuestions, setAllQuestions] = useState([]);

  // pull questions data from openTriviaDB
  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
    )
      .then(res => res.json())
      .then(data => setAllQuestions(data.results?.map(constructQuestionObj)));
  }, []);

  // helper functions
  function constructQuestionObj(item) {
    const answers = [...item.incorrect_answers, item.correct_answer].map(
      answer => ({
        id: nanoid(),
        value: decode(answer),
      })
    );

    return {
      id: nanoid(),
      question: item.question,
      answers: shuffleArr(answers),
      correctAnswer: item.correct_answer,
      selectedAnswerId: "",
      // ! stopped here. come up with a way of checking correct answers
      isSelectedCorrect: undefined,
    };
  }

  function shuffleArr(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  // event handlers
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

  // construct JSX elements
  let questionComponents = [];

  if (allQuestions) {
    questionComponents = allQuestions.map(item => {
      return (
        <Question
          key={item.id}
          questionId={item.id}
          question={decode(item.question)}
          answers={item.answers}
          selectedAnswerId={item.selectedAnswerId}
          chooseAnswer={chooseAnswer}
        />
      );
    });
  }

  return (
    <section className="quiz">
      {questionComponents}
      <button className="quiz__button button">Check answers</button>
    </section>
  );
}

export default MainScreen;
