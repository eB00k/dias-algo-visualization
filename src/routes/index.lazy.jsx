import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="page">
      <h3 className="">Welcome Home!</h3>
    </div>
  );
}
