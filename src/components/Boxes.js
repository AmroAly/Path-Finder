import { useEffect } from "react";

const Boxes = ({ flip }) => {
  const selectBoxes = (e) => {
    const {
      target: { id },
      target,
    } = e;
    if (id && id.startsWith("box")) {
      target.classList.add("bg-slate-900");
      //   target.classList.add("block");
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
      //   b.classList.remove("block");
      b.classList.remove("bg-slate-900");
    });
  }, [flip]);

  const boxes = [];
  for (let i = 0; i < 700; i++) {
    boxes.push(
      <div
        className="border h-10 w-10 border-slate-200 hover:bg-violet-600  rounded"
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
