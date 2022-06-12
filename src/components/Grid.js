import { useEffect, useState } from "react";
import Boxes from "./Boxes";

const Grid = ({ flip }) => {
  const [flipped, setFlipped] = useState(flip);
  useEffect(() => {
    let startBox;
    let endBox;
    let timeout;
    let areStartAndEndPointsPlaced = false;
    const resizeHandler = () => {
      window.clearTimeout(timeout);
      const { innerWidth: width, innerHeight: height } = window;

      window.setTimeout(() => {
        if (startBox && startBox.id.startsWith("box")) {
          startBox.innerHTML = "";
        }
        if (endBox && endBox.id.startsWith("box")) {
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
            "<div class='h-full bg-slate-400 border border-slate-200 rounded-full' id='start-box'></div>";
          endBox.innerHTML =
            "<div class='h-full bg-slate-400 border border-slate-200 rounded-full' id='end-box'></div>";
          areStartAndEndPointsPlaced = true;
        } else {
          areStartAndEndPointsPlaced = false;
        }
      });
    };

    window.addEventListener("resize", resizeHandler, 500);

    if (!areStartAndEndPointsPlaced) {
      areStartAndEndPointsPlaced = true;
      return resizeHandler();
    }
  }, []);

  useEffect(() => {
    const visitedElements = document.querySelectorAll("main .bg-violet-600");
    const path = document.querySelectorAll("main .bg-emerald-400");
    path.forEach((p) => {
      p.classList.remove("bg-emerald-400", "border-none");
    });
    visitedElements.forEach((v) => {
      v.classList.remove("bg-violet-600");
    });
    return () => {
      setFlipped(!flipped);
    };
  }, [flip]);

  return (
    <main>
      <div className="container mx-auto bg-slate-50" id="grid">
        <div className="flex flex-wrow flex-wrap mx-auto">
          <Boxes flip={flip} />
        </div>
      </div>
    </main>
  );
};

export default Grid;
