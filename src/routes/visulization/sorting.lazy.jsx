import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/visulization/sorting")({
  component: () => (
    <div className="page">
      <h1>Sorting Algorithms</h1>
    </div>
  ),
});
