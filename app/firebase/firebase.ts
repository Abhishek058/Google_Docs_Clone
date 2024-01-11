import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI14uBnOT2rTc1jQ8kgmzS5z_MlLrCrNg",
  authDomain: "docs-clone-ggl.firebaseapp.com",
  projectId: "docs-clone-ggl",
  storageBucket: "docs-clone-ggl.appspot.com",
  messagingSenderId: "638064535833",
  appId: "1:638064535833:web:71d2ac9f820db25366fd88"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
