"use client";

import React, { useEffect, useState } from "react";
import useUser from "@/components/useUser";
import {
  Chat,
  Check,
  Clear,
  Description,
  History,
  People,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { getFirestore, updateDoc } from "firebase/firestore";
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
          const data = await snapshot.data();
          if (snapshot.exists() || !user) {
            setLoading(false);
          }
          if (!snapshot.exists() && user) {
            setLoading(false);
          }
          if (data) {
            setTitle(data.fileName || "");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [snapshot, user, params.id]);

  const [editingTitle, setEditingTitle] = useState(false);

  const [title, setTitle] = useState(snapshot?.data()?.fileName);
  const handleTitleEditStart = () => {
    setEditingTitle(true);
  };

  const handleTitleEditSave = async () => {
    try {
      await updateDoc(doc(db, `userDocs/${userEmail}/docs/${params.id}`), {
        fileName: title,
      });

      setEditingTitle(false);
    } catch (error) {
      console.error("Error updating document title:", error);
    }
  };

  const handleTitleEditCancel = () => {
    setEditingTitle(false);
    setTitle(snapshot?.data()?.fileName || "");
  };

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
            {editingTitle ? (
              <div className="flex items-center gap-x-2">
                <input
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  className="mx-2 px-2 rounded-md border border-gray-300"
                />
                <IconButton onClick={handleTitleEditSave}>
                  <Check />
                </IconButton>
                <IconButton onClick={handleTitleEditCancel}>
                  <Clear />
                </IconButton>
              </div>
            ) : (
              <>
                <h1
                  className="text-xl font-medium text-gray-600 px-2 cursor-pointer"
                  onClick={handleTitleEditStart}
                >
                  {title}
                </h1>
              </>
            )}
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
          <div className="flex items-center gap-x-3">
            <div className="flex justify-center items-center">
              <IconButton className="rounded-full">
                <History className="text-2xl text-gray-600" />
              </IconButton>
              <IconButton className="rounded-full">
                <Chat className="text-2xl text-gray-600" />
              </IconButton>
              <Button className="px-5 py-2 rounded-full bg-[#c2e7ff] hover:bg-blue-300 hover:shadow-xl text-black">
                <People className="text-lg mr-2 text-black" />
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
