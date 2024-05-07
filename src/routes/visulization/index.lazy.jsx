import CardBox from "@/components/ui/card/CardBox";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/visulization/")({
  component: Index,
});

// progress, done, undone

const data = [
  {
    title: "Sorting",
    link: "sorting",
    status: "done",
    description:
      "Sorting algorithms are a set of instructions that take an array or list of elements and arrange them in a particular order.",
  },
  {
    title: "Searching",
    link: "searching",
    status: "done",
    description:
      "Searching algorithms are used to find an item with specified properties among a collection of items.",
  },
  {
    title: "Linked List",
    link: "linked-list",
    status: "done",
    description:
      "A linked list is a linear data structure consisting of a sequence of elements where each element points to the next element in the sequence.",
  },
  {
    title: "Stack & Queue",
    link: "stack-queue",
    status: "done",
    description:
      "Stack and Queue are linear data structures. Stack follows the Last In, First Out (LIFO) principle, and Queue follows the First In, First Out (FIFO) principle.",
  },
  {
    title: "Hash Functions",
    link: "hash",
    status: "undone",
    description:
      "Hash functions produce fixed-size output from an input, commonly used in computer science for tasks like data retrieval and cryptography.",
  },
  {
    title: "Postfix, Prefix, and Infix Notations",
    link: "postfix-prefix-infix",
    status: "done",
    description:
      "Different ways of representing mathematical expressions, essential for expression evaluation and parsing in computer science.",
  },
  {
    title: "Graph",
    link: "graph",
    status: "progress",
    description:
      "Graphs are a collection of nodes (vertices) and edges that connect pairs of nodes.",
  },
  {
    title: "Tree",
    link: "tree",
    status: "undone",
    description:
      "A tree is a hierarchical data structure consisting of nodes connected by edges.",
  },
  {
    title: "Dynamic Programming",
    link: "dynamic-programming",
    status: "undone",
    description:
      "Dynamic Programming is a method for solving complex problems by breaking them down into simpler subproblems.",
  },
  {
    title: "Path Finding Algorithms",
    link: "path-finding-algorithms",
    status: "undone",
    description:
      "Path Finding Algorithms are used to find a path between two points in a graph or grid.",
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
