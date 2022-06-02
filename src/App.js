import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Grid from "./components/Grid";

function App() {
  const [flip, setFlip] = useState(false);

  const onReset = () => {
    setFlip(!flip);
  };

  return (
    <div className="container mx-auto">
      <div className="max-h-screen overflow-hidden">
        <Header onReset={onReset} />
        <Grid flip={flip} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
