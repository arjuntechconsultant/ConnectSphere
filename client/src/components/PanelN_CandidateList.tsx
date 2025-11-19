import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Candidate {
  candidateId: number;
  name: string;
  avatar: string;
  appliedJob: string;
  status: string;
  ratings: { technical: number; communication: number; culturalFit: number };
  overallScore: number;
}

interface PanelNProps {
  candidates: Candidate[];
  onSelectCandidate?: (candidate: Candidate) => void;
}

export default function PanelN_CandidateList({
  candidates,
  onSelectCandidate,
}: PanelNProps) {
  const [filterJob, setFilterJob] = useState<string>("all");

  const uniqueJobs = Array.from(new Set(candidates.map((c) => c.appliedJob)));

  const filteredCandidates =
    filterJob === "all"
      ? candidates
      : candidates.filter((c) => c.appliedJob === filterJob);

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "offer extended":
        return "default";
      case "interview scheduled":
        return "secondary";
      case "in progress":
        return "outline";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Candidates</CardTitle>
          <Select value={filterJob} onValueChange={setFilterJob}>
            <SelectTrigger className="w-[200px]" data-testid="select-filter-job">
              <SelectValue placeholder="Filter by job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              {uniqueJobs.map((job) => (
                <SelectItem key={job} value={job}>
                  {job}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map((candidate) => (
            <Card
              key={candidate.candidateId}
              className="hover-elevate cursor-pointer transition-all"
              onClick={() => onSelectCandidate?.(candidate)}
              data-testid={`candidate-card-${candidate.candidateId}`}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} />
                    <AvatarFallback>
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {candidate.appliedJob}
                    </p>
                  </div>
                </div>

                <Badge variant={getStatusVariant(candidate.status)} className="w-full justify-center">
                  {candidate.status}
                </Badge>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Overall Score</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">
                      {candidate.overallScore.toFixed(1)}
                    </span>
                    <Star className="h-3 w-3 fill-primary text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
