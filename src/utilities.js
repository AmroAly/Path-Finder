const findShortestPath = (start, end) => {
  // const timeout = (key, obj, i) =>
  //   setTimeout(() => obj[key].classList.add("visited"), 100 * i);
  // let i = 1;
  // for (let key in neighbors) {
  //   timeout(key, neighbors, i++);
  // }
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
              setTimeout(
                () =>
                  document
                    .querySelector(`#box-${node}`)
                    .classList.add("border-none", "bg-emerald-400"),
                50 * (j + 1)
              )
            ),
          1000
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
  // minDistances.sort();
  console.log(minDistances);
  console.log(predecessors);
  console.log(pathFound);
  console.log("path =>> ", path);
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
  const { innerHeight: height } = window;
  const y = window.scrollY + element.getBoundingClientRect().top;
  const { x } = element.getBoundingClientRect();
  const left = document.elementFromPoint(x - 20, y);
  const top = document.elementFromPoint(x, y - 20);
  const right = document.elementFromPoint(x + 29, y);
  const bottom = document.elementFromPoint(x, y + 29);

  return {
    top,
    bottom,
    right,
    left,
  };
};

export { findShortestPath };
