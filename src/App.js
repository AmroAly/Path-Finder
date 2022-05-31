import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  const createBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 700; i++) {
      boxes.push(
        <div
          className="border h-10 w-10 border-slate-200 hover:bg-violet-600  rounded"
          id={`box-${i}`}
          key={i}
        ></div>
      );
    }

    return boxes;
  };

  return (
    <div className="container mx-auto">
      <div className="max-h-screen overflow-hidden">
        <nav className="container relative mx-auto flex items-center justify-between p-8 bg-violet-600 border-2 border-slate-900 rounded border-b-8">
          <div className="logo">
            <a
              href="#"
              className="text-3xl border-2 border-slate-50 rounded border-b-8 border-l-8 p-2 text-slate-50"
            >
              Visualizer
            </a>
          </div>
          <div>
            <button className="text-xl border-2 border-slate-900 rounded border-b-8  p-2 bg-yellow-300">
              Find Shortest Path
            </button>
          </div>
          <div>
            <button className="text-xl border-2 border-slate-900 rounded border-b-8 border-r-8 p-2 bg-emerald-300">
              Reset
            </button>
          </div>
        </nav>
        <main>
          <div className="container mx-auto bg-slate-50" id="grid">
            <div className="flex flex-wrow flex-wrap mx-auto justify-between">
              {createBoxes()}
            </div>
          </div>
        </main>
      </div>
      <footer className="container mx-auto flex justify-center">
        <div>
          <p className="text-center">
            Built with Love by{" "}
            <a
              href="https://www.linkedin.com/in/amr-aly/"
              className="text-violet-600"
              target="_blank"
            >
              Amr Aly
            </a>
            {" - "}
            2022
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
