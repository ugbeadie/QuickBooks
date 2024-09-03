import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWrgVLQmZMUqq-qy6shd2ixlttUTmBdSM",
  authDomain: "quickbooks-15072.firebaseapp.com",
  projectId: "quickbooks-15072",
  storageBucket: "quickbooks-15072.appspot.com",
  messagingSenderId: "495200749252",
  appId: "1:495200749252:web:1f679c7b52d44603e32b91",
  measurementId: "G-HKF9W129C2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const googleProvider = new GoogleAuthProvider();
