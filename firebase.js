import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAI14uBnOT2rTc1jQ8kgmzS5z_MlLrCrNg",
  authDomain: "docs-clone-ggl.firebaseapp.com",
  projectId: "docs-clone-ggl",
  storageBucket: "docs-clone-ggl.appspot.com",
  messagingSenderId: "638064535833",
  appId: "1:638064535833:web:2755fa644d1bacd666fd88",
};

const app = !firebase.app.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export { db };
