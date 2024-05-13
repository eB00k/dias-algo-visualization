import { Link } from "@tanstack/react-router";
import { Button } from "../button";
import ModeToggle from "../mode-toggle/ModeToggle";

const navLinks = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "About",
    to: "/about",
  },
  {
    label: "Visualization",
    to: "/visulization",
  },
  {
    label: "Challenges",
    to: "/challenges",
  },
];

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 ">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" href="#">
            <MountainIcon className="h-10 w-10 text-blue-600 hover:scale-110 transition-all hover:drop-shadow-[0_0_3px_blue]" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                className="font-medium flex items-center text-sm transition-colors hover:underline"
                to={link.to}
                activeProps={{ className: "text-bluish" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            {/* <Button size="sm" variant="outline">
              Sign in
            </Button>
            <Button size="sm">Sign up</Button> */}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="50" cy="20" r="6" fill="currentColor" />
      <circle cx="30" cy="45" r="6" fill="currentColor" />
      <circle cx="70" cy="45" r="6" fill="currentColor" />

      <circle cx="20" cy="70" r="6" fill="currentColor" />
      <circle cx="40" cy="70" r="6" fill="currentColor" />
      <circle cx="60" cy="70" r="6" fill="currentColor" />
      <circle cx="80" cy="70" r="6" fill="currentColor" />

      <line x1="50" y1="20" x2="30" y2="45" />
      <line x1="50" y1="20" x2="70" y2="45" />
      <line x1="30" y1="45" x2="20" y2="70" />
      <line x1="30" y1="45" x2="40" y2="70" />
      <line x1="70" y1="45" x2="60" y2="70" />
      <line x1="70" y1="45" x2="80" y2="70" />
    </svg>
  );
}
