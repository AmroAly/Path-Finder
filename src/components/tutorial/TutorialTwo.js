const TutorialTwo = () => (
  <div className="hidden" id="tutorial-two">
    <div>
      <p className="p-8 text-xl">
        Click the yellow button over there to see the Magic happens!
      </p>
    </div>
    <div className="flex justify-center">
      <img
        src={process.env.PUBLIC_URL + "/images/button.png"}
        className="w-9/12"
        id="btn-img"
      />
    </div>
  </div>
);

export default TutorialTwo;
