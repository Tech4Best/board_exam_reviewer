import { Question } from "@/types/types";

export type Subject = {
  id: string;
  name: string;
  questions: Question[];
};

export type Exam = {
  id: string;
  name: string;
  subjects: Subject[];
};

export const exams: Exam[] = [
  {
    id: "bar",
    name: "BAR Exam",
    subjects: [
      {
        id: "political-law",
        name: "Political Law",
        questions: [
          {
            id: "bar-pol-1",
            text: "What is the supreme law of the Philippines?",
            choices: [
              { id: "a", text: "Civil Code" },
              { id: "b", text: "Constitution" },
              { id: "c", text: "Penal Code" },
              { id: "d", text: "Family Code" },
            ],
            answer: "b",
            explanation: "The Constitution is the supreme law of the land.",
          },
          {
            id: "bar-pol-2",
            text: "Who has the power of judicial review?",
            choices: [
              { id: "a", text: "Supreme Court" },
              { id: "b", text: "Congress" },
              { id: "c", text: "President" },
              { id: "d", text: "Senate" },
            ],
            answer: "a",
            explanation: "The Supreme Court has the power of judicial review.",
          },
        ],
      },
      {
        id: "civil-law",
        name: "Civil Law",
        questions: [
          {
            id: "bar-civ-1",
            text: "What is the minimum age for marriage in the Philippines?",
            choices: [
              { id: "a", text: "18" },
              { id: "b", text: "21" },
              { id: "c", text: "25" },
              { id: "d", text: "16" },
            ],
            answer: "a",
            explanation: "The minimum age for marriage is 18 years old.",
          },
        ],
      },
    ],
  },
  {
    id: "cie",
    name: "CIE Exam",
    subjects: [
      {
        id: "lean-manufacturing",
        name: "Lean Manufacturing",
        questions: [
          {
            id: "cie-lean-1",
            text: "Which of the following is a key principle of Lean Manufacturing?",
            choices: [
              { id: "a", text: "Maximizing inventory to meet demand" },
              { id: "b", text: "Eliminating waste in all forms" },
              { id: "c", text: "Increasing production batch sizes" },
              { id: "d", text: "Focusing on individual worker efficiency over system flow" },
            ],
            answer: "b",
            explanation: "Lean Manufacturing focuses on the elimination of 'muda' or waste in all its forms to improve efficiency and value.",
          },
        ],
      },
      {
        id: "project-management",
        name: "Project Management",
        questions: [
          {
            id: "cie-pm-1",
            text: "In project management, what does PERT stand for?",
            choices: [
              { id: "a", text: "Project Evaluation and Resource Tracking" },
              { id: "b", text: "Program Evaluation and Review Technique" },
              { id: "c", text: "Process Efficiency and Resource Technology" },
              { id: "d", text: "Project Execution and Reporting Tool" },
            ],
            answer: "b",
            explanation: "PERT (Program Evaluation and Review Technique) is a statistical tool used in project management to analyze and represent the tasks involved in completing a given project.",
          },
        ],
      },
    ],
  },
]; 