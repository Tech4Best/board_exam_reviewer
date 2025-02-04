export let localDatabase: IDBDatabase | null= $state(null);

export const initDB = (localDatabase: IDBDatabase | null) => {
    const DBOpenRequest = window.indexedDB.open('pwa-reviewer');  
    DBOpenRequest.onerror = (event) => {
        window.alert('Error loading database.');
    };
    DBOpenRequest.onsuccess = (event) => {
        console.log('Initialized Database');
        localDatabase = DBOpenRequest.result;
    }
}
