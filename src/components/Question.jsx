import { nanoid } from "nanoid";
import { decode } from "html-entities";

function Question(props) {
  const buttons = props.options.map(option => {
    const buttonId = nanoid();
    return (
      <button
        className="question__option"
        key={nanoid()}
        id={buttonId}
        onClick={() => props.chooseOption(props.id, buttonId)}
      >
        {decode(option)}
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
