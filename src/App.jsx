import { useState } from "react";
import InitialScreen from "./components/InitialScreen";
import MainScreen from "./components/MainScreen";
import SvgContainer from "./components/SvgContainer";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  return (
    <main>
      <div className="container">
        {isPlaying ? (
          <MainScreen
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        ) : (
          <InitialScreen
            startNewGame={() => setIsPlaying(true)}
            setDifficulty={setDifficulty}
          />
        )}
        <SvgContainer />
      </div>
    </main>
  );
}
export default App;
