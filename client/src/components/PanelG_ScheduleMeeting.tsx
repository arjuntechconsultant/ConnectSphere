import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Person {
  id: number;
  name: string;
}

interface PanelGProps {
  selectedPerson: Person | null;
  onMeetingScheduled?: (meeting: any) => void;
}

export default function PanelG_ScheduleMeeting({
  selectedPerson,
  onMeetingScheduled,
}: PanelGProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    agenda: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPerson) {
      toast({
        title: "Error",
        description: "Please select a person first",
        variant: "destructive",
      });
      return;
    }

    const meeting = {
      ...formData,
      personId: selectedPerson.id,
      personName: selectedPerson.name,
    };

    console.log("Meeting scheduled:", meeting);
    onMeetingScheduled?.(meeting);
    
    toast({
      title: "Meeting Scheduled",
      description: `Meeting with ${selectedPerson.name} scheduled for ${formData.date} at ${formData.time}`,
    });

    setFormData({ date: "", time: "", location: "", agenda: "" });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle>Schedule Meeting</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {selectedPerson && (
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm font-medium">Meeting with:</p>
              <p className="text-sm text-muted-foreground">{selectedPerson.name}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
                data-testid="input-meeting-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
                data-testid="input-meeting-time"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Zoom, Office, Coffee shop..."
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              data-testid="input-meeting-location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agenda">Agenda</Label>
            <Textarea
              id="agenda"
              placeholder="Meeting agenda..."
              value={formData.agenda}
              onChange={(e) =>
                setFormData({ ...formData, agenda: e.target.value })
              }
              className="min-h-[80px]"
              data-testid="input-meeting-agenda"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!selectedPerson}
            data-testid="button-schedule-meeting"
          >
            Schedule Meeting
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
