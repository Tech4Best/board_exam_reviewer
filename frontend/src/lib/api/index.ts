import { env } from '$env/dynamic/public'; // Import private environment variables

export const fetchFromApi = async(API_URL: string,) => {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to fetch Subjects: ${res.status} - ${errorText || res.statusText}`);
        }
        const result = await res.json();
        return result
        } catch (error) {
        console.error('Error fetching exams:', error);
        throw error; // Or handle the error as described in the previous example
    }
}

export const getSubjectByCoverage = async(coverage_id: string) => {
    const API_URL = env.PUBLIC_API_URL+'api/subject/?coverage_id='+coverage_id; 
    fetchFromApi(API_URL)
    co
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to fetch Subjects: ${res.status} - ${errorText || res.statusText}`);
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
