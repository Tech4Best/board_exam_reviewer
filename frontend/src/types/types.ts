export type Choice = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  text: string;
  choices: Choice[];
  answer: string;
  explanation: string;
};

export type Exam = {
  id: string;
  questions: Question[];
}; 