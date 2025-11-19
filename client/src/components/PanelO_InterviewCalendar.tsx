import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MapPin } from "lucide-react";

interface ScheduledInterview {
  candidateId: number;
  jobId: number;
  date: string;
  time: string;
  mode: string;
  interviewer: string;
}

interface PanelOProps {
  scheduledInterviews: ScheduledInterview[];
  candidates?: { candidateId: number; name: string }[];
}

export default function PanelO_InterviewCalendar({
  scheduledInterviews,
  candidates = [],
}: PanelOProps) {
  const getCandidateName = (candidateId: number) => {
    const candidate = candidates.find((c) => c.candidateId === candidateId);
    return candidate?.name || `Candidate ${candidateId}`;
  };

  const getModeIcon = (mode: string) => {
    return mode.toLowerCase() === "zoom" ? (
      <Video className="h-4 w-4" />
    ) : (
      <MapPin className="h-4 w-4" />
    );
  };

  const getModeVariant = (mode: string) => {
    return mode.toLowerCase() === "zoom" ? "secondary" : "outline";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle>Interview Calendar</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {scheduledInterviews.map((interview, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-lg space-y-3 hover-elevate"
            data-testid={`interview-${idx}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold">
                  {getCandidateName(interview.candidateId)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Interviewer: {interview.interviewer}
                </p>
              </div>
              <Badge variant={getModeVariant(interview.mode)}>
                <span className="flex items-center gap-1">
                  {getModeIcon(interview.mode)}
                  {interview.mode}
                </span>
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{interview.date}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{interview.time}</span>
              </div>
            </div>
          </div>
        ))}

        {scheduledInterviews.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No interviews scheduled
          </div>
        )}
      </CardContent>
    </Card>
  );
}
