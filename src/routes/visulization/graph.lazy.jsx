import { createLazyFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Node from "@/components/path-finder/node/Node";
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "@/components/path-finder/algorithims/dijkstra";
import { Button } from "@/components/ui/button";
import { bfs } from "@/components/path-finder/algorithims/bfs";
import { dfs } from "@/components/path-finder/algorithims/dfs";
import { pathFindingAlgorithmsOptions } from "@/lib/store/config";
import SelectOption from "@/components/ui/select/SelectOption";

export const Route = createLazyFileRoute("/visulization/graph")({
  component: PathFindingVisulizer,
});

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

function PathFindingVisulizer() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [selected, setSelected] = useState("dijkstra");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    setDisabled(true);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        setDisabled(false);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
    setDisabled(false);
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualizeBFS = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    animatePath(visitedNodesInOrder, finishNode);
  };

  const visualizeDFS = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    animatePath(visitedNodesInOrder, finishNode);
  };

  const animatePath = (visitedNodesInOrder, finishNode) => {
    setDisabled(true);
    const shortestPathNodes = getNodesInShortestPathOrder(
      finishNode,
      visitedNodesInOrder
    );

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const node = visitedNodesInOrder[i];
      if (node === finishNode || node.isStart) continue;
      setTimeout(() => {
        // Animate the visited nodes
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 50 * i);
    }

    for (let i = 0; i < shortestPathNodes.length; i++) {
      const node = shortestPathNodes[i];
      if (node.isStart) continue;
      setTimeout(
        () => {
          // Animate the shortest path nodes
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        },
        50 * visitedNodesInOrder.length + 50 * i
      );
    }

    setDisabled(false);
  };

  const clearGrid = () => {
    const newGrid = grid.map((row) =>
      row.map((node) => {
        const newNode = {
          ...node,
          isVisited: false,
          isShortestPath: false,
        };
        resetNodeClassName(node);
        return newNode;
      })
    );
    setGrid(newGrid);
  };

  const visualize = () => {
    switch (selected) {
      case "dijkstra":
        visualizeDijkstra();
        break;
      case "bfs":
        visualizeBFS();
        break;
      case "dfs":
        visualizeDFS();
        break;
      default:
        alert("Please select algorithm");
    }
  };

  return (
    <div className="page">
      <div>
        <h1 className="page-title">Graph Visualization</h1>
        <div className="flex flex-col gap-2">
          <div className="flex w-full flex-col gap-2 p-2 md:flex-row">
            <SelectOption
              options={pathFindingAlgorithmsOptions}
              defaultValue={selected}
              setValue={setSelected}
            ></SelectOption>
            <Button onClick={visualize} disabled={disabled}>
              Visualize
            </Button>
            <Button variant={"destructive"} onClick={() => clearGrid()}>
              Clear Grid
            </Button>
          </div>
          <div className="flex flex-col justify-center items-center">
            {grid.map((row, rowIdx) => (
              <div key={rowIdx} className="flex">
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={() => handleMouseDown(row, col)}
                      onMouseEnter={() => handleMouseEnter(row, col)}
                      onMouseUp={handleMouseUp}
                      row={row}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// get initial grid
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

// creating node
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

// getting new grid cell
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

// reset node class properties
const resetNodeClassName = (node) => {
  const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
  if (!nodeElement) return;
  if (node.isWall) return;
  if (node.isFinish) {
    nodeElement.className = "node node-finish";
  } else if (node.isStart) {
    nodeElement.className = "node node-start";
  } else {
    nodeElement.className = "node";
  }
};
