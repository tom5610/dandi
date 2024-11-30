import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export function PlanOverviewCard() {
  // These values should come from props or a context in a real application
  const currentUsage = 0;
  const usageLimit = 1000;

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-rose-100/90 via-purple-100/90 to-blue-100/90" />
      <div className="relative p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="text-sm font-medium text-gray-600 mb-2">CURRENT PLAN</div>
            <h1 className="text-4xl font-bold">Researcher</h1>
          </div>
          <Button variant="secondary" className="bg-white/80 hover:bg-white/90">
            Manage Plan
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">API Limit</div>
            <InfoCircledIcon className="h-4 w-4 text-gray-500" />
          </div>
          <div className="space-y-1">
            <Progress 
              value={(currentUsage / usageLimit) * 100} 
              className="h-2 bg-white/50"
            />
            <div className="text-sm">
              {currentUsage}/{usageLimit} Requests
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 