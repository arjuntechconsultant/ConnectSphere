import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Person {
  id: number;
  name: string;
  avatar: string;
  title: string;
}

interface PanelDProps {
  selectedPerson: Person | null;
}

export default function PanelD_AIPrompt({ selectedPerson }: PanelDProps) {
  const [prompt, setPrompt] = useState("");

  const suggestions = [
    "Draft a connection message",
    "Suggest topics for coffee chat",
    "Generate follow-up email",
    "Create referral request",
  ];

  const handleSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleSubmit = () => {
    console.log("AI Prompt submitted:", prompt);
    setPrompt("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>AI Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedPerson && (
          <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedPerson.avatar} alt={selectedPerson.name} />
              <AvatarFallback>
                {selectedPerson.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{selectedPerson.name}</p>
              <p className="text-xs text-muted-foreground">{selectedPerson.title}</p>
            </div>
          </div>
        )}

        <div>
          <p className="text-sm text-muted-foreground mb-2">Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover-elevate"
                onClick={() => handleSuggestion(suggestion)}
                data-testid={`suggestion-${suggestion.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Ask AI to help with networking tasks..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
            data-testid="input-ai-prompt"
          />
          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="w-full"
            data-testid="button-submit-prompt"
          >
            <Send className="h-4 w-4 mr-2" />
            Generate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
