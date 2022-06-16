const TutorialModal = ({ onClickSkip }) => {
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
        {/* Body */}
        <div className="flex flex-wrap justify-center p-8">
          <div>
            <p className="p-8 text-xl">
              Click the yellow button over there to see the Magic happens!
            </p>
          </div>
          <div>
            <img src="./images/button.png" className="pt-8" id="btn-img" />
          </div>
        </div>
        {/* Footer */}
        <div className="p-6 flex flex-wrap justify-between items-center">
          <button
            className="bg-indigo-500 p-2 text-white rounded w-36"
            onClick={onClickSkip}
          >
            Skip
          </button>
          {/* <button className="bg-indigo-500 p-2 text-white rounded w-36 mt-2 sm:mt-0">
            Next
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
