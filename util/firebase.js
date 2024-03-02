// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBQwrxYTJkUZFaRzF6M0vPfOUcO-rFe4cE",
  authDomain: "patients-f2979.firebaseapp.com",
  projectId: "patients-f2979",
  storageBucket: "patients-f2979.appspot.com",
  messagingSenderId: "879203349355",
  appId: "1:879203349355:web:57a86442285a7bc92c522e",
  measurementId: "G-3YQ19T1XHQ",
  databaseURL:"https://patients-f2979-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

 export default app;
