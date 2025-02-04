import { env } from '$env/dynamic/public'; // Import private environment variables
import type { PageLoad } from './$types';
import { fetchFromApi } from '$lib/api';

export const load: PageLoad = async () => {
    const exam_id= localStorage.getItem('exam');
    const API_URL = env.PUBLIC_API_URL+'api/coverage/?exam_id='+exam_id
    const result = await fetchFromApi(API_URL)
    return {
        coverages: result.results,
    }
};
