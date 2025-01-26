<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import CardContent from "$lib/components/ui/card/card-content.svelte";
	import CardHeader from "$lib/components/ui/card/card-header.svelte";
	import CardTitle from "$lib/components/ui/card/card-title.svelte";
	import Card from "$lib/components/ui/card/card.svelte";
    import type { Question, Result, Option, Content}  from "$lib/types/questions"
    import demoQuestions  from "$lib/demoQuestions";

    const questions = $state(demoQuestions)
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
            <CardTitle>Q: 
                {@render contentWriter(questions[questionCounter-1].content)}
            </CardTitle>
            <CardContent>
                {#each questions[questionCounter-1].options as option}
                    <Button onclick={()=>verifyAnswer(questions[questionCounter-1], option)}>
                        {@render contentWriter(option.content)}
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
                    {@render contentWriter(result.question.content)}
                    <p>{result.is_correct? "Correct": "Incorrect"}</p>
                    <p>Your Answer:</p>
                    {@render contentWriter(result.chosen_answer.content)}
                    <p>Correct Answer: </p>
                    {@render contentWriter(result.correct_answer.content)}
                </CardContent>
            </Card> 
        {/each}
    {/if}
</div>

{#snippet contentWriter(content: Content)}
    {#each content as children}
        {#if children.type == "latex"}
            <p>{children.value }</p>
        {:else if children.type == "image"}
            <img src={children.src} alt={children.alt}/>
        {:else} <!-- Markdown --> 
            <p> {children.value }</p>
        {/if}
    {/each}
{/snippet}