import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts";

interface JobOpening {
  jobId: number;
  title: string;
  department: string;
  applications: number;
  inProgress: number;
  rejected: number;
  interviewScheduled: number;
  offersGiven: number;
}

interface PanelMProps {
  jobOpenings: JobOpening[];
}

export default function PanelM_JobOpenings({ jobOpenings }: PanelMProps) {
  const chartData = jobOpenings.map((job) => ({
    title: job.title,
    Applications: job.applications,
    "In Progress": job.inProgress,
    Rejected: job.rejected,
    Interviews: job.interviewScheduled,
    Offers: job.offersGiven,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Job Openings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Applications</TableHead>
                  <TableHead className="text-right">Offers</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobOpenings.map((job) => (
                  <TableRow
                    key={job.jobId}
                    className="hover-elevate cursor-pointer"
                    data-testid={`job-opening-${job.jobId}`}
                  >
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{job.department}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{job.applications}</TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-primary">
                        {job.offersGiven}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Application Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              Applications: {
                label: "Applications",
                color: "hsl(var(--chart-1))",
              },
              "In Progress": {
                label: "In Progress",
                color: "hsl(var(--chart-2))",
              },
              Rejected: {
                label: "Rejected",
                color: "hsl(var(--chart-5))",
              },
              Interviews: {
                label: "Interviews",
                color: "hsl(var(--chart-3))",
              },
              Offers: {
                label: "Offers",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="Applications" fill="hsl(var(--chart-1))" />
                <Bar dataKey="In Progress" fill="hsl(var(--chart-2))" />
                <Bar dataKey="Rejected" fill="hsl(var(--chart-5))" />
                <Bar dataKey="Interviews" fill="hsl(var(--chart-3))" />
                <Bar dataKey="Offers" fill="hsl(var(--chart-4))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
