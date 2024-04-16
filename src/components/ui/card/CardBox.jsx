import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";

function CardBox({ title, description }) {
  return (
    <Card className="transition-all dark:hover:shadow-dark-key hover:shadow-key">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardContent className="p-0">
          <Button size="sm" variant="link" className="text-blue-600">
            View
          </Button>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default CardBox;
