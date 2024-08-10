import { useState } from "react";
import InitialScreen from "./components/InitialScreen";
import MainScreen from "./components/MainScreen";
import SvgContainer from "./components/SvgContainer";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main>
      <div className="container">
        {isPlaying ? (
          <MainScreen />
        ) : (
          <InitialScreen startNewGame={() => setIsPlaying(true)} />
        )}
        <SvgContainer />
      </div>
    </main>
  );
}
export default App;
