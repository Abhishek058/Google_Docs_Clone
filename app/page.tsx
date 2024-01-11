"use client";

import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import app from "./firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { Button } from "@mui/material";
import HomeComp from "./HomeComp";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, [app]);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {user ? (
        <HomeComp user={user}/>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <img
            src="https://links.papareact.com/1ui"
            width="400"
            height="400"
            alt="Google Docs Logo"
          />
          <Button
            className="px-10 py-2 m-5 text-xl rounded-lg bg-blue-500 hover:bg-blue-400 text-white"
            onClick={signInWithGoogle}
          >
            Sign In
          </Button>
        </div>
      )}
    </>
  );
}
