import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface PanelFProps {
  stats?: {
    influence: number;
    referrals: number;
    interactions: number;
  };
}

export default function PanelF_Charts({ stats }: PanelFProps) {
  const influenceData = [
    { month: "Jan", value: 3.5 },
    { month: "Feb", value: 3.8 },
    { month: "Mar", value: 4.2 },
    { month: "Apr", value: 4.5 },
    { month: "May", value: stats?.influence || 4.5 },
  ];

  const referralData = [
    { month: "Jan", count: 0 },
    { month: "Feb", count: 1 },
    { month: "Mar", count: 2 },
    { month: "Apr", count: 2 },
    { month: "May", count: stats?.referrals || 3 },
  ];

  const interactionData = [
    { month: "Jan", count: 5 },
    { month: "Feb", count: 7 },
    { month: "Mar", count: 9 },
    { month: "Apr", count: 10 },
    { month: "May", count: stats?.interactions || 12 },
  ];

  const coffeeChatData = [
    { month: "Jan", count: 0 },
    { month: "Feb", count: 1 },
    { month: "Mar", count: 1 },
    { month: "Apr", count: 0 },
    { month: "May", count: 2 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Influence Score</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Influence",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[180px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={influenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <RechartsTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Referrals",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[180px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referralData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Interactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Interactions",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[180px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={interactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Coffee Chats</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Coffee Chats",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[180px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coffeeChatData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="hsl(var(--chart-4))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
