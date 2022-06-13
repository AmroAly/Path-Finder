import { useEffect } from "react";

const Boxes = ({ flip }) => {
  const selectBoxes = (e) => {
    const {
      target: { id },
      target,
    } = e;
    if (id && id.startsWith("box")) {
      target.classList.add("bg-slate-900", "border-none");
      target.classList.add("block");
    } else {
      onMouseUpHandler();
    }
  };

  const onMouseDownHandler = (e) => {
    document.addEventListener("mouseout", selectBoxes);
  };

  const onMouseUpHandler = () => {
    document.removeEventListener("mouseout", selectBoxes);
  };

  useEffect(() => {
    const blocks = document.querySelectorAll(".bg-slate-900");
    blocks.forEach((b) => {
      b.classList.remove("bg-slate-900", "border-none", "block");
    });
  }, [flip]);

  const boxes = [];
  for (let i = 0; i < 2600; i++) {
    boxes.push(
      // <div
      //   className="border grid-box h-5 w-5 border-emerald-200 hover:bg-violet-600 box-border"
      //   id={`box-${i}`}
      //   key={i}
      //   onMouseDown={onMouseDownHandler}
      //   onMouseUp={onMouseUpHandler}
      // ></div>
      <div
        className="border-b border-r border-emerald-200 text-center
      hover:bg-violet-600 box-border grid-box"
        id={`box-${i}`}
        key={i}
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
      ></div>
    );
  }

  return boxes;
};

export default Boxes;
