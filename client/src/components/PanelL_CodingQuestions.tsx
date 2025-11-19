import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Code } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CodingExercise {
  id: number;
  question: string;
  solution: string;
  result: string;
  difficulty: string;
}

interface PanelLProps {
  exercises: CodingExercise[];
}

export default function PanelL_CodingQuestions({ exercises }: PanelLProps) {
  const passedCount = exercises.filter((e) => e.result === "Passed").length;
  const passRate = ((passedCount / exercises.length) * 100).toFixed(0);

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "secondary";
      case "medium":
        return "default";
      case "hard":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              <CardTitle>Coding Challenges</CardTitle>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Pass Rate</p>
              <p className="text-xl font-bold text-primary">{passRate}%</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="p-4 border rounded-lg space-y-3 hover-elevate"
              data-testid={`coding-exercise-${exercise.id}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{exercise.question}</h4>
                    <Badge variant={getDifficultyVariant(exercise.difficulty)}>
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {exercise.result === "Passed" ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-chart-2" />
                        <span className="text-sm text-chart-2">Passed</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-destructive">Failed</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Solution:</p>
                <ScrollArea className="h-[60px]">
                  <code className="text-xs bg-muted p-2 rounded block font-mono">
                    {exercise.solution}
                  </code>
                </ScrollArea>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Performance Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Attempts</span>
              <span className="font-semibold">{exercises.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-chart-2">Passed</span>
              <span className="font-semibold text-chart-2">{passedCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-destructive">Failed</span>
              <span className="font-semibold text-destructive">
                {exercises.length - passedCount}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            <p className="text-sm font-medium">By Difficulty</p>
            {["Easy", "Medium", "Hard"].map((difficulty) => {
              const count = exercises.filter(
                (e) => e.difficulty === difficulty
              ).length;
              return (
                <div key={difficulty} className="flex justify-between text-sm">
                  <span>{difficulty}</span>
                  <span className="font-semibold">{count}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
