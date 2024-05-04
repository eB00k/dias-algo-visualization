import { getUnvisitedNeighbors } from "./commons";

// Depth-First Search (DFS) algorithm implementation
export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = []; // List to store visited nodes in order
  const stack = []; // Stack for DFS traversal
  stack.push(startNode); // Start DFS from the start node

  // Continue DFS traversal until the stack is empty
  while (stack.length) {
    const currentNode = stack.pop(); // Pop the current node from the stack

    // Skip if the current node is a wall or already visited
    if (currentNode.isWall || currentNode.isVisited) continue;

    currentNode.isVisited = true; // Mark the current node as visited
    visitedNodesInOrder.push(currentNode); // Add the current node to the visited list

    // If the finish node is reached, return the visited nodes
    if (currentNode === finishNode) return visitedNodesInOrder;

    // Get unvisited neighbors of the current node and push them onto the stack
    const neighbors = getUnvisitedNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      neighbor.previousNode = currentNode; // Set the previous node for backtracking
      stack.push(neighbor); // Push the neighbor onto the stack
    }
  }

  return visitedNodesInOrder; // Return the visited nodes if the finish node is not reachable
}
