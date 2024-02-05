"use client";

import React, { useEffect, useState } from "react";
import useUser from "@/components/useUser";
import { Description } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Button, CircularProgress } from "@mui/material";
import { getFirestore } from "firebase/firestore";
import app from "@/app/firebase/firebase";
import { doc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

export default function Page({ params }: { params: { id: string } }) {
  const user = useUser();
  const router = useRouter();
  const db = getFirestore(app);
  const userEmail = user?.email;
  const [snapshot, error] = useDocumentOnce(
    doc(db, `userDocs/${userEmail}/docs/${params.id}`)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (snapshot) {
          await snapshot.data();
          if (snapshot.exists() || !user) {
            setLoading(false);
          }
          if (!snapshot.exists() && user) {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [snapshot, user, params.id]);

  const handleLoginClick = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress className="text-4xl" />
      </div>
    );
  }
  if (!snapshot?.exists()) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Document not found</h1>
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <header className="flex items-center p-3 pb-1">
          <span onClick={handleLoginClick} className="cursor-pointer">
            <Description className="text-4xl text-blue-500" />
          </span>
          <h1>{snapshot?.data()?.fileName}</h1>
        </header>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Access Denied</h1>
      <Button
        onClick={handleLoginClick}
        className="px-8 py-3 text-lg font-semibold rounded-lg bg-blue-500 hover:bg-blue-400 text-white focus:outline-none focus:ring focus:border-blue-300"
      >
        Log in
      </Button>
    </div>
  );
}
