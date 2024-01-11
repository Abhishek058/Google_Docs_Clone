"use client";

import Documents from "@/components/Documents";
import { Button } from "@mui/material";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { auth } from "./firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { use, useEffect, useState } from "react";

export default function HomeComp() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscibe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscibe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {user ? (
        <div>
          <Header user={user}/>
          <Hero />
          <Documents />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <img
            src="https://links.papareact.com/1ui"
            width="400"
            height="400"
            alt="Google Docs Logo"
          />

          <Button
            className="px-10 py-2 m-10 text-md rounded-lg bg-blue-600 hover:bg-blue-500 hover:shadow-2xl hover:scale-105 text-white"
            onClick={() => signInWithGoogle()}
          >
            Login
          </Button>
        </div>
      )}
    </>
  );
}
