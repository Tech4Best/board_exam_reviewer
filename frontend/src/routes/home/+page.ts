import { env } from '$env/dynamic/public'; // Import private environment variables
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load: PageLoad = async () => {
    const chosenExam = localStorage.getItem("exam")
    console.log(chosenExam)
    if(!chosenExam === null && !(chosenExam === "")){
        redirect(302,'/')
    }else{
        const API_URL = env.PUBLIC_API_URL+'api/coverage/?exam_id='+chosenExam; 
        try {
            const res = await fetch(API_URL,{
                method:'get',
            }
        );
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to fetch exams: ${res.status} - ${errorText || res.statusText}`);
            }
            const exams = await res.json();
            return {
                exams: exams.results,
            };
        } catch (error) {
            console.error('Error fetching exams:', error);
            throw error; // Or handle the error as described in the previous example
        }
    }
};