// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3_5NZmYILroZkSNZj_koe-2HjO1w3rPU",
  authDomain: "social-media-app-83bfb.firebaseapp.com",
  projectId: "social-media-app-83bfb",
  storageBucket: "social-media-app-83bfb.appspot.com",
  messagingSenderId: "1036541941198",
  appId: "1:1036541941198:web:f17856ef8fc248cbed479f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
