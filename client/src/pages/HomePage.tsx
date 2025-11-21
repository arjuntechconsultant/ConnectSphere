import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PanelA_BubbleField from "@/components/PanelA_BubbleField";
import PanelA2_ThreeScene from "@/components/PanelA2_ThreeScene";
import PanelB_DetailsCard from "@/components/PanelB_DetailsCard";
import PanelC_Ratings from "@/components/PanelC_Ratings";
import PanelD_AIPrompt from "@/components/PanelD_AIPrompt";
import PanelE_VerticalTimeline from "@/components/PanelE_VerticalTimeline";
import PanelF_Charts from "@/components/PanelF_Charts";
import PanelG_ScheduleMeeting from "@/components/PanelG_ScheduleMeeting";
import PanelH_JobApplications from "@/components/PanelH_JobApplications";
import PanelI_Referrals from "@/components/PanelI_Referrals";
import PanelJ_PreRecordedInterviews from "@/components/PanelJ_PreRecordedInterviews";
import PanelK_Assessments from "@/components/PanelK_Assessments";
import PanelL_CodingQuestions from "@/components/PanelL_CodingQuestions";
import PanelM_JobOpenings from "@/components/PanelM_JobOpenings";
import PanelN_CandidateList from "@/components/PanelN_CandidateList";
import PanelO_InterviewCalendar from "@/components/PanelO_InterviewCalendar";
import PanelP_CandidateEvaluation from "@/components/PanelP_CandidateEvaluation";
import PanelQ_HRAnalytics from "@/components/PanelQ_HRAnalytics";
import PanelR_CandidateInteractions from "@/components/PanelR_CandidateInteractions";
import SearchPanel from "@/components/SearchPanel";
import NotificationsPanel from "@/components/NotificationsPanel";
import ThemeToggle from "@/components/ThemeToggle";
import {
  people,
  networkConnections,
  personDetails,
  timeline,
  jobApplications,
  referrals,
  interviews,
  assessments,
  codingExercises,
  jobOpenings,
  candidates,
  scheduledInterviews,
  candidateRatings,
  hrAnalytics,
  candidateInteractions,
} from "@/data/dummyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase } from "lucide-react";

export default function HomePage() {
  const [selectedPerson, setSelectedPerson] = useState<typeof people[0] | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<typeof candidates[0] | null>(null);

  const currentPersonDetails = selectedPerson
    ? personDetails[selectedPerson.id]
    : null;

  const currentCandidateRatings = selectedCandidate
    ? candidateRatings.find((r) => r.candidateId === selectedCandidate.candidateId)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground font-bold">
                N
              </div>
              <div>
                <h1 className="text-xl font-bold">NetConnect</h1>
                <p className="text-xs text-muted-foreground">
                  Professional Networking & HR Platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <SearchPanel />
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Network Size</p>
                    <p className="text-2xl font-bold text-primary">
                      {people.length}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="networking" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="networking" data-testid="tab-networking">
              <Users className="h-4 w-4 mr-2" />
              Networking & Career
            </TabsTrigger>
            <TabsTrigger value="hr" data-testid="tab-hr">
              <Briefcase className="h-4 w-4 mr-2" />
              HR & Recruiting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="networking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Visualization (react-three-fiber)</CardTitle>
              </CardHeader>
              <CardContent>
                <PanelA_BubbleField
                  people={people}
                  selectedPerson={selectedPerson}
                  setSelectedPerson={setSelectedPerson}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3D Network Visualization (Pure Three.js)</CardTitle>
              </CardHeader>
              <CardContent>
                <PanelA2_ThreeScene
                  people={people}
                  connections={networkConnections}
                  selectedPerson={selectedPerson}
                  setSelectedPerson={setSelectedPerson}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <PanelB_DetailsCard
                  selectedPerson={selectedPerson}
                  personDetails={currentPersonDetails}
                />
                <PanelE_VerticalTimeline timeline={timeline} />
                <PanelF_Charts stats={currentPersonDetails?.stats} />
              </div>
              <div className="space-y-6">
                <PanelC_Ratings />
                <PanelD_AIPrompt selectedPerson={selectedPerson} />
                <PanelG_ScheduleMeeting selectedPerson={selectedPerson} />
                <NotificationsPanel />
              </div>
            </div>

            <PanelH_JobApplications applications={jobApplications} />
            <PanelI_Referrals referrals={referrals} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PanelJ_PreRecordedInterviews interviews={interviews} />
              <div className="space-y-6">
                <PanelK_Assessments assessments={assessments} />
              </div>
            </div>

            <PanelL_CodingQuestions exercises={codingExercises} />
          </TabsContent>

          <TabsContent value="hr" className="space-y-6">
            <PanelM_JobOpenings jobOpenings={jobOpenings} />
            <PanelN_CandidateList
              candidates={candidates}
              onSelectCandidate={setSelectedCandidate}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PanelO_InterviewCalendar
                scheduledInterviews={scheduledInterviews}
                candidates={candidates}
              />
              <PanelP_CandidateEvaluation
                selectedCandidate={selectedCandidate}
                initialRatings={currentCandidateRatings?.ratings}
                initialFeedback={currentCandidateRatings?.feedback}
              />
            </div>

            <PanelQ_HRAnalytics analytics={hrAnalytics} />
            <PanelR_CandidateInteractions
              interactions={candidateInteractions}
              selectedCandidateId={selectedCandidate?.candidateId}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
