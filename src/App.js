import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Grid from "./components/Grid";
import { findShortestPath, initStartAndEndPoints } from "./utilities";
import TutorialModal from "./components/TutorialModal";

function App() {
  const [flip, setFlip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const onReset = () => {
    setFlip(!flip);
  };

  const onFindShortestPath = () => {
    // get the start and end elemnts
    findShortestPath();
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
        <Header onReset={onReset} onFind={onFindShortestPath} />
        <Grid flip={flip} />
        {isModalOpen && <TutorialModal onClickSkip={skipTutorial} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
