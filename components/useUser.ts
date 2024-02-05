import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../app/firebase/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth(app);
      const db = getFirestore(app);

      const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
        if (authUser) {
          setUser(authUser);

          const userRef = doc(db, "users", authUser.uid);
          try {
            await setDoc(
              userRef,
              {
                displayName: authUser.displayName,
                email: authUser.email,
                photoURL: authUser.photoURL,
              },
              { merge: true }
            );
          } catch (error) {
            console.error("Error updating user data:", error);
          }
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [app]);

  return user;
};

export default useUser;
