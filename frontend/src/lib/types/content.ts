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
