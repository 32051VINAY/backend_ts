import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database(
  'C:\\Users\\sivat\\Downloads\\sqlite-tools-win-x64-3530100\\sip_tracker',
  (error: Error | null) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log('Successfully connected to db');
    }
  }
);
