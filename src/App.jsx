import { useState } from "react";
import InitialScreen from "./components/InitialScreen";
import MainScreen from "./components/MainScreen";
import SvgContainer from "./components/SvgContainer";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <main>
      {isPlaying ? (
        <MainScreen />
      ) : (
        <InitialScreen startNewGame={() => setIsPlaying(true)} />
      )}
      <SvgContainer />
    </main>
  );
}
export default App;
