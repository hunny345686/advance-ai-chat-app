// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chat-ai-46f2e.firebaseapp.com",
  projectId: "chat-ai-46f2e",
  storageBucket: "chat-ai-46f2e.firebasestorage.app",
  messagingSenderId: "707883724143",
  appId: "1:707883724143:web:8b76d6287535ffe82e4c9a"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export  const googleProvider = new GoogleAuthProvider()
