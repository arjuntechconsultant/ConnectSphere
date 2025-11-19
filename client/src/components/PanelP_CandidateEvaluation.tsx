import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Candidate {
  candidateId: number;
  name: string;
}

interface PanelPProps {
  selectedCandidate: Candidate | null;
  initialRatings?: {
    technical: number;
    communication: number;
    culturalFit: number;
  };
  initialFeedback?: string;
}

export default function PanelP_CandidateEvaluation({
  selectedCandidate,
  initialRatings,
  initialFeedback,
}: PanelPProps) {
  const { toast } = useToast();
  const [ratings, setRatings] = useState({
    technical: initialRatings?.technical || 0,
    communication: initialRatings?.communication || 0,
    culturalFit: initialRatings?.culturalFit || 0,
  });
  const [feedback, setFeedback] = useState(initialFeedback || "");

  const ratingLabels = {
    technical: "Technical Skills",
    communication: "Communication",
    culturalFit: "Cultural Fit",
  };

  const handleRating = (category: string, value: number) => {
    setRatings({ ...ratings, [category]: value });
  };

  const overall =
    Object.values(ratings).reduce((sum, val) => sum + val, 0) /
    Object.values(ratings).length;

  const handleSubmit = () => {
    if (!selectedCandidate) return;

    console.log("Evaluation submitted:", {
      candidateId: selectedCandidate.candidateId,
      ratings,
      overall,
      feedback,
    });

    toast({
      title: "Evaluation Saved",
      description: `Evaluation for ${selectedCandidate.name} has been saved.`,
    });
  };

  if (!selectedCandidate) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Select a candidate to evaluate
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Evaluation</CardTitle>
        <p className="text-sm text-muted-foreground">
          Evaluating: <span className="font-semibold">{selectedCandidate.name}</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {Object.entries(ratingLabels).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium min-w-[140px]">{label}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(key, star)}
                    className="hover-elevate active-elevate-2 rounded transition-colors"
                    data-testid={`eval-rating-${key}-${star}`}
                  >
                    <Star
                      className={`h-5 w-5 ${
                        star <= ratings[key as keyof typeof ratings]
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Overall Score</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  {overall > 0 ? overall.toFixed(1) : "-"}
                </span>
                <Star className="h-6 w-6 fill-primary text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Feedback & Notes</label>
          <Textarea
            placeholder="Enter detailed feedback about the candidate..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[120px]"
            data-testid="input-candidate-feedback"
          />
          <p className="text-xs text-muted-foreground">
            {feedback.length} characters
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full"
          data-testid="button-save-evaluation"
        >
          Save Evaluation
        </Button>
      </CardContent>
    </Card>
  );
}
