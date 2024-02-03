"use client";

import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../app/firebase/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const unsub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);

        const userRef = doc(db, "users", authUser.uid);
        setDoc(
          userRef,
          {
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
          },
          { merge: true }
        );
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, [app]);

  return user;
};

export default useUser;