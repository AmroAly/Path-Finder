const Boxes = () => {
  const selectBoxes = (e) => {
    const {
      target: { id },
      target,
    } = e;
    if (id && id.startsWith("box")) {
      if (target.classList.contains("wall")) {
        target.classList.remove("wall");
      } else {
        target.classList.add("wall");
      }
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
