
// +page.ts
import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public'; // Import private environment variables
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch }) => {
    const chosenExam = localStorage.getItem("exam")
    console.log(chosenExam)
    if(chosenExam === null || chosenExam === ""){
        const API_URL = env.PUBLIC_API_URL+'api/exam/'; 
        try {
            const res = await fetch(API_URL);
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
    }else {
        redirect(302,'/home')
    }
};