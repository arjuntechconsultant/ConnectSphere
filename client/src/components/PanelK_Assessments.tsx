import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Award, Medal } from "lucide-react";

interface Assessment {
  id: number;
  name: string;
  score: number;
  date: string;
  type: string;
}

interface PanelKProps {
  assessments: Assessment[];
}

export default function PanelK_Assessments({ assessments }: PanelKProps) {
  const sortedByScore = [...assessments].sort((a, b) => b.score - a.score);
  const averageScore =
    assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length;

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "mcq":
        return "secondary";
      case "coding":
        return "default";
      case "written":
        return "outline";
      default:
        return "outline";
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-chart-4" />;
      case 1:
        return <Award className="h-5 w-5 text-muted-foreground" />;
      case 2:
        return <Medal className="h-5 w-5 text-chart-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Assessments</CardTitle>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Average</p>
              <p className="text-xl font-bold text-primary">
                {averageScore.toFixed(0)}%
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="p-4 border rounded-lg space-y-3 hover-elevate"
              data-testid={`assessment-${assessment.id}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{assessment.name}</h4>
                    <Badge variant={getTypeColor(assessment.type)}>
                      {assessment.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{assessment.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    {assessment.score}%
                  </p>
                </div>
              </div>
              <Progress value={assessment.score} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sortedByScore.map((assessment, idx) => (
            <div
              key={assessment.id}
              className="flex items-center gap-3 p-3 rounded-lg hover-elevate"
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(idx) || (
                  <span className="text-sm font-semibold text-muted-foreground">
                    {idx + 1}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{assessment.name}</p>
                <p className="text-xs text-muted-foreground">{assessment.type}</p>
              </div>
              <Badge variant={assessment.score >= 90 ? "default" : "secondary"}>
                {assessment.score}%
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
