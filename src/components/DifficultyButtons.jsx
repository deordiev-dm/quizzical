import { useState } from "react";

function DifficultyButtons(props) {
  const [activeDifficulty, setActiveDifficulty] = useState("");

  function handleDifficultyClick(difficulty) {
    props.setDifficulty(difficulty);
    setActiveDifficulty(difficulty);
  }

  return (
    <div className="difficulty-buttons">
      <button
        className={`button button-difficulty easy ${
          activeDifficulty === "easy" ? "active" : ""
        }`}
        onClick={() => handleDifficultyClick("easy")}
      >
        Easy
      </button>
      <button
        className={`button button-difficulty medium ${
          activeDifficulty === "medium" ? "active" : ""
        }`}
        onClick={() => handleDifficultyClick("medium")}
      >
        Medium
      </button>
      <button
        className={`button button-difficulty hard ${
          activeDifficulty === "hard" ? "active" : ""
        }`}
        onClick={() => handleDifficultyClick("hard")}
      >
        Hard
      </button>
    </div>
  );
}

export default DifficultyButtons;
