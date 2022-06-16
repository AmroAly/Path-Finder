import { useEffect, useState } from "react";
import Boxes from "./Boxes";

const Grid = ({ flip }) => {
  const [flipped, setFlipped] = useState(flip);

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
      <div className="container mx-auto bg-slate-50 max-w-screen-2xl" id="grid">
        <div className="grid v-grid max-w-screen-2xl">
          <Boxes flip={flip} />
        </div>
      </div>
    </main>
  );
};

export default Grid;
