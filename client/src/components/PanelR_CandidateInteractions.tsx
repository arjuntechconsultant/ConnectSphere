import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CandidateInteraction {
  candidateId: number;
  date: string;
  type: string;
  content: string;
}

interface PanelRProps {
  interactions: CandidateInteraction[];
  selectedCandidateId?: number;
}

export default function PanelR_CandidateInteractions({
  interactions,
  selectedCandidateId,
}: PanelRProps) {
  const filteredInteractions = selectedCandidateId
    ? interactions.filter((i) => i.candidateId === selectedCandidateId)
    : interactions;

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "call":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "note":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "call":
        return "bg-chart-1";
      case "email":
        return "bg-chart-2";
      case "note":
        return "bg-chart-3";
      default:
        return "bg-muted";
    }
  };

  const getTypeVariant = (type: string): "default" | "secondary" | "outline" => {
    switch (type.toLowerCase()) {
      case "call":
        return "default";
      case "email":
        return "secondary";
      case "note":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Interactions</CardTitle>
        {selectedCandidateId && (
          <p className="text-sm text-muted-foreground">
            Showing interactions for Candidate ID: {selectedCandidateId}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="relative space-y-4">
            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />

            {filteredInteractions.map((interaction, idx) => (
              <div
                key={idx}
                className="relative pl-10 hover-elevate rounded-md p-2 cursor-pointer transition-all"
                data-testid={`interaction-${idx}`}
              >
                <div
                  className={`absolute left-0 top-2 h-8 w-8 rounded-full ${getTypeColor(
                    interaction.type
                  )} flex items-center justify-center text-primary-foreground`}
                >
                  {getIcon(interaction.type)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {interaction.date}
                    </Badge>
                    <Badge variant={getTypeVariant(interaction.type)} className="text-xs">
                      {interaction.type}
                    </Badge>
                  </div>
                  <p className="text-sm">{interaction.content}</p>
                </div>
              </div>
            ))}

            {filteredInteractions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No interactions recorded
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
