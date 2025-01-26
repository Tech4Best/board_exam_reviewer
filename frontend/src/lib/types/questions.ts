    export interface Result {
        question: Question;
        chosen_answer: Option;
        correct_answer: Option;
        is_correct: boolean;
    }
    export interface LatexContent {
        type: 'latex';
        value: string; // The LaTeX string
    }
    export interface ImageContent {
        type: 'image';
        src: string; // URL or base64 data
        alt?: string; // Alternative text
        width?: number;
        height?: number;
    }

    export interface MarkdownContent {
        type: 'markdown';
        value: string; // The Markdown string
    }

    export type RichTextContent = LatexContent | ImageContent | MarkdownContent ;

    export type Content = RichTextContent[];

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