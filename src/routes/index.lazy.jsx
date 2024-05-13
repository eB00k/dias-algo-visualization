import { Button } from "@/components/ui/button";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="page h-screen">
      <div className="grid place-items-center h-full place-content-center gap-4">
        <h3 className="font-bold text-5xl animate-in slide-in-from-top-5 duration-800">
          Welcome Dias Algos!
        </h3>
        <Link to={"/visulization"}>
          <Button
            variant={"outline"}
            className="font-bold border animate-in slide-in-from-top-5 duration-900 border-bluish bg-bluish hover:bg-blue-500 text-white hover:text-white"
          >
            Explore Algorithms
          </Button>
        </Link>
      </div>
    </div>
  );
}
