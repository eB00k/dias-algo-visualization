// Breadth-First Search (BFS) algorithm implementation
export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = []; // List to store visited nodes in order
  const queue = []; // Queue for BFS traversal
  queue.push(startNode); // Start BFS from the start node

  // Continue BFS traversal until the queue is empty
  while (queue.length) {
    const currentNode = queue.shift(); // Dequeue the current node from the queue

    // Skip if the current node is a wall or already visited
    if (currentNode.isWall || currentNode.isVisited) continue;

    currentNode.isVisited = true; // Mark the current node as visited
    visitedNodesInOrder.push(currentNode); // Add the current node to the visited list

    // If the finish node is reached, return the visited nodes
    if (currentNode === finishNode) return visitedNodesInOrder;

    // Get unvisited neighbors of the current node and enqueue them
    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      neighbor.previousNode = currentNode; // Set the previous node for backtracking
      queue.push(neighbor); // Enqueue the neighbor
    }
  }

  return visitedNodesInOrder; // Return the visited nodes if the finish node is not reachable
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
