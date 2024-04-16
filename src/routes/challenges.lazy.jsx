import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/challenges")({
  component: Challenges,
});

function Challenges() {
  return <div className="page">Challenges</div>;
}
