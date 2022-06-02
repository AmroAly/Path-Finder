const Header = ({ onReset }) => {
  const onResetHandler = () => {
    onReset();
  };
  return (
    <nav className="container relative mx-auto flex items-center justify-between p-8 bg-violet-600 border-2 border-slate-900 rounded border-b-8">
      <div className="logo">
        <a
          href="#"
          className="text-3xl border-2 border-slate-50 rounded border-b-8 border-l-8 p-2 text-slate-50"
        >
          Visualizer
        </a>
      </div>
      <div>
        <button className="text-xl border-2 border-slate-900 rounded border-b-8  p-2 bg-yellow-300">
          Find Shortest Path
        </button>
      </div>
      <div>
        <button
          className="text-xl border-2 border-slate-900 rounded border-b-8 border-r-8 p-2 bg-emerald-300"
          onClick={onResetHandler}
        >
          Reset
        </button>
      </div>
    </nav>
  );
};

export default Header;
