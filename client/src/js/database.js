import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, { // creates a connection to the database 'jate', with version 1. If this database doesn't already exist, create the database.
    upgrade(db) { // If the database already exists and is at the same version, then nothing will happen. If the database already exists but is at a lower version number, then the upgradeneeded event will be triggered, allowing you to update the schema of the database.
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id' }); // `autoincrement: true` is optional
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({id: 1, content});
  await tx.done;

};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  const value = await store.get(1);
  console.log('value => ',  value); // TODO: this code persists despite being deleted. Why?
  return value.content;
}


initdb();
