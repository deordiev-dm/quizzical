function InitialScreen(props) {
  return (
    <section className="initial-screen">
      <h1 className="initial-screen__title title">Quizzical</h1>
      <p className="initial-screen__description">
        Each quiz consists of 5 questions, and your goal is to guess all 5
        answers correctly. <br /> Challenge yourself and see how many perfect
        scores you can achieve!
      </p>
      <button
        className="initial-screen__button button"
        onClick={props.startNewGame}
      >
        Start quiz
      </button>
    </section>
  );
}

export default InitialScreen;
