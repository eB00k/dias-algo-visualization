import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/visulization/tree")({
  component: Tree,
});

function Tree() {
  return (
    <div className="page">
      <div>
        <h1>Tree Visualization</h1>
        <div></div>
      </div>
    </div>
  );
}
