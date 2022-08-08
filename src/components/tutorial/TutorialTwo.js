const TutorialTwo = () => (
  <div className="hidden" id="tutorial-two">
    <div>
      <p className="p-8 text-xl">Select an Algorithm from the dropdown.</p>
    </div>
    <div className="flex justify-center">
      <img
        src={process.env.PUBLIC_URL + "/images/button2.png"}
        className="w-9/12"
        id="btn-img"
      />
    </div>
  </div>
);

export default TutorialTwo;
