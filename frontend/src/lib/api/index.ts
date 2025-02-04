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
        throw error; 
    }
}