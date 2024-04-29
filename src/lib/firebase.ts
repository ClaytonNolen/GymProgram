/** 
 * Connects to the Firebase. To do so a firebaseConfig object is made
 * with the following properties of the object including: apiKey, authDomain...
 * These services from Firebase our exportable properties. 
 * 
 * For more information on the help we recieved for the front-end and back-end, please see the README. 
 * 
 * Author: Clayton Nolen
 * Last Modified: April 28, 2024
 * 
 */

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, deleteApp, type FirebaseApp} from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional.

// These attributes of the constant variable, firebaseConfig, act as an address and connection to the Firebase.
// Check the .env file for more information that is specific to the Firebase. If a new Firebase is needed, 
// please change the .env file accordingly to your new Firebase configuration.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGEING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase.

// Dynamic variable that will be used for the init and configuration of Firebase servieces such as:
// Firestore, Authentication, Storage, and Google Auth Provider.
let firebaseApp: FirebaseApp;

// Check if any Firebase apps are already initialized.
if(!getApps().length) {
  // If not, initialize a new Firebase app with the provided configuration.
    firebaseApp = initializeApp(firebaseConfig);
} else {
  // If yes, delete the existing app, then initialize a new one with the provided configuration.
    firebaseApp = getApps()[0];
    deleteApp(firebaseApp);
    firebaseApp = initializeApp(firebaseConfig);
}

// Create constant variables that are exportable and allow the user for the listed services above.
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

