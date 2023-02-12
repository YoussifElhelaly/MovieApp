// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4WWas39e7aAVThoDTd9DCGjY1PlCABj0",
  authDomain: "movie-2ea2a.firebaseapp.com",
  projectId: "movie-2ea2a",
  storageBucket: "movie-2ea2a.appspot.com",
  messagingSenderId: "701355339165",
  appId: "1:701355339165:web:cfa631022eece9d8c89374",
  measurementId: "G-PTV83GLQG7"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export default FirebaseApp