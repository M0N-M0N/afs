// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBuZIpGMXTeOsKSgeeE1vo4NPkl1o-J0hI",
    authDomain: "feedback-sys-dbda0.firebaseapp.com",
    projectId: "feedback-sys-dbda0",
    storageBucket: "feedback-sys-dbda0.appspot.com",
    messagingSenderId: "237527188435",
    appId: "1:237527188435:web:6fa4b2220662f30ec02526",
    measurementId: "G-LETPF14LK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//initialize store
export const db = getFirestore(app);


export const auth = getAuth();
export default app;