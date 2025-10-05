import { IconTrendingUp } from "@tabler/icons-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card";

const data = [
  {
    title: "Total Responses",
    value: "50",
    description: "Total number of responses received.",
    trend: "Upward trend",
  },
  {
    title: "Last 7 Days",
    value: "10",
    description: "Responses in the past week.",
    trend: "Weekly growth",
  },
  {
    title: "Conversion Rate",
    value: "5%",
    description: "Conversion rate over the last 7 days.",
    trend: "Consistent rate",
  },
];

export function Cards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {data.map((item, index) => (
        <Card
          key={index}
          className="bg-zinc-900 rounded-2xl p-4 hover:bg-zinc-800/50 hover:shadow-[0_0_20px_rgba(0,255,200,0.2)] transition-all duration-300 border border-zinc-800"
        >
          <CardHeader className="p-0 mb-2">
            <CardDescription className="text-xs text-zinc-400 tracking-wide uppercase">
              {item.title}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold text-white">
              {item.value}
            </CardTitle>
          </CardHeader>

          <CardFooter className="flex items-start justify-between p-0 mt-3">
            <div className="text-sm text-zinc-400 max-w-[60%] leading-snug">
              {item.description}
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
              <IconTrendingUp className="w-4 h-4" />
              {item.trend}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
