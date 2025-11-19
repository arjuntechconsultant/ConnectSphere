import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface Person {
  id: number;
  name: string;
  avatar: string;
  title: string;
  tags: string[];
}

interface PanelAProps {
  people: Person[];
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person) => void;
}

export default function PanelA_BubbleField({
  people,
  selectedPerson,
  setSelectedPerson,
}: PanelAProps) {
  const getRandomPosition = (index: number) => {
    const baseX = (index % 5) * 18 + 10;
    const baseY = Math.floor(index / 5) * 30 + 15;
    return { x: baseX, y: baseY };
  };

  return (
    <div className="relative w-full h-[60vh] bg-card rounded-lg border border-card-border overflow-hidden">
      <TooltipProvider>
        {people.map((person, index) => {
          const pos = getRandomPosition(index);
          const isSelected = selectedPerson?.id === person.id;

          return (
            <Tooltip key={person.id}>
              <TooltipTrigger asChild>
                <motion.div
                  className="absolute cursor-pointer"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedPerson(person)}
                  data-testid={`bubble-${person.id}`}
                >
                  <div
                    className={`relative ${
                      isSelected
                        ? "ring-4 ring-primary rounded-full"
                        : ""
                    }`}
                  >
                    <Avatar className="h-16 w-16 shadow-lg border-2 border-background">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-semibold">{person.name}</p>
                  <p className="text-xs text-muted-foreground">{person.title}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {person.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}
