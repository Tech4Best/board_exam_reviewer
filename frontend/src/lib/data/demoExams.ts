export interface Course {
    id:string,
    title:string,
    Subjects: Subject[],
}

export const courseList = [
    {
        id:"CIE",
        title:"Certified Industrial Engineer Exam"
    },
    {
        id:"ME",
        title:"Mechanical Engineering Board Exam"
    },
    {
        id:"LAW",
        title:"Law Board Exams"
    },
    {
        id:"LET",
        title:"LET Board exams"
    },
]