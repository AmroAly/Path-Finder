import { useEffect, useState } from "react";

const Dropdown = ({ onChangeAlgorithm }) => {
  const [toggleMenu, setToggleMenu] = useState(true);
  const [dropDownText, setDropDownText] = useState("Select an Algorithm!");

  const onClickHandler = (e) => {
    setToggleMenu(!toggleMenu);
  };

  const onSelectAlgorithmHandler = (e) => {
    e.preventDefault();
    setDropDownText(e.target.id);
    onChangeAlgorithm(e.target.id);
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const dropdownButton = document.querySelector("#menu-button");
      const isButtonClicked = dropdownButton.contains(e.target);
      if (!isButtonClicked) {
        setToggleMenu(true);
      }
    });
  }, [toggleMenu]);

  return (
    <div className="relative inline-block text-gray-800	text-center mr-2 min w-48">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md text-l border-2 border-slate-900 border-b-8 rounded  p-2 bg-green-500 min-w-full"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={onClickHandler}
        >
          <p>{dropDownText}</p>
          <svg
            className="mt-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`origin-top-right absolute  w-full shadow-lg bg-green-500 ring-1 ring-black ring-opacity-5 text-left text-l focus:outline-none rounded-b ${
          toggleMenu ? "hidden" : ""
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
        id="dropdown-menu"
      >
        <div className="" role="none">
          <a
            href="#"
            className="block m-1 px-4 py-2 hover:bg-green-700	 transition-all ease-in-out delay-100 rounded"
            role="menuitem"
            tabIndex="-1"
            id="aAlgorithm"
            onClick={onSelectAlgorithmHandler}
          >
            aAlgorithm
          </a>
          <a
            href="#"
            className="block m-1 px-4 py-2 hover:bg-green-700	transition-all ease-in-out delay-100 rounded"
            role="menuitem"
            tabIndex="-1"
            id="Dijkstra"
            onClick={onSelectAlgorithmHandler}
          >
            Dijkstra's algorithm
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
