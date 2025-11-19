import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Video, Coffee, Tag } from "lucide-react";

interface TimelineItem {
  month: string;
  type: string;
  content: string;
}

interface PanelEProps {
  timeline: TimelineItem[];
}

export default function PanelE_VerticalTimeline({ timeline }: PanelEProps) {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "meeting":
        return <Video className="h-4 w-4" />;
      case "coffee chat":
        return <Coffee className="h-4 w-4" />;
      case "tagged post":
        return <Tag className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "message":
        return "bg-chart-1";
      case "meeting":
        return "bg-chart-2";
      case "coffee chat":
        return "bg-chart-3";
      case "tagged post":
        return "bg-chart-4";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interaction Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />
          
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className="relative pl-10 hover-elevate rounded-md p-2 cursor-pointer transition-all"
              data-testid={`timeline-item-${idx}`}
            >
              <div
                className={`absolute left-0 top-2 h-8 w-8 rounded-full ${getTypeColor(
                  item.type
                )} flex items-center justify-center text-primary-foreground`}
              >
                {getIcon(item.type)}
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {item.month}
                  </Badge>
                  <span className="text-sm font-medium">{item.type}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
