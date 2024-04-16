import Navbar from "@/components/ui/navbar/Navbar";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-background container">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
