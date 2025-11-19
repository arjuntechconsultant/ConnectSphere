import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Interview {
  id: number;
  question: string;
  answerVideo: string;
  score: number;
  answer: string;
}

interface PanelJProps {
  interviews: Interview[];
}

export default function PanelJ_PreRecordedInterviews({ interviews }: PanelJProps) {
  const averageScore =
    interviews.reduce((sum, i) => sum + i.score, 0) / interviews.length;

  const handlePlayVideo = (videoUrl: string) => {
    console.log("Playing video:", videoUrl);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pre-recorded Interviews</CardTitle>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Average Score</p>
            <p className="text-2xl font-bold text-primary">
              {averageScore.toFixed(1)}/10
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {interviews.map((interview, idx) => (
          <div
            key={interview.id}
            className="p-4 border rounded-lg space-y-3 hover-elevate"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Question {idx + 1}</Badge>
                  <Badge
                    variant={interview.score >= 8 ? "default" : interview.score >= 6 ? "secondary" : "destructive"}
                  >
                    Score: {interview.score}/10
                  </Badge>
                </div>
                <p className="font-medium">{interview.question}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {interview.answer}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Performance</span>
              </div>
              <Progress value={interview.score * 10} />
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePlayVideo(interview.answerVideo)}
                data-testid={`button-play-video-${interview.id}`}
              >
                <Play className="h-4 w-4 mr-2" />
                Play Video
              </Button>
              <Button size="sm" variant="ghost">
                <FileText className="h-4 w-4 mr-2" />
                Transcript
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
