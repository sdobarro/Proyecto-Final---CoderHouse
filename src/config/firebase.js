// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgJ9cAUEbf9VXhzKwpfT5pu4TuZ1wwV1w",
  authDomain: "project-final-ab398.firebaseapp.com",
  projectId: "project-final-ab398",
  storageBucket: "project-final-ab398.appspot.com",
  messagingSenderId: "238389447247",
  appId: "1:238389447247:web:366421a540be283cb2b83a",
  measurementId: "G-WCWYLVRTM6"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db= getFirestore(app)