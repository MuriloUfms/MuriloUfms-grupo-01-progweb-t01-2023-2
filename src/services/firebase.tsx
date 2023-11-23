import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClcFgFALBkopqkvxVNMDlch7QGaS3LP0c",
  authDomain: "pokequiz-ef28e.firebaseapp.com",
  projectId: "pokequiz-ef28e",
  storageBucket: "pokequiz-ef28e.appspot.com",
  messagingSenderId: "848500229212",
  appId: "1:848500229212:web:e62c49ad34b1eef705d299",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
