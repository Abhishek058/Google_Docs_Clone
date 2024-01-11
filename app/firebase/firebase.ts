import { initializeApp } from "firebase/app";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyA__HiIVHE0b5_WA6e87Ie8h4agwebdPrU",
  authDomain: "docs-clone-f048d.firebaseapp.com",
  projectId: "docs-clone-f048d",
  storageBucket: "docs-clone-f048d.appspot.com",
  messagingSenderId: "1036169296490",
  appId: "1:1036169296490:web:99413f5d77ab15676a2813",
};

const app = initializeApp(firebaseConfig);

export default app;
