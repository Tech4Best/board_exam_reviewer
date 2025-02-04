<script lang="ts">
    import { env } from '$env/dynamic/public'; // Import private environment variables
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { fetchFromApi } from '$lib/api';

	let { data }= $props();
    let coverages: any[] = $state([]) 
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
</script>
<div>
    <p class="text-2xl">Home</p>
    <Button onclick={()=>{goto('exams/all/')}}>
        Start Exams
    </Button>
    <p class="text-2xl font-semibold">
        Subjects
    </p>
    {#each coverages as coverage}
        <p class="text-xl font-semibold">
            {coverage.title}
        </p>
            {#each coverage.subjects as subject}
                <p>{subject.title}</p> 
            {/each}
    {/each}
</div>