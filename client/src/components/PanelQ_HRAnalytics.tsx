import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from "recharts";
import { TrendingUp, Users, Briefcase, Award } from "lucide-react";

interface HRAnalytic {
  jobTitle: string;
  totalApplications: number;
  interviewsScheduled: number;
  offersGiven: number;
  avgScore: number;
}

interface PanelQProps {
  analytics: HRAnalytic[];
}

export default function PanelQ_HRAnalytics({ analytics }: PanelQProps) {
  const totalApplications = analytics.reduce(
    (sum, a) => sum + a.totalApplications,
    0
  );
  const totalInterviews = analytics.reduce(
    (sum, a) => sum + a.interviewsScheduled,
    0
  );
  const totalOffers = analytics.reduce((sum, a) => sum + a.offersGiven, 0);
  const avgConversionRate =
    totalApplications > 0 ? ((totalOffers / totalApplications) * 100).toFixed(1) : "0";

  const chartData = analytics.map((a) => ({
    job: a.jobTitle,
    Applications: a.totalApplications,
    Interviews: a.interviewsScheduled,
    Offers: a.offersGiven,
    "Avg Score": a.avgScore,
  }));

  const metrics = [
    {
      title: "Total Applications",
      value: totalApplications,
      icon: Users,
      color: "text-chart-1",
    },
    {
      title: "Interviews Scheduled",
      value: totalInterviews,
      icon: Briefcase,
      color: "text-chart-2",
    },
    {
      title: "Offers Extended",
      value: totalOffers,
      icon: Award,
      color: "text-chart-4",
    },
    {
      title: "Conversion Rate",
      value: `${avgConversionRate}%`,
      icon: TrendingUp,
      color: "text-chart-3",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Application Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                Applications: {
                  label: "Applications",
                  color: "hsl(var(--chart-1))",
                },
                Interviews: {
                  label: "Interviews",
                  color: "hsl(var(--chart-2))",
                },
                Offers: {
                  label: "Offers",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="job" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="Applications" fill="hsl(var(--chart-1))" />
                  <Bar dataKey="Interviews" fill="hsl(var(--chart-2))" />
                  <Bar dataKey="Offers" fill="hsl(var(--chart-4))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Average Candidate Score</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                "Avg Score": {
                  label: "Average Score",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="job" />
                  <YAxis domain={[0, 5]} />
                  <RechartsTooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Avg Score"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
