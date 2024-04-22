import CardBox from "@/components/ui/card/CardBox";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/visulization/")({
  component: Index,
});

const data = [
  {
    title: "Sorting",
    link: "sorting",
    description:
      "Sorting algorithms are a set of instructions that take an array or list of elements and arrange them in a particular order.",
  },
  {
    title: "Linked List",
    link: "linked-list",
    description:
      "A linked list is a linear data structure consisting of a sequence of elements where each element points to the next element in the sequence.",
  },
  {
    title: "Stack",
    link: "stack",
    description:
      "A stack is a linear data structure that follows the Last In, First Out (LIFO) principle, where elements are inserted and removed from the same end called the top.",
  },
  {
    title: "Graph",
    link: "graph",
    description:
      "Graphs are a collection of nodes (vertices) and edges that connect pairs of nodes.",
  },
  {
    title: "Tree",
    link: "tree",
    description:
      "A tree is a hierarchical data structure consisting of nodes connected by edges.",
  },
  {
    title: "Searching",
    link: "searching",
    description:
      "Searching algorithms are used to find an item with specified properties among a collection of items.",
  },
  {
    title: "Dynamic Programming",
    link: "dynamic-programming",
    description:
      "Dynamic Programming is a method for solving complex problems by breaking them down into simpler subproblems.",
  },
];

function Index() {
  return (
    <div className="page">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center">
          Algorithms & Data Structure Visualizations
        </h2>

        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {data.map((item) => (
            <Link to={item.link} key={item.title}>
              <CardBox {...item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
