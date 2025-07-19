import {Card, CardContent, CardHeader, CardHeading, CardToolbar} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ArrowLeftRight, Download, Plus} from "lucide-react";
import RoutePlannerSelectForm from "@/components/home/route-planner-select-form";


export default function Home() {
  return (
      <Card className="m-5 p-5">
        <CardHeader>
          <CardHeading>
            <h1 className="font-bold text-primary">Route Planner Microservice</h1>
          </CardHeading>
          <CardToolbar>
            <Button mode="icon" variant="destructive" size="sm">
              <Download />
            </Button>
            <Button mode="icon" variant="outline" size="sm">
              <Plus />
            </Button>
          </CardToolbar>
        </CardHeader>

        <CardContent>
            <div className="grid grid-cols-3 gap-4">
                <RoutePlannerSelectForm/>
                <Button mode="icon" variant="primary" size="sm">
                    <ArrowLeftRight className="h-4 w-4" />
                </Button>
                <RoutePlannerSelectForm/>
            </div>
        </CardContent>
      </Card>
  );
}
