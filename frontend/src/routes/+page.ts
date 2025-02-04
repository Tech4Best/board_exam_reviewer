import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public'; 
import { redirect } from '@sveltejs/kit';
import { fetchFromApi } from '$lib/api';

export const load: PageLoad = async () => {
    const chosenExam = localStorage.getItem("exam")
    if(chosenExam === null || chosenExam === ""){
        const API_URL = env.PUBLIC_API_URL+'api/exam/'; 
        const result = await fetchFromApi(API_URL)
        return {
            exams: result.results,
        };
    }else{
        redirect(302,'/home')
    }
};