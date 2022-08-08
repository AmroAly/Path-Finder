import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Grid from "./components/Grid";
import {
  findShortestPath,
  initStartAndEndPoints,
  shakeButton,
} from "./utilities";
import TutorialModal from "./components/tutorial/TutorialModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [algorithm, setAlgorithm] = useState("");
  const algorithms = ["aAlgorithm", "Dijkstra"];

  const onChangeAlgorithm = (algo) => {
    setAlgorithm(algo);
  };

  const onFindShortestPath = () => {
    if (!algorithm || !algorithms.includes(algorithm)) {
      shakeButton();
      return;
    }
    findShortestPath(algorithm);
  };

  const skipTutorial = () => {
    setIsModalOpen(false);
    setTimeout(() => initStartAndEndPoints(), 0);
  };

  useEffect(() => {
    let mounted = false;
    let initializeTutorial = () => {
      mounted = true;
      setIsModalOpen(true);
    };
    if (!mounted) {
      console.log("init...");
      return initializeTutorial();
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="max-h-screen overflow-clip">
        <Header
          onFind={onFindShortestPath}
          onChangeAlgorithm={onChangeAlgorithm}
        />
        <Grid />
        {isModalOpen && <TutorialModal onClickSkip={skipTutorial} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
