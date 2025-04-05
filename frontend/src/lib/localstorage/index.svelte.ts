export let localDatabase: IDBDatabase | null = $state(null);

export const initDB = async(localDatabase: IDBDatabase | null) => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('pwa-reviewer');

        request.onerror = (event) => {
        window.alert('Error loading database.');
        };

        request.onsuccess = (event) => {
        resolve(request.result);
        };

  });
  /*  const DBOpenRequest = window.indexedDB.open('pwa-reviewer');  
    DBOpenRequest.onerror = (event) => {
        window.alert('Error loading database.');
    };
    DBOpenRequest.onsuccess = (event) => {
        console.log('Initialized Database');
        localDatabase = DBOpenRequest.result;
        console.log("database name", localDatabase.name)
    }
        */
}
