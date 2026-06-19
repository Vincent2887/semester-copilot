export interface ExamNightPack {
  subjectName: string;
  confidenceScore: number;
  mustStudyQuestions: string[];
  shortNotes: Array<{ topic: string; bulletPoints: string[] }>;
  mcqs: Array<{ question: string; answer: string }>;
  vivaQuestions: string[];
}

// 🎯 Predictor Content Matrix for Subject Packs
export const subjectBlueprintsRegistry: Record<string, Record<string, ExamNightPack>> = {
  CSE: {
    dbms: {
      subjectName: "Database Management Systems",
      confidenceScore: 94,
      mustStudyQuestions: [
        "Explain 1NF, 2NF, 3NF, and BCNF Functional Dependencies with clear schema mappings.",
        "Draw a complete E-R Diagram for a University Registry System showing primary keys.",
        "What is ACID property? Explain Atomicity and Durability implementation checkpoints.",
        "Detail Conflict Serializability vs View Serializability tracking parameters.",
        "Compare B-Trees and B+ Trees indexing overhead performance inside storage blocks."
      ],
      shortNotes: [
        {
          topic: "ACID Properties Definition",
          bulletPoints: [
            "Atomicity: All operations execute flawlessly or everything rollbacks completely.",
            "Consistency: Database transforms explicitly from one valid transaction phase to another.",
            "Isolation: Concurrent execution states remain entirely independent across worker tasks.",
            "Durability: Committed updates persist dynamically inside physical arrays indefinitely."
          ]
        },
        {
          topic: "Two-Phase Locking (2PL Protocol)",
          bulletPoints: [
            "Growing Phase: Transaction locks assets sequentially; cannot release any existing locks.",
            "Shrinking Phase: Transaction releases acquired allocation constraints; cannot obtain new slots."
          ]
        }
      ],
      mcqs: [
        { question: "Which normal form handles transitive functional dependencies?", answer: "3NF" },
        { question: "What relational algebraic primitive extracts target tuple properties?", answer: "Projection (π)" }
      ],
      vivaQuestions: [
        "What is the core difference between a clustered and non-clustered database storage structure?",
        "How do databases prevent structural deadlocks using Wait-Die resource allocation schemas?"
      ]
    }
  }
};

// 📜 Official University Past Papers Resource Index Registry Map
export const pastYearPapersRegistry: Record<string, Record<string, Array<{ year: string; pdfUrl: string }>>> = {
  CSE: {
    dbms: [
      { year: "2024", pdfUrl: "#" },
      { year: "2023", pdfUrl: "#" }
    ],
    os: [
      { year: "2024", pdfUrl: "#" }
    ]
  },
  ECE: {},
  EEE: {},
  IT: {}
};
