import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Grid from "./components/Grid";
import { findShortestPath } from "./utilities";

function App() {
  const [flip, setFlip] = useState(false);

  const onReset = () => {
    setFlip(!flip);
  };

  const onFindShortestPath = () => {
    // get the start and end elemnts
    const startBox = document.querySelector("#start-box").parentElement;
    const endBox = document.querySelector("#end-box").parentElement;
    findShortestPath(startBox, endBox);

    // perform BDF search on Both sides
    // once the start and end elements meet each other rerturn the path
    // color the path
  };

  return (
    <div className="container mx-auto">
      <div className="max-h-screen overflow-clip">
        <Header onReset={onReset} onFind={onFindShortestPath} />
        <Grid flip={flip} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
