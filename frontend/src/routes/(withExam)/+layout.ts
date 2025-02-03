// +page.ts
import type { LayoutLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ fetch }) => {
    const chosenExam = localStorage.getItem("exam")
    console.log(chosenExam)
    if(chosenExam === null || chosenExam === ""){
        redirect(302,'/')
    }
};