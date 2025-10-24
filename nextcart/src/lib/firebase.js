// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvOhlu5M2vJ8tvEhyT803yyAtDIbXyBx8",
  authDomain: "nextcart-firebase.firebaseapp.com",
  projectId: "nextcart-firebase",
  storageBucket: "nextcart-firebase.firebasestorage.app",
  messagingSenderId: "704430019531",
  appId: "1:704430019531:web:fbdafe408a51036ba1dc4e",
  measurementId: "G-5CHRX7PKEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app); 

export default app;