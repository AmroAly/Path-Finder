const findShortestPath = (algorithm) => {
  const startBox = document.querySelector("#start-box");
  const endBox = document.querySelector("#end-box");
  if (!startBox || !endBox) return;

  const start = startBox.parentElement;
  const end = endBox.parentElement;
  if (start == end) return;

  removeVisitedBoxes();

  removePath();

  if (algorithm === "aAlgorithm") {
    aAlgorithm(startBox, endBox);
  } else if (algorithm === "Dijkstra") {
    dijkstraAlgorithm(start, end);
  }
};

const dijkstraAlgorithm = (start, end) => {
  const boxes = document.querySelectorAll(".grid-box");
  const numOfVertices = boxes.length;
  const minDistances = Array(numOfVertices).fill(Number.POSITIVE_INFINITY);
  const predecessors = Array(numOfVertices).fill(-1);
  const startId = parseInt(start.id.substring(4));
  const endId = parseInt(end.id.substring(4));
  const path = [];
  const nodesToVisualize = [];
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
    nodesToVisualize.push(`box-${vertex}`);
    const edges = getNeighbors(document.querySelector(`#box-${vertex}`));

    const distance = currentMinDistance + 1;
    for (let edge in edges) {
      if (!edges[edge]) continue;

      const destination = parseInt(edges[edge].id.substring(4));
      if (visited.has(endId)) {
        // path found
        let prev = endId;
        path.push(`box-${prev}`);
        while (predecessors[prev] != -1) {
          prev = predecessors[prev];
          path.push(`box-${prev}`);
        }
        path.reverse();
        pathFound = true;
        break;
      }

      if (
        (!destination && destination != 0) ||
        edges[edge].classList.contains("wall") ||
        visited.has(destination)
      ) {
        continue;
      }

      const newPathDistance = distance;
      const currentDestinationDistance = minDistances[destination];

      minDistances[destination] = Math.min(
        newPathDistance,
        currentDestinationDistance
      );
      predecessors[destination] = vertex;
    }
  }

  visualize(nodesToVisualize, "Dijkstra").then(() => visualizePathFound(path));

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

const visualize = (elementsIDs, algorithm) => {
  const promises = [];
  const timeoutInMS = algorithm === "Dijkstra" ? 5 : 50;
  // console.log(timeoutInMS);
  elementsIDs.forEach((elId, x) => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        document.querySelector(`#${elId}`).classList.add("visited");
        resolve();
      }, timeoutInMS * x);
    });

    promises.push(promise);
  });

  return Promise.all(promises);
};

const visualizePathFound = (elementsIDs) => {
  const promises = [];
  elementsIDs.forEach((elId, x) => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        document.querySelector(`#${elId}`).classList.add("path");
        resolve();
      }, 50 * x);
    });

    promises.push(promise);
  });

  return Promise.all(promises);
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
      "<div class='h-full bg-cyan-900 border border-slate-200 rounded' id='start-box' draggable='true'><p>&#10140;</p></div>";

    endBox.innerHTML =
      "<div class='h-full bg-cyan-900	 border border-slate-200 rounded' id='end-box' draggable='true'><p>&#10140;</p></div>";
  }
};

(function () {
  // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
  document.addEventListener("dragover", function (event) {
    // event.target.style.opacity = ".1";
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
    e.target.classList.add("start-end-box-animate");
  });
})();

const addModalView = (elementToDisplay) => {
  let elementIdToDisplay;
  if (elementToDisplay === 1) elementIdToDisplay = "tutorial-one";
  if (elementToDisplay === 2) elementIdToDisplay = "tutorial-two";
  if (elementToDisplay === 3) elementIdToDisplay = "tutorial-three";
  if (!elementIdToDisplay) return;
  const elements = document.querySelector("#modal-content").children;
  for (let k of elements) {
    if (k.id == elementIdToDisplay) {
      k.classList.remove("hidden");
    } else {
      k.classList.add("hidden");
    }
  }
};

const aAlgorithm = (startBox, endBox) => {
  if (!startBox || !endBox) return;
  const nodes = initializeNodes(document.querySelectorAll(".grid-box"));
  const startNode = nodes[startBox.parentElement.id];
  const endNode = nodes[endBox.parentElement.id];
  if (!startNode || !endNode) return;

  startNode.distanceFromStart = 0;
  startNode.estimatedDistanceToEnd = caculateManhattanDistance(
    startNode,
    endNode
  );

  const nodesToVisitArr = [];
  nodesToVisitArr.push(startNode);
  const nodesToVisit = new MinHeap(nodesToVisitArr);

  let i = 0;
  while (!nodesToVisit.isEmpty()) {
    let currentMinDistanceNode = nodesToVisit.remove();

    if (currentMinDistanceNode == endNode) {
      break;
    }

    const { x, y } = currentMinDistanceNode;

    let neighbors = getNeighbors(document.elementFromPoint(x, y));

    for (let neighbor in neighbors) {
      if (
        !neighbors[neighbor] ||
        neighbors[neighbor].classList.contains("wall")
      ) {
        continue;
      }

      let neighborNode = nodes[neighbors[neighbor].id];

      let distanceToNeighbor = currentMinDistanceNode.distanceFromStart + 1;
      if (
        !neighborNode ||
        distanceToNeighbor >= neighborNode.distanceFromStart
      ) {
        continue;
      }

      neighborNode.cameFrom = currentMinDistanceNode;
      neighborNode.distanceFromStart = distanceToNeighbor;
      neighborNode.estimatedDistanceToEnd =
        distanceToNeighbor + caculateManhattanDistance(neighborNode, endNode);

      if (!nodesToVisit.containsNode(neighborNode)) {
        nodesToVisit.insert(neighborNode);
      } else {
        nodesToVisit.update(neighborNode);
      }
    }
  }
  const path = constructPath(endNode);

  visualizePathFound(path).then(() => {
    console.log("finished");
  });

  return path;
};

function constructPath(endNode) {
  if (endNode.cameFrom == null) return [];
  let current = endNode;
  const path = [];
  let x = 1;
  while (current != null) {
    path.push(current.id);
    current = current.cameFrom;
  }
  return path.reverse();
}

const caculateManhattanDistance = (startNode, endNode) => {
  const widthOfBox = document.elementFromPoint(
    startNode.x,
    startNode.y
  ).offsetWidth;

  return Math.abs(startNode.x - endNode.x) + Math.abs(startNode.y - endNode.y);
};

const initializeNodes = (elements) => {
  if (!elements) return;
  function Node(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;

    this.cameFrom = null;
    this.distanceFromStart = Number.POSITIVE_INFINITY;
    this.estimatedDistanceToEnd = Number.POSITIVE_INFINITY;
  }

  let nodes = {};
  elements.forEach((element) => {
    const y = element.getBoundingClientRect().top;
    const { x } = element.getBoundingClientRect();
    nodes[element.id] = new Node(x, y, element.id);
  });

  return nodes;
};

function MinHeap(arr) {
  this.heap = [];
  this.nodesPositionInHeap = {};
  for (let i = 0; i < arr.length; i++) {
    let node = arr[i];
    this.nodesPositionInHeap[node.id] = i;
  }

  this.siftDown = function (currentIdx, endIdx, arr) {
    let childOneIdx = currentIdx * 2 + 1;
    while (currentIdx <= endIdx) {
      let childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (
        childTwoIdx != -1 &&
        arr[childTwoIdx].estimatedDistanceToEnd <
          this.heap[childOneIdx].estimatedDistanceToEnd
      ) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }

      if (
        arr[idxToSwap] &&
        arr[idxToSwap].estimatedDistanceToEnd <
          arr[currentIdx].estimatedDistanceToEnd
      ) {
        this.swap(currentIdx, idxToSwap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  };

  this.buildHeap = function (arr) {
    const firstParenIndex = Math.floor((arr.length - 2) / 2);
    for (let i = firstParenIndex + 1; i >= 0; i--) {
      this.siftDown(i, arr.length - 1, arr);
    }
    return arr;
  };

  this.heap = this.buildHeap(arr);

  this.siftUp = function (currentIdx) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (
      parentIdx > 0 &&
      this.heap[currentIdx].estimatedDistanceToEnd <
        this.heap[parentIdx].estimatedDistanceToEnd
    ) {
      this.swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  };

  this.remove = function () {
    if (this.heap.length == 0) return null;

    const heapLength = this.heap.length;
    this.swap(0, heapLength - 1);
    const nodeToRemove = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return nodeToRemove;
  };

  this.insert = function (node) {
    this.heap.push(node);
    this.nodesPositionInHeap[node.id] = this.heap.length - 1;
    this.siftUp(this.heap.length - 1);
  };

  this.update = function (node) {
    const nodePosition = this.nodesPositionInHeap[node.id];
    this.siftUp(nodePosition);
  };

  this.containsNode = function (node) {
    return node.id in this.nodesPositionInHeap;
  };

  this.swap = function (i, j) {
    this.nodesPositionInHeap[this.heap[i].id] = j;
    this.nodesPositionInHeap[this.heap[j].id] = i;
    const tmpNode = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmpNode;
  };

  this.isEmpty = function () {
    return this.heap.length === 0;
  };
}

const shakeButton = () => {
  const button = document.querySelector("#menu-button");
  button.classList.add("shaking");
  setTimeout(() => button.classList.remove("shaking"), 1000);
};

const removeWalls = () => {
  const blocks = document.querySelectorAll(".wall");
  blocks.forEach((b) => {
    b.classList.remove("bg-slate-900", "border-none", "wall");
  });
};

const removePath = () => {
  const path = document.querySelectorAll(".path");
  path.forEach((b) => {
    b.classList.remove("path");
  });
};

const removeVisitedBoxes = () => {
  const visited = document.querySelectorAll(".visited");
  visited.forEach((el) => el.classList.remove("visited"));
};

const onReset = () => {
  removeWalls();
  removeVisitedBoxes();
  removePath();
};

export {
  findShortestPath,
  initStartAndEndPoints,
  addModalView,
  shakeButton,
  removeWalls,
  onReset,
};
