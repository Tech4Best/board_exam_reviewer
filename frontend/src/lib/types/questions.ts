   import type {Content} from '$lib/types/content' 

    export interface Result {
        question: Question;
        chosen_answer: Option;
        correct_answer: Option;
        is_correct: boolean;
    }
    export interface Question {
        id:string;
        content: Content;
        options: Option[];
        answer: Option;
    }
    export interface Option {
        id: string;
        content: Content;
    }