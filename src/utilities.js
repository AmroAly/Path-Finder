const findShortestPath = () => {
  const startBox = document.querySelector("#start-box");
  const endBox = document.querySelector("#end-box");
  if (!startBox || !endBox) return;

  const start = startBox.parentElement;
  const end = endBox.parentElement;
  if (start == end) return;

  const boxes = document.querySelectorAll(".grid-box");
  const numOfVertices = boxes.length;
  const minDistances = Array(numOfVertices).fill(Number.POSITIVE_INFINITY);
  const predecessors = Array(numOfVertices).fill(-1);
  const startId = parseInt(start.id.substring(4));
  const endId = parseInt(end.id.substring(4));
  const path = [];
  minDistances[startId] = 0;
  let visited = new Set();

  let pathFound = false;
  let i = 1;
  while (visited.size < numOfVertices) {
    const { vertex, currentMinDistance } = getVertexWithMinDistance(
      minDistances,
      visited
    );

    if (visited.has(endId) || currentMinDistance == Number.POSITIVE_INFINITY)
      break;

    visited.add(vertex);

    const edges = getNeighbors(document.querySelector(`#box-${vertex}`));

    const distance = currentMinDistance + 1;
    for (let edge in edges) {
      if (!edges[edge]) continue;

      const destination = parseInt(edges[edge].id.substring(4));
      if (visited.has(endId)) {
        // path found
        let prev = endId;
        path.push(prev);
        while (predecessors[prev] != -1) {
          prev = predecessors[prev];
          path.push(prev);
        }
        path.reverse();
        setTimeout(
          () =>
            path.forEach((node, j) =>
              setTimeout(() => {
                document
                  .querySelector(`#box-${node}`)
                  .classList.remove("bg-violet-600");
                document
                  .querySelector(`#box-${node}`)
                  .classList.add("border-none", "bg-emerald-400");
              }, 50 * j)
            ),
          2000
        );
        pathFound = true;
        break;
      }

      if (
        (!destination && destination != 0) ||
        edges[edge].classList.contains("block") ||
        visited.has(destination)
      ) {
        continue;
      }

      setTimeout(() => edges[edge].classList.add("bg-violet-600"), 2 * i++);
      const newPathDistance = distance;
      const currentDestinationDistance = minDistances[destination];

      minDistances[destination] = Math.min(
        newPathDistance,
        currentDestinationDistance
      );
      predecessors[destination] = vertex;
    }
  }

  return minDistances;
};

const getVertexWithMinDistance = (distances, visited) => {
  let currentMinDistance = Number.POSITIVE_INFINITY;
  let vertex = -1;

  for (let i = 0; i < distances.length; i++) {
    if (visited.has(i)) continue;

    if (distances[i] <= currentMinDistance) {
      currentMinDistance = distances[i];
      vertex = i;
    }
  }
  return { vertex, currentMinDistance };
};

const getNeighbors = (element) => {
  const width = element.offsetWidth;
  const y = element.getBoundingClientRect().top;
  const { x } = element.getBoundingClientRect();
  const left = document.elementFromPoint(x - width, y);
  const top = document.elementFromPoint(x, y - width);
  const right = document.elementFromPoint(x + width, y);
  const bottom = document.elementFromPoint(x, y + width);

  return {
    top,
    bottom,
    right,
    left,
  };
};

const initStartAndEndPoints = () => {
  let startBox;
  let endBox;
  const { innerWidth: width, innerHeight: height } = window;

  startBox = document.elementFromPoint(
    Math.round(width / 4),
    Math.round(height / 2)
  );

  endBox = document.elementFromPoint(
    Math.round(width - width / 4),
    Math.round(height / 2)
  );

  if (
    startBox != null &&
    endBox != null &&
    typeof startBox.id != "undefined" &&
    startBox.id != "" &&
    startBox.id.startsWith("box") &&
    typeof endBox.id != "undefined" &&
    endBox.id != "" &&
    endBox.id.startsWith("box")
  ) {
    startBox.innerHTML =
      "<div class='h-full bg-cyan-900 border border-slate-200 rounded-full' id='start-box' draggable='true'></div>";

    endBox.innerHTML =
      "<div class='h-full bg-cyan-900	 border border-slate-200 rounded-full' id='end-box' draggable='true'></div>";
  }
};

(function () {
  // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
  document.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  document.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("id");
    e.target.appendChild(document.getElementById(id));
  });

  document.addEventListener("dragstart", (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("id", e.target.id);
  });
})();

export { findShortestPath, initStartAndEndPoints };
