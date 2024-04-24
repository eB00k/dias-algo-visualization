import { cn } from "@/lib/utils";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { twMerge } from "tailwind-merge";

function CardBox({ title, description, status }) {
  console.log(status);
  let statusColor = {
    bg: "bg-bluish",
    border: "border-bluish",
  };

  if (status === "done") {
    statusColor = {
      bg: "bg-green-400 dark:bg-green-600",
      border: "border-green-400 dark:border-green-600",
    };
  } else if (status === "undone") {
    statusColor = {
      bg: "bg-red-400 dark:bg-red-600",
      border: "border-red-400 dark:border-red-600",
    };
  } else if (status === "progress") {
    statusColor = {
      bg: "bg-orange-400 dark:bg-orange-600",
      border: "border-orange-400 dark:border-orange-600",
    };
  }

  return (
    <Card className="transition-all dark:hover:shadow-dark-key hover:shadow-key relative">
      <div
        className={cn(
          "absolute right-3 top-3 h-5 w-5 rounded-full border-2 flex justify-center items-center",
          statusColor.border
        )}
      >
        <div
          className={twMerge(
            "h-3 w-3 rounded-full animate-ping",
            statusColor.bg
          )}
        ></div>
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <Button size="sm" variant="link" className="text-bluish">
          View
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardBox;
