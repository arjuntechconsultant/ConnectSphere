import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Person {
  id: number;
  name: string;
  avatar: string;
  title: string;
  tags: string[];
}

interface PersonDetails {
  bio: string;
  skills: string[];
  lists: string[];
  horizontalTimeline: { month: string; interaction: string }[];
  stats: { influence: number; referrals: number; interactions: number };
}

interface PanelBProps {
  selectedPerson: Person | null;
  personDetails: PersonDetails | null;
}

export default function PanelB_DetailsCard({
  selectedPerson,
  personDetails,
}: PanelBProps) {
  if (!selectedPerson || !personDetails) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Select a person from the bubble field to see details
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={selectedPerson.avatar} alt={selectedPerson.name} />
            <AvatarFallback>
              {selectedPerson.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-semibold" data-testid="text-person-name">
              {selectedPerson.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedPerson.title}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedPerson.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Bio</p>
          <p className="text-sm">{personDetails.bio}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {personDetails.skills.map((skill, idx) => (
              <Badge key={idx} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Recent Interactions</p>
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
              {personDetails.horizontalTimeline.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 p-2 bg-muted rounded-md min-w-[100px]"
                >
                  <p className="text-xs font-medium">{item.month}</p>
                  <p className="text-xs text-muted-foreground">{item.interaction}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {personDetails.stats.influence}
            </p>
            <p className="text-xs text-muted-foreground">Influence</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {personDetails.stats.referrals}
            </p>
            <p className="text-xs text-muted-foreground">Referrals</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {personDetails.stats.interactions}
            </p>
            <p className="text-xs text-muted-foreground">Interactions</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
