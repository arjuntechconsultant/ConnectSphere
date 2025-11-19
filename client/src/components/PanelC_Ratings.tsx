import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";

interface PanelCProps {
  onRatingsChange?: (ratings: Record<string, number>) => void;
}

export default function PanelC_Ratings({ onRatingsChange }: PanelCProps) {
  const [ratings, setRatings] = useState({
    influence: 4,
    responsiveness: 5,
    collaboration: 4,
    engagement: 5,
    knowledgeSharing: 4,
  });

  const ratingLabels = {
    influence: "Influence",
    responsiveness: "Responsiveness",
    collaboration: "Collaboration",
    engagement: "Engagement",
    knowledgeSharing: "Knowledge Sharing",
  };

  const handleRating = (category: string, value: number) => {
    const newRatings = { ...ratings, [category]: value };
    setRatings(newRatings);
    onRatingsChange?.(newRatings);
  };

  const overall =
    Object.values(ratings).reduce((sum, val) => sum + val, 0) /
    Object.values(ratings).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ratings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(ratingLabels).map(([key, label]) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium min-w-[140px]">{label}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(key, star)}
                  className="hover-elevate active-elevate-2 rounded transition-colors"
                  data-testid={`rating-${key}-${star}`}
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
            <span className="text-sm font-semibold">Overall Rating</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">
                {overall.toFixed(1)}
              </span>
              <Star className="h-6 w-6 fill-primary text-primary" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
