import { useEffect, useState } from "react";
import Boxes from "./Boxes";

const Grid = () => {
  return (
    <main>
      <div className="container mx-auto bg-slate-50 max-w-screen-2xl" id="grid">
        <div className="grid v-grid max-w-screen-2xl">
          <Boxes />
        </div>
      </div>
    </main>
  );
};

export default Grid;
