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

  const onDrag = (e) => {
    e.stopPropagation();
    console.log("start");
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
      <div
        className="border-b border-r border-emerald-200 text-center
       box-border grid-box"
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
