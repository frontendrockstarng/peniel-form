// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxJb68IPrBtQ30fhM_er_p4eydzeCS9go",
  authDomain: "peniel-6-registeration.firebaseapp.com",
  projectId: "peniel-6-registeration",
  storageBucket: "peniel-6-registeration.appspot.com",
  messagingSenderId: "870261044635",
  appId: "1:870261044635:web:cc5dce16638464ef859d3e",
  measurementId: "G-QYN9WDP9JQ"
};

// Initialize Firebase
try {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const auth = getAuth(app);

  // Export the initialized app
  export { app, analytics, db, auth };
} catch (error) {
  console.error("Firebase initialization error:", 

