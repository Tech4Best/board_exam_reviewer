import { Question } from "@/types/types";

export const questionBank: Question[] = [
  {
    id: "1",
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
  {
    id: "2",
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
  {
    id: "3",
    text: "What is the primary purpose of a Pareto Chart in quality control?",
    choices: [
      { id: "a", text: "To show the trend of a process over time" },
      { id: "b", text: "To identify the vital few causes of problems" },
      { id: "c", text: "To determine the correlation between two variables" },
      { id: "d", text: "To display the distribution of data" },
    ],
    answer: "b",
    explanation: "A Pareto Chart is a type of chart that contains both bars and a line graph, where individual values are represented in descending order by bars, and the cumulative total is represented by the line. It is used to identify the most significant factors in a set of data.",
  },
]; 