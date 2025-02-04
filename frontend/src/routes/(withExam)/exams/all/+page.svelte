<script lang="ts">
    import { env } from '$env/dynamic/public'; // Import private environment variables
	import { fetchFromApi } from '$lib/api/index.js';
	let { data } = $props();
    const coverages = data.coverages

    const questions = coverages.map(async(coverage:any)=>{
        const API_URL = env.PUBLIC_API_URL+'api/subject/?coverage_id='+coverage.id; 
        const subjects = await fetchFromApi(API_URL)

        console.log('SUBJECTS',subjects)
        const questionList = []
        
        subjects.results.forEach(async(subject:any) => {
            const API_URL = env.PUBLIC_API_URL+'api/question/?subject_id='+subject.id; 
            console.log('API URL', API_URL)
            const questionQuery = await fetchFromApi(API_URL)
            console.log('QUESTIONS', questionQuery)
        });
        return{
            title:coverage.title,
            subjects:subjects.results,
        }
    })
    $effect(()=>{console.log(questions)})
</script>