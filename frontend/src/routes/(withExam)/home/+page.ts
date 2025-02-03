import { env } from '$env/dynamic/public'; // Import private environment variables
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { fetchFromApi } from '$lib/api';

export const load: PageLoad = async () => {
    const chosenExam = localStorage.getItem("exam")
    console.log(chosenExam)
    const API_URL = env.PUBLIC_API_URL+'api/coverage/?exam_id='+chosenExam; 
    const results = await fetchFromApi(API_URL)
    return {
        exams:results.results
    }
};