import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    let startBox;
    let endBox;
    let timeout;
    let areStartAndEndPointsPlaced = false;
    const resizeHandler = () => {
      window.clearTimeout(timeout);
      const { innerWidth: width, innerHeight: height } = window;

      window.setTimeout(() => {
        if (startBox) {
          startBox.innerHTML = "";
        }
        if (endBox) {
          endBox.innerHTML = "";
        }
        startBox = document.elementFromPoint(
          Math.round(width / 4),
          Math.round(height / 2)
        );

        endBox = document.elementFromPoint(
          Math.round(width - width / 4),
          Math.round(height / 2)
        );
        if (
          startBox != null &&
          endBox != null &&
          typeof startBox.id != "undefined" &&
          startBox.id != "" &&
          startBox.id.startsWith("box") &&
          typeof endBox.id != "undefined" &&
          endBox.id != "" &&
          endBox.id.startsWith("box")
        ) {
          startBox.innerHTML =
            "<div class='h-full bg-slate-400 border border-slate-200 rounded-full'></div>";
          endBox.innerHTML =
            "<div class='h-full bg-slate-400 border border-slate-200 rounded-full'></div>";
          areStartAndEndPointsPlaced = true;
        } else {
          areStartAndEndPointsPlaced = false;
        }
      });
    };

    window.addEventListener("resize", resizeHandler, 500);
    const placeStartAndEndPoints = () => {
      if (!areStartAndEndPointsPlaced) {
        resizeHandler();
      }
    };

    placeStartAndEndPoints();
    window.removeEventListener("resize", resizeHandler);
  }, []);
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
