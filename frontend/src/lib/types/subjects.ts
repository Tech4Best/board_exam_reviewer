import type { Question } from "./questions";

export default interface Subject {
    name: string,
    questions: Question[],


}