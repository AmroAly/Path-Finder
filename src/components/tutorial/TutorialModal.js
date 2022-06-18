import { useState } from "react";
import TutorialOne from "./TutorialOne";
import TutorialTwo from "./TutorialTwo";

const TutorialModal = ({ onClickSkip }) => {
  const [tutorial, setTutorial] = useState(1);
  const getNextTutorial = () => {
    setTutorial(tutorial + 1);
  };
  const goToPreviousTutorial = () => {
    if (tutorial > 1) setTutorial(tutorial - 1);
  };
  const renderModelContent = () => {
    switch (tutorial) {
      case 1:
        return <TutorialOne />;
      case 2:
        return <TutorialTwo />;
      default:
        return <TutorialOne />;
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div
        className="absolute flex flex-col bg-white  w-9/12 md:w-6/12 max-w-screen-lg p-4 rounded border-2 border-cyan-600"
        id="modal"
      >
        {/* HAEDER */}
        <div className="flex justify-center">
          <h3 className="text-3xl font-semibold text-center">
            Welcome To the Shortest Path Visualizer
          </h3>
        </div>
        <small className="absolute right-4 top-6">{tutorial} / 2</small>
        {/* Body */}
        <div className="flex flex-wrap justify-center p-8">
          {/* <div>
            <p className="p-8 text-xl">
              Click the yellow button over there to see the Magic happens!
            </p>
          </div>
          <div>
            <img
              src={process.env.PUBLIC_URL + "/images/button.png"}
              className="pt-8"
              id="btn-img"
            />
          </div> */}
          {renderModelContent()}
        </div>
        {/* Footer */}
        <div className="p-6 flex flex-wrap justify-between items-center">
          <div>
            <button
              className="bg-indigo-500 p-2 text-white rounded w-36"
              onClick={onClickSkip}
            >
              Skip
            </button>
          </div>
          <div className="flex justify-between  mt-2 sm:mt-0">
            <button
              className="bg-indigo-500 p-2 text-white rounded w-28 mr-2 disabled:opacity-75"
              onClick={goToPreviousTutorial}
              disabled={tutorial < 2}
            >
              Back
            </button>
            <button
              className="bg-indigo-500 p-2 text-white rounded w-28"
              onClick={getNextTutorial}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
