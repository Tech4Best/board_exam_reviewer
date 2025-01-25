<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import CardContent from "$lib/components/ui/card/card-content.svelte";
	import CardHeader from "$lib/components/ui/card/card-header.svelte";
	import CardTitle from "$lib/components/ui/card/card-title.svelte";
	import Card from "$lib/components/ui/card/card.svelte";
    interface Result {
        question: Question;
        chosen_answer: Option;
        correct_answer: Option;
        is_correct: boolean;
    }

    
    interface RichText {
        
    }


interface LatexContent {
  type: 'latex';
  value: string; // The LaTeX string
}

interface ImageContent {
  type: 'image';
  src: string; // URL or base64 data
  alt?: string; // Alternative text
  width?: number;
  height?: number;
}

interface MarkdownContent {
  type: 'markdown';
  value: string; // The Markdown string
}

type RichTextContent = LatexContent | ImageContent | MarkdownContent ;

    interface RichText {
        children: RichTextContent[];
    }

    type Content = RichText | string;
    interface Question {
        id:string;
        content:RichText;
        options: Option[];
        answer: Option;
    }

    interface Option {
        id: string;
        content: Content;
    }
    const questions: Question[] = $state([
        {id: "1", content:"What is the Capital of Egypt", 
            options:[
                {id:"0001", content:"Cairo"},
                {id:"0002", content:"Venice"},
                {id:"0003", content:"Montaigne"},
                {id:"0004", content:"Charlemagne"},
            ],
            answer: {id:"0001", content:"Cairo"}
        },
        {id: "1", content:"What is the Capital of Egypt", 
            options:[
                {id:"0001", content:"Cairo"},
                {id:"0002", content:"Venice"},
                {id:"0003", content:"Montaigne"},
                {id:"0004", content:"Charlemagne"},
            ],
            answer: {id:"0001", content:"Cairo"}
        },
        {id: "2", content:"What is the Capital of Egypt", 
            options:[
                {id:"0001", content:"Cairo"},
                {id:"0002", content:"Venice"},
                {id:"0003", content:"Montaigne"},
                {id:"0004", content:"Charlemagne"},
            ],
            answer: {id:"0001", content:"Cairo"}
        },
        {id: "3", content:"What is the Capital of Egypt", 
            options:[
                {id:"0001", content:"Cairo"},
                {id:"0002", content:"Venice"},
                {id:"0003", content:"Montaigne"},
                {id:"0004", content:"Charlemagne"},
            ],
            answer: {id:"0001", content:"Cairo"}
        },
    ])
    let questionCounter: number = $state(1);
    let results: Result[] = $state([]);
    let showResults: boolean = $state(false);
    const nextQuestion = () => {
        if(questionCounter>= questions.length){
            showResults = true;
            return;
        }
        questionCounter+=1;
    }
    const verifyAnswer = (question:Question,answer:Option) =>{
        results.push({
            question:question,
            chosen_answer:answer,
            correct_answer:question.answer,
            is_correct:question.answer.id === answer.id,
        })
        if(question.answer.id === answer.id) {
            console.log("correct")
        }else {
            console.log("incorrect")
        }
        nextQuestion()
    }
</script>
<div class="mx-auto w-96">
    {#if !showResults}
        <h2>Question {questionCounter} / {questions.length}</h2>
        <Card>
            <CardTitle>Q: {questions[questionCounter-1].content}</CardTitle>
            <CardContent>
                {#each questions[questionCounter-1].options as option}
                    <Button onclick={()=>verifyAnswer(questions[questionCounter-1], option)}>
                        {option.content}
                    </Button>
                    <br />
                {/each}
            </CardContent>
        </Card>
        <br />
        
    {:else}
        <h2>Results</h2>
        <br />
        {#each results as result, index}
            <Card>
                <CardHeader>Question # {index +1}</CardHeader>  
                <CardContent>
                    <p>{result.question.content}</p>
                    <p>{result.is_correct? "Correct": "Incorrect"}</p>
                    <p>Your Answer: {result.chosen_answer.content}</p>
                    <p>Correct Answer: {result.correct_answer.content}</p>
                </CardContent>
            </Card> 
        {/each}
    {/if}
</div>