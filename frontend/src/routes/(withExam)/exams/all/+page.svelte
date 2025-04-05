<script lang="ts">
    import { env } from '$env/dynamic/public'; // Import private environment variables
	import { fetchFromApi } from '$lib/api/index.js';
    import { initDB,localDatabase } from '$lib/localstorage/index.svelte.js';
	let { data } = $props();
    const coverages: any[] = data.coverages
    console.log(coverages)
    const questions: any[] = $derived.by(()=>{
        let questionList: any[] = []
        coverages.forEach(async(coverage:any)=>{
            const SUBJECT_API_URL = env.PUBLIC_API_URL+'api/subject/?coverage_id='+coverage.id; 
            const subjectQuery = await fetchFromApi(SUBJECT_API_URL)
            subjectQuery.results.forEach(async(subject:any) => {
                const API_URL = env.PUBLIC_API_URL+'api/question/?subject_id='+subject.id; 
                console.log('API URL', API_URL)
                const questionQuery = await fetchFromApi(API_URL)
                questionQuery.results.forEach(async(question:any) => {
                    questionList.push(question)
                })
                console.log('QUESTIONS', questionQuery)
            });
        })
        return questionList
    })
    $effect(()=>{console.log(questions)})
</script>