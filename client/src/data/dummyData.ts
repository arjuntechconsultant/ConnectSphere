const firstNames = ["Arjun", "Mia", "Liam", "Emma", "Noah", "Olivia", "Ethan", "Ava", "William", "Sophia", "James", "Charlotte", "Benjamin", "Amelia", "Lucas", "Harper", "Mason", "Evelyn", "Logan", "Abigail", "Alexander", "Emily", "Michael", "Elizabeth", "Elijah", "Mila", "Daniel", "Ella", "Matthew", "Avery", "Jacob", "Scarlett", "Jackson", "Victoria", "David", "Madison", "Joseph", "Chloe", "Samuel", "Penelope", "Henry", "Riley", "Albert", "Grace", "George", "Nora", "Frank", "Lily", "Edward", "Eleanor", "Thomas", "Zoey", "Arthur", "Hannah", "Stephen", "Lillian", "Paul", "Addison", "Lawrence", "Aubrey", "Ethan", "Brooklyn", "Joseph", "Bailey", "Samuel", "Clara", "Martin", "Paisley", "George", "Natalie", "Francis", "Camila", "Charles", "Samantha", "Richard", "Alexis", "Donald", "Ariana", "Kenneth", "Margaret", "Steven", "Sophia", "Brian", "Isabella", "Edward", "Emma", "Ronald", "Olivia", "Anthony", "Ava"];
const lastNames = ["Singh", "Patel", "Wong", "Johnson", "Lee", "Smith", "Brown", "Davis", "Garcia", "Martinez", "Williams", "Jones", "Miller", "Taylor", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Harris", "Thompson", "White", "Clark", "Lewis", "Walker", "Hall", "Young", "King", "Scott", "Green", "Adams", "Nelson", "Carter", "Roberts", "Edwards", "Collins", "Stewart", "Morris", "Rogers", "Morgan", "Peterson", "Cooper", "Reed", "Bell", "Howard", "Cox", "Richardson", "Wood", "Watson", "Brooks", "Gordon", "Hunt", "Hicks"];
const titles = ["Product Manager", "Software Engineer", "Data Analyst", "UX Designer", "Backend Engineer", "HR Specialist", "Marketing Analyst", "Product Designer", "Data Scientist", "Software Intern", "Frontend Developer", "DevOps Engineer", "QA Engineer", "Business Analyst", "Solutions Architect", "Cloud Engineer", "Machine Learning Engineer", "Security Engineer", "System Administrator", "Network Engineer", "Graphic Designer", "Content Strategist", "SEO Specialist", "Social Media Manager", "Brand Manager", "Sales Executive", "Account Manager", "Customer Success Manager", "Technical Writer", "Finance Analyst"];
const tags = ["Mentor", "Peer", "Referral", "Connector", "Colleague", "Friend"];

const generatePeople = () => {
  const peopleArray = [];
  for (let i = 1; i <= 300; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const title = titles[i % titles.length];
    const tag1 = tags[i % tags.length];
    const tag2 = tags[(i + 1) % tags.length];
    const personTags = Math.random() > 0.5 ? [tag1] : [tag1, tag2];
    
    peopleArray.push({
      id: i,
      name: `${firstName} ${lastName}`,
      avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
      title: title,
      tags: personTags
    });
  }
  return peopleArray;
};

export const people = generatePeople();

const generateConnections = () => {
  const connections: [number, number][] = [];
  for (let i = 1; i <= 300; i++) {
    const connectionCount = Math.floor(Math.random() * 4) + 1;
    for (let j = 0; j < connectionCount; j++) {
      const target = Math.floor(Math.random() * 300) + 1;
      if (target !== i && !connections.some(([a, b]) => (a === i && b === target) || (a === target && b === i))) {
        connections.push([i, target]);
      }
    }
  }
  return connections;
};

export const networkConnections = generateConnections();

const skillsByTitle: Record<string, string[]> = {
  "Product Manager": ["Product Strategy", "Roadmap", "Analytics", "Market Research"],
  "Software Engineer": ["JavaScript", "React", "Node.js", "TypeScript", "Python"],
  "Data Analyst": ["Python", "SQL", "Tableau", "Analytics", "Excel"],
  "UX Designer": ["Figma", "User Research", "Prototyping", "Design Systems"],
  "Backend Engineer": ["Go", "Docker", "Kubernetes", "APIs", "Databases"],
  "HR Specialist": ["Recruiting", "Employee Relations", "Training", "Negotiations"],
  "Marketing Analyst": ["Google Analytics", "SEO", "Content Strategy", "Marketing"],
  "Product Designer": ["UI Design", "Design Systems", "Animation", "Prototyping"],
  "Data Scientist": ["Python", "TensorFlow", "Statistics", "Machine Learning"],
  "Software Intern": ["JavaScript", "HTML", "CSS", "Git", "Agile"],
  "Frontend Developer": ["React", "Vue", "CSS", "JavaScript", "TypeScript"],
  "DevOps Engineer": ["Docker", "Kubernetes", "CI/CD", "AWS", "Linux"],
  "QA Engineer": ["Testing", "Automation", "Selenium", "JIRA", "Documentation"],
  "Business Analyst": ["Requirements", "Documentation", "SQL", "Excel", "JIRA"],
  "Solutions Architect": ["System Design", "Cloud", "APIs", "Databases", "Security"],
  "Cloud Engineer": ["AWS", "Azure", "GCP", "Kubernetes", "Infrastructure"],
  "Machine Learning Engineer": ["TensorFlow", "PyTorch", "Python", "Statistics", "NLP"],
  "Security Engineer": ["Network Security", "Cryptography", "Penetration Testing", "Security"],
  "System Administrator": ["Linux", "Windows Server", "Networking", "Database Admin"],
  "Network Engineer": ["Networking", "Cisco", "Firewalls", "Routing", "Security"],
  "Graphic Designer": ["Photoshop", "Illustrator", "Design", "Branding", "Visual Design"],
  "Content Strategist": ["Content", "SEO", "Writing", "Marketing", "Analytics"],
  "SEO Specialist": ["SEO", "Analytics", "Content", "Link Building", "Keyword Research"],
  "Social Media Manager": ["Social Media", "Content", "Marketing", "Analytics", "Engagement"],
  "Brand Manager": ["Branding", "Marketing", "Strategy", "Design", "Communications"],
  "Sales Executive": ["Sales", "Negotiation", "CRM", "Business Development", "Pitching"],
  "Account Manager": ["Account Management", "Client Relations", "CRM", "Sales", "Negotiation"],
  "Customer Success Manager": ["Customer Relations", "Support", "Training", "Documentation", "CRM"],
  "Technical Writer": ["Writing", "Documentation", "Tools", "Clear Communication", "Markdown"],
  "Finance Analyst": ["Finance", "Excel", "Analysis", "Reporting", "Budgeting"]
};

const generatePersonDetails = () => {
  const detailsRecord: Record<number, {
    bio: string;
    skills: string[];
    lists: string[];
    horizontalTimeline: { month: string; interaction: string }[];
    stats: { influence: number; referrals: number; interactions: number };
    coffeeChats: string[];
  }> = {};

  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  const interactions = ["Message", "Meeting", "Coffee Chat", "Referral", "Connection", "Tagged"];

  for (let i = 1; i <= 300; i++) {
    const person = people[i - 1];
    const titleSkills = skillsByTitle[person.title] || ["Problem Solving", "Communication", "Teamwork"];
    const influence = 2.5 + Math.random() * 2.5;
    const referrals = Math.floor(Math.random() * 10);
    const interactionCount = Math.floor(Math.random() * 15) + 3;
    const timelineLength = Math.floor(Math.random() * 4) + 2;
    const selectedMonths = months.sort(() => Math.random() - 0.5).slice(0, timelineLength);

    const timeline = selectedMonths.map(month => ({
      month,
      interaction: interactions[Math.floor(Math.random() * interactions.length)]
    }));

    const coffeeCount = Math.floor(Math.random() * 3);
    const coffeeChats = [];
    for (let j = 0; j < coffeeCount; j++) {
      const day = Math.floor(Math.random() * 28) + 1;
      coffeeChats.push(`2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    }

    detailsRecord[i] = {
      bio: `${person.title} with expertise in ${titleSkills.slice(0, 2).join(" and ")}. Passionate about ${person.tags[0]?.toLowerCase() || "professional growth"} and creating impact.`,
      skills: titleSkills,
      lists: person.tags,
      horizontalTimeline: timeline,
      stats: {
        influence: Math.round(influence * 10) / 10,
        referrals,
        interactions: interactionCount
      },
      coffeeChats
    };
  }

  return detailsRecord;
};

export const personDetails = generatePersonDetails();

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
