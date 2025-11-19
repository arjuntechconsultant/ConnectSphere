export const people = [
  { id: 1, name: "Arjun Singh", avatar: "https://i.pravatar.cc/150?img=1", title: "Product Manager", tags: ["Mentor", "Referral"] },
  { id: 2, name: "Mia Patel", avatar: "https://i.pravatar.cc/150?img=2", title: "Software Engineer", tags: ["Peer"] },
  { id: 3, name: "Liam Wong", avatar: "https://i.pravatar.cc/150?img=3", title: "Data Analyst", tags: ["Referral", "Connector"] },
  { id: 4, name: "Emma Johnson", avatar: "https://i.pravatar.cc/150?img=4", title: "UX Designer", tags: ["Mentor"] },
  { id: 5, name: "Noah Lee", avatar: "https://i.pravatar.cc/150?img=5", title: "Backend Engineer", tags: ["Peer"] },
  { id: 6, name: "Olivia Smith", avatar: "https://i.pravatar.cc/150?img=6", title: "HR Specialist", tags: ["Mentor"] },
  { id: 7, name: "Ethan Brown", avatar: "https://i.pravatar.cc/150?img=7", title: "Marketing Analyst", tags: ["Peer"] },
  { id: 8, name: "Ava Davis", avatar: "https://i.pravatar.cc/150?img=8", title: "Product Designer", tags: ["Mentor", "Connector"] },
  { id: 9, name: "William Garcia", avatar: "https://i.pravatar.cc/150?img=9", title: "Data Scientist", tags: ["Peer", "Referral"] },
  { id: 10, name: "Sophia Martinez", avatar: "https://i.pravatar.cc/150?img=10", title: "Software Intern", tags: ["Peer"] }
];

export const personDetails: Record<number, {
  bio: string;
  skills: string[];
  lists: string[];
  horizontalTimeline: { month: string; interaction: string }[];
  stats: { influence: number; referrals: number; interactions: number };
  coffeeChats: string[];
}> = {
  1: {
    bio: "Product Manager with 5 years experience in fintech",
    skills: ["Product Strategy", "Roadmap", "Analytics"],
    lists: ["Mentor", "Referral"],
    horizontalTimeline: [
      { month: "Jan", interaction: "Message" },
      { month: "Feb", interaction: "Coffee Chat" },
      { month: "Mar", interaction: "Meeting" },
      { month: "Apr", interaction: "Tagged" }
    ],
    stats: { influence: 4.5, referrals: 3, interactions: 12 },
    coffeeChats: ["2025-11-05", "2025-11-10"]
  },
  2: {
    bio: "Full-stack engineer specializing in React and Node.js",
    skills: ["React", "Node.js", "TypeScript"],
    lists: ["Peer"],
    horizontalTimeline: [
      { month: "Jan", interaction: "Connection" },
      { month: "Mar", interaction: "Message" }
    ],
    stats: { influence: 3.8, referrals: 1, interactions: 5 },
    coffeeChats: ["2025-10-15"]
  },
  3: {
    bio: "Data analyst with expertise in Python and SQL",
    skills: ["Python", "SQL", "Tableau"],
    lists: ["Referral", "Connector"],
    horizontalTimeline: [
      { month: "Feb", interaction: "Coffee Chat" },
      { month: "Apr", interaction: "Referral" }
    ],
    stats: { influence: 4.2, referrals: 5, interactions: 8 },
    coffeeChats: ["2025-11-01"]
  },
  4: {
    bio: "UX Designer passionate about creating intuitive interfaces",
    skills: ["Figma", "User Research", "Prototyping"],
    lists: ["Mentor"],
    horizontalTimeline: [
      { month: "Jan", interaction: "Meeting" },
      { month: "Mar", interaction: "Coffee Chat" }
    ],
    stats: { influence: 4.0, referrals: 2, interactions: 7 },
    coffeeChats: ["2025-10-20", "2025-11-08"]
  },
  5: {
    bio: "Backend engineer with focus on scalable systems",
    skills: ["Go", "Docker", "Kubernetes"],
    lists: ["Peer"],
    horizontalTimeline: [
      { month: "Feb", interaction: "Message" }
    ],
    stats: { influence: 3.5, referrals: 1, interactions: 3 },
    coffeeChats: []
  },
  6: {
    bio: "HR Specialist focused on talent acquisition and development",
    skills: ["Recruiting", "Employee Relations", "Training"],
    lists: ["Mentor"],
    horizontalTimeline: [
      { month: "Jan", interaction: "Coffee Chat" },
      { month: "Feb", interaction: "Meeting" },
      { month: "Mar", interaction: "Referral" }
    ],
    stats: { influence: 4.7, referrals: 8, interactions: 15 },
    coffeeChats: ["2025-10-25", "2025-11-12"]
  },
  7: {
    bio: "Marketing analyst with data-driven approach",
    skills: ["Google Analytics", "SEO", "Content Strategy"],
    lists: ["Peer"],
    horizontalTimeline: [
      { month: "Mar", interaction: "Connection" }
    ],
    stats: { influence: 3.2, referrals: 0, interactions: 2 },
    coffeeChats: []
  },
  8: {
    bio: "Product designer creating delightful user experiences",
    skills: ["UI Design", "Design Systems", "Animation"],
    lists: ["Mentor", "Connector"],
    horizontalTimeline: [
      { month: "Jan", interaction: "Message" },
      { month: "Feb", interaction: "Coffee Chat" },
      { month: "Apr", interaction: "Tagged" }
    ],
    stats: { influence: 4.3, referrals: 4, interactions: 10 },
    coffeeChats: ["2025-11-03", "2025-11-15"]
  },
  9: {
    bio: "Data scientist specializing in machine learning",
    skills: ["Python", "TensorFlow", "Statistics"],
    lists: ["Peer", "Referral"],
    horizontalTimeline: [
      { month: "Feb", interaction: "Meeting" },
      { month: "Mar", interaction: "Referral" }
    ],
    stats: { influence: 4.1, referrals: 3, interactions: 6 },
    coffeeChats: ["2025-10-30"]
  },
  10: {
    bio: "Software intern learning web development",
    skills: ["JavaScript", "HTML", "CSS"],
    lists: ["Peer"],
    horizontalTimeline: [
      { month: "Apr", interaction: "Connection" }
    ],
    stats: { influence: 2.8, referrals: 0, interactions: 1 },
    coffeeChats: []
  }
};

