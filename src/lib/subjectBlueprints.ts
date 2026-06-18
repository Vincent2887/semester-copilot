export interface ExamNightPack {
  subjectName: string;
  confidenceScore: number;
  mustStudyQuestions: string[];
  shortNotes: { topic: string; bulletPoints: string[] }[];
  mcqs: { question: string; options: string[]; answer: string }[];
  vivaQuestions: string[];
}

export interface PastYearPaper {
  year: string;
  examType: string;
  pdfUrl: string;
}

// 1. Core Exam Night Pack Definitions
export const subjectBlueprintsRegistry: Record<string, Record<string, ExamNightPack>> = {
  "CSE": {
    "dbms": {
      subjectName: "Database Management Systems (DBMS)",
      confidenceScore: 85,
      mustStudyQuestions: [
        "Explain 1NF, 2NF, 3NF, and BCNF with real-world normalization examples.",
        "Differentiate between Primary Key, Foreign Key, and Candidate Key maps.",
        "Detail ACID properties and explain why Atomicity is critical during crashes.",
        "Explain Lock-Based Concurrency Control protocols and Deadlock Prevention.",
        "Illustrate SQL Joins with syntax (Inner, Left, Right, Full Outer structures)."
      ],
      shortNotes: [
        {
          topic: "Normalization Framework",
          bulletPoints: [
            "The process of organizing data to minimize redundancy and dependency.",
            "Eliminates database insertion, update, and deletion anomalies.",
            "BCNF is stronger than 3NF and handles overlapping candidate keys."
          ]
        }
      ],
      mcqs: [{ question: "Which normal form explicitly removes partial dependency?", options: ["A. 1NF", "B. 2NF", "C. 3NF", "D. BCNF"], answer: "B. 2NF" }],
      vivaQuestions: ["What is the difference between a clustered and non-clustered index?"]
    }
  }
};

// 2. Separate Static Registry for Past Year University Papers 
export const pastYearPapersRegistry: Record<string, Record<string, PastYearPaper[]>> = {
  "CSE": {
    "dbms": [
      { year: "2025", examType: "Regular End-Semester", pdfUrl: "#" },
      { year: "2024", examType: "Supplementary Exam", pdfUrl: "#" }
    ]
  },
  "ECE": {},
  "EEE": {},
  "IT": {}
};