// Import the functions you need from the SDKs you need
import { initializeApp, getApps, deleteApp, type FirebaseApp} from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGEING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
let firebaseApp: FirebaseApp;

if(!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApps()[0];
    deleteApp(firebaseApp);
    firebaseApp = initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

// Trouble shooting how to do this with A.I. Includes collection and getDocs import at the top. 
// Can not find good enough resources for our projectin other areas.
// Fetch data from Firestore and put it in an array
const fetchData = async () => {
  try {
    const usersCollection = collection(db, 'Users');
    const snapshot = await getDocs(usersCollection);
    snapshot.forEach(doc => {
      // Assuming each document has a field called testInput which is an array
      const testInputArray = doc.data().testInput as Document[];
      console.log('Data fetched:', testInputArray);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
fetchData();

