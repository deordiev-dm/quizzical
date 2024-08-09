function Question({
  questionId,
  question,
  answers,
  selectedAnswerId,
  correctAnswerId,
  chooseAnswer,
  isChecked,
}) {
  function getButtonClass(answerId) {
    if (!isChecked) {
      return answerId === selectedAnswerId
        ? "question__option selected"
        : "question__option";
    }

    // in case answers were already checked
    if (answerId === correctAnswerId)
      return "question__option selected-correct";
    // if selected isn't correct
    if (answerId === selectedAnswerId) return "question__option selected-wrong";

    // otherwise
    return "question__option wrong";
  }

  const buttons = answers.map(answer => (
    <button
      key={answer.id}
      className={getButtonClass(answer.id)}
      onClick={() => {
        if (!isChecked) {
          chooseAnswer(questionId, answer.id);
        }
      }}
      disabled={isChecked}
    >
      {answer.value}
    </button>
  ));

  return (
    <article className="question">
      <h2 className="question__title title">{question}</h2>
      <div className="question__options">{buttons}</div>
    </article>
  );
}

export default Question;
