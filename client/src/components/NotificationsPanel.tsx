import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Coffee, Tag, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export default function NotificationsPanel() {
  const notifications: Notification[] = [
    {
      id: 1,
      type: "meeting",
      title: "Meeting Reminder",
      message: "Meeting with Arjun Singh in 30 minutes",
      time: "10 min ago",
      read: false,
    },
    {
      id: 2,
      type: "coffee",
      title: "Coffee Chat",
      message: "Upcoming coffee chat with Ava Davis tomorrow",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "tagged",
      title: "Tagged in Post",
      message: "Emma Johnson tagged you in a LinkedIn post",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "message",
      title: "New Message",
      message: "Liam Wong sent you a message",
      time: "3 hours ago",
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      case "coffee":
        return <Coffee className="h-4 w-4" />;
      case "tagged":
        return <Tag className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notifications</CardTitle>
          </div>
          {unreadCount > 0 && (
            <Badge variant="default">{unreadCount} new</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border hover-elevate cursor-pointer transition-all ${
                  !notification.read ? "bg-muted/50" : ""
                }`}
                data-testid={`notification-${notification.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
