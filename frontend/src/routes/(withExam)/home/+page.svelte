<script lang="ts">
    import { env } from '$env/dynamic/public'; // Import private environment variables
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { fetchFromApi } from '$lib/api';
	import Header from '$lib/components/custom/Header.svelte';

	let { data }= $props();
    let coverages: any[] = $state([]) 

    const startExams = () => {
        goto('/exams/all');
    }
    $effect(()=>{
        data.coverage.forEach(async(coverage: any)=> {
            const API_URL = env.PUBLIC_API_URL+'api/subject/?coverage_id='+coverage.id; 
            const results = await fetchFromApi(API_URL)
            coverages.push({
                title:coverage.title,
                subjects:results.results,
            })
        })
    })

    import { buttonVariants } from '$lib/components/ui/button/button.svelte';
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
</script>

<div>
    <div class="mx-10 mt-10">
        <Header title="Home" backURL={null}>
            <Dialog.Root>
                    <Dialog.Trigger class={buttonVariants({ variant: "default" })}
                        >Start Exams </Dialog.Trigger
                    >
                <Dialog.Content class="sm:max-w-[425px]">
                    <Dialog.Header>
                        <Dialog.Title>Exam Setup</Dialog.Title>
                        <Dialog.Description>
                            Let us know your preferred Exam Setup
                        </Dialog.Description>
                    </Dialog.Header>
                    <div class="flex flex-col">
                        <div class="flex flex-col">
                            <div class="text-sm">
                                <Label for="time_limit" class="text-right">Time limit</Label>
                                <br />
                                <Input id="time_limit" type="number" />
                            </div>
                            <div class="">
                                <input id="time_limit_all" type="radio"/>
                                <label for="time_limit_all" class="text-right">No Time Limit</label>
                            </div>
                        </div>
                    </div>
                    <Dialog.Footer>
                    <Button type="submit" onclick={()=> startExams()}>Save changes</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </Header>
    </div>
</div>