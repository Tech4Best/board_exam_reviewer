<script lang="ts">

    import type { PageProps } from './$types'
    import { env } from '$env/dynamic/public'; // Import private environment variables
	let { data }: PageProps = $props();
    const coverages = data
    console.log(data)
    let subjects: any = $state([]);

    $effect(()=>{
        coverages.exams.forEach(async(coverage: any)=> {
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

                subjects = [...subjects, ...subject.results]

                subject
            } catch (error) {
                console.error('Error fetching exams:', error);
                throw error; 
            }
        })
    })
</script>
<div>
    <p class="4xl font-semibold">
        Subjects
    </p>
    {#each subjects as subject}
        <p>{subject.title}</p> 
    {/each}
</div>