import type { Question } from "./questions";

export default interface Subject {
    name: string,
    questions: Question[],
}

export interface Exam {
    id:string,
    title:string,
    Subjects?: Subject[],
}
