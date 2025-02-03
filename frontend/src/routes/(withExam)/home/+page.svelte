<script lang="ts">
    import type { PageProps } from './$types'
    import { env } from '$env/dynamic/public'; // Import private environment variables
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	import { fetchFromApi } from '$lib/api';

	let { data }: PageProps = $props();


    let coverages: any[] = $state([]) 
    $effect(()=>{
        data.exams.forEach(async(coverage: any)=> {
            const API_URL = env.PUBLIC_API_URL+'api/subject/?coverage_id='+coverage.id; 
            try {
                const res = await fetch(
                    API_URL,
                    {
                        method:'get',
                    }
                );
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Failed to fetch exams: ${res.status} - ${errorText || res.statusText}`);
                }
                const subject = await res.json();
                console.log('ID: '+coverage.id,subject)
                coverages.push({
                    title:coverage.title,
                    subjects:subject.results,
                })
            } catch (error) {
                console.error('Error fetching exams:', error);
                throw error; 
            }
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