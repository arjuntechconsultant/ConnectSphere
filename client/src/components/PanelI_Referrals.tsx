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
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts";
import { ArrowRight } from "lucide-react";

interface Referral {
  id: number;
  personReferred: string;
  jobTitle: string;
  convertedToInterview: boolean;
  status: string;
}

interface PanelIProps {
  referrals: Referral[];
  onSelectReferral?: (referralId: number) => void;
}

export default function PanelI_Referrals({ referrals, onSelectReferral }: PanelIProps) {
  const conversionData = [
    { stage: "Referred", count: referrals.length },
    {
      stage: "Interview",
      count: referrals.filter((r) => r.convertedToInterview).length,
    },
    {
      stage: "Offer",
      count: referrals.filter((r) => r.status === "Offer Extended").length,
    },
  ];

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "offer extended":
        return "default";
      case "interview":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Person Referred</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Interview</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow
                    key={referral.id}
                    className="hover-elevate cursor-pointer"
                    onClick={() => onSelectReferral?.(referral.id)}
                    data-testid={`referral-row-${referral.id}`}
                  >
                    <TableCell className="font-medium">
                      {referral.personReferred}
                    </TableCell>
                    <TableCell>{referral.jobTitle}</TableCell>
                    <TableCell>
                      {referral.convertedToInterview ? (
                        <Badge variant="secondary">Yes</Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(referral.status)}>
                        {referral.status}
                      </Badge>
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
          <CardTitle className="text-base">Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Count",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="stage" type="category" width={80} />
                <RechartsTooltip />
                <Bar dataKey="count" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Referral → Interview</span>
              <span className="font-semibold">
                {((conversionData[1].count / conversionData[0].count) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Interview → Offer</span>
              <span className="font-semibold">
                {conversionData[1].count > 0
                  ? ((conversionData[2].count / conversionData[1].count) * 100).toFixed(0)
                  : 0}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