export const timeline = [
  { month: "Jan", type: "Message", content: "Discussed product roadmap" },
  { month: "Feb", type: "Meeting", content: "Quarterly strategy meeting" },
  { month: "Mar", type: "Coffee Chat", content: "Casual networking" },
  { month: "Apr", type: "Tagged Post", content: "LinkedIn AI post" },
  { month: "May", type: "Message", content: "Follow-up on proposal" }
];

export const jobApplications = [
  { id: 1, jobTitle: "Software Engineer", company: "TechCorp", ATSStatus: "Interview Scheduled", interviewCall: true },
  { id: 2, jobTitle: "Data Analyst", company: "DataSolutions", ATSStatus: "Rejected", interviewCall: false },
  { id: 3, jobTitle: "Product Manager", company: "StartupXYZ", ATSStatus: "In Progress", interviewCall: false },
  { id: 4, jobTitle: "UX Designer", company: "DesignHub", ATSStatus: "Accepted", interviewCall: true },
  { id: 5, jobTitle: "Backend Developer", company: "CloudBase", ATSStatus: "In Progress", interviewCall: false }
];

export const referrals = [
  { id: 1, personReferred: "Mia Patel", jobTitle: "Backend Dev", convertedToInterview: true, status: "Offer Extended" },
  { id: 2, personReferred: "Liam Wong", jobTitle: "UX Designer", convertedToInterview: false, status: "Rejected" },
  { id: 3, personReferred: "Noah Lee", jobTitle: "Software Engineer", convertedToInterview: true, status: "Interview" }
];

export const interviews = [
  { id: 1, question: "Tell me about a difficult problem", answerVideo: "https://video-url.com/1", score: 8, answer: "I faced a scaling challenge..." },
  { id: 2, question: "Experience with React", answerVideo: "https://video-url.com/2", score: 9, answer: "I've been working with React for 3 years..." },
  { id: 3, question: "Describe your leadership style", answerVideo: "https://video-url.com/3", score: 7, answer: "I believe in empowering team members..." }
];

export const assessments = [
  { id: 1, name: "JS Basics", score: 85, date: "2025-10-15", type: "MCQ" },
  { id: 2, name: "React Coding Challenge", score: 90, date: "2025-11-05", type: "Coding" },
  { id: 3, name: "System Design", score: 78, date: "2025-10-20", type: "Written" },
  { id: 4, name: "Algorithms & Data Structures", score: 92, date: "2025-11-10", type: "Coding" }
];

export const codingExercises = [
  { id: 1, question: "Reverse a linked list", solution: "function reverseList(head) {...}", result: "Passed", difficulty: "Medium" },
  { id: 2, question: "Queue using stacks", solution: "class Queue {...}", result: "Passed", difficulty: "Easy" },
  { id: 3, question: "Binary tree traversal", solution: "function inorderTraversal(root) {...}", result: "Failed", difficulty: "Hard" }
];

export const jobOpenings = [
  { jobId: 1, title: "Software Engineer", department: "Engineering", applications: 50, inProgress: 20, rejected: 15, interviewScheduled: 10, offersGiven: 5 },
  { jobId: 2, title: "Data Analyst", department: "Analytics", applications: 30, inProgress: 12, rejected: 8, interviewScheduled: 7, offersGiven: 3 },
  { jobId: 3, title: "Product Manager", department: "Product", applications: 40, inProgress: 15, rejected: 10, interviewScheduled: 12, offersGiven: 3 }
];

export const candidates = [
  { candidateId: 101, name: "Mia Patel", avatar: "https://i.pravatar.cc/150?img=5", appliedJob: "Software Engineer", status: "Interview Scheduled", ratings: { technical: 4, communication: 5, culturalFit: 4 }, overallScore: 4.3 },
  { candidateId: 102, name: "Liam Wong", avatar: "https://i.pravatar.cc/150?img=6", appliedJob: "Data Analyst", status: "In Progress", ratings: { technical: 3, communication: 4, culturalFit: 3 }, overallScore: 3.3 },
  { candidateId: 103, name: "Emma Johnson", avatar: "https://i.pravatar.cc/150?img=7", appliedJob: "Software Engineer", status: "Offer Extended", ratings: { technical: 5, communication: 5, culturalFit: 5 }, overallScore: 5.0 },
  { candidateId: 104, name: "Noah Lee", avatar: "https://i.pravatar.cc/150?img=8", appliedJob: "Product Manager", status: "Rejected", ratings: { technical: 2, communication: 3, culturalFit: 2 }, overallScore: 2.3 }
];

export const scheduledInterviews = [
  { candidateId: 101, jobId: 1, date: "2025-12-01", time: "10:00 AM", mode: "Zoom", interviewer: "Arjun Singh" },
  { candidateId: 103, jobId: 1, date: "2025-12-02", time: "2:00 PM", mode: "In-person", interviewer: "Ava Davis" },
  { candidateId: 102, jobId: 2, date: "2025-12-03", time: "11:00 AM", mode: "Zoom", interviewer: "William Garcia" }
];

export const candidateRatings = [
  { candidateId: 101, ratings: { technical: 4, communication: 5, culturalFit: 4 }, overallScore: 4.3, feedback: "Strong technical skills, good fit, recommended for offer" },
  { candidateId: 102, ratings: { technical: 3, communication: 4, culturalFit: 3 }, overallScore: 3.3, feedback: "Decent skills, needs more experience" },
  { candidateId: 103, ratings: { technical: 5, communication: 5, culturalFit: 5 }, overallScore: 5.0, feedback: "Exceptional candidate, immediate hire" },
  { candidateId: 104, ratings: { technical: 2, communication: 3, culturalFit: 2 }, overallScore: 2.3, feedback: "Not a good fit for the role" }
];

export const hrAnalytics = [
  { jobTitle: "Software Engineer", totalApplications: 50, interviewsScheduled: 10, offersGiven: 5, avgScore: 4.2 },
  { jobTitle: "Data Analyst", totalApplications: 30, interviewsScheduled: 8, offersGiven: 3, avgScore: 3.9 },
  { jobTitle: "Product Manager", totalApplications: 40, interviewsScheduled: 12, offersGiven: 3, avgScore: 3.7 }
];

export const candidateInteractions = [
  { candidateId: 101, date: "2025-11-05", type: "call", content: "Initial screening - discussed background and motivation" },
  { candidateId: 101, date: "2025-11-07", type: "email", content: "Sent coding challenge link" },
  { candidateId: 101, date: "2025-11-10", type: "note", content: "Recommended for interview - strong coding skills" },
  { candidateId: 102, date: "2025-11-06", type: "call", content: "Phone screening - good communication" },
  { candidateId: 102, date: "2025-11-08", type: "note", content: "Waiting for technical assessment results" },
  { candidateId: 103, date: "2025-11-01", type: "email", content: "Application received" },
  { candidateId: 103, date: "2025-11-03", type: "call", content: "First round interview - excellent performance" },
  { candidateId: 103, date: "2025-11-05", type: "note", content: "Team consensus: extend offer" }
];
