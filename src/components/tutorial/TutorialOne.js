const TutorialOne = () => {
  return (
    <div className="flex flex-wrap justify-center" id="tutorial-one">
      <div className="text-xl">
        You can create a wall by clicking on the little squares and drawing like
        so
      </div>
      <div className="flex justify-center">
        <img
          src={process.env.PUBLIC_URL + "/images/Draw_wall.gif"}
          className="pt-8 w-9/12"
        />
      </div>
    </div>
  );
};

export default TutorialOne;
