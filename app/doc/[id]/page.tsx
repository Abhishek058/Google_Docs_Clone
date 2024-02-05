"use client";

import React, { useEffect, useState } from "react";
import useUser from "@/components/useUser";
import { Chat, Description, History, People } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Button, CircularProgress } from "@mui/material";
import { getFirestore } from "firebase/firestore";
import app from "@/app/firebase/firebase";
import { doc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import TextEditor from "@/components/TextEditor";

export default function Page({ params }: { params: { id: string } }) {
  const menuBar = [
    "File",
    "Edit",
    "View",
    "Insert",
    "Format",
    "Tools",
    "Help",
    "More",
  ];
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
        <header className="flex items-center justify-between p-3 pb-1">
          <span onClick={handleLoginClick} className="cursor-pointer">
            <Description className="text-5xl text-blue-500" />
          </span>
          <div className="flex-grow">
            <h1 className="text-xl font-medium text-gray-600 px-2">
              {snapshot?.data()?.fileName}
            </h1>
            <div className="flex items-center gap-x-2 text-sm text-gray-600">
              {menuBar.map((item, index) => (
                <p
                  key={index}
                  className="hover:bg-gray-200 px-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-x-2 ">
            <div>
              <Button className="rounded-full">
                <History className="text-2xl text-gray-600" />
              </Button>
              <Button className="rounded-full">
                <Chat className="text-2xl text-gray-600" />
              </Button>
              <Button
                className="px-5 py-2 rounded-full bg-[#c2e7ff] hover:bg-blue-300 hover:shadow-xl text-black"
                // onClick={}
              >
                <People className="text-lg mr-2" />
                Share
              </Button>
            </div>

            <img
              src={user.photoURL ?? ""}
              alt="user image"
              className="w-12 h-12 rounded-full cursor-pointer"
            />
          </div>
        </header>
        <TextEditor id={params.id} />
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
