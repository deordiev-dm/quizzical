function Question(props) {
  const buttons = props.answers.map(answer => {
    return (
      <button
        key={answer.id}
        className={`question__option ${
          props.selectedAnswerId === answer.id ? "selected" : ""
        }`}
        onClick={() => props.chooseAnswer(props.questionId, answer.id)}
      >
        {answer.value}
      </button>
    );
  });

  return (
    <article className="question">
      <h2 className="question__title title">{props.question}</h2>
      <div className="question__options">{buttons}</div>
    </article>
  );
}

export default Question;
