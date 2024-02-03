"use client";

import React from "react";
import useUser from "@/components/useUser";
import { Clear, Login } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function Page({ params }: { params: { documentID: string } }) {
  const user = useUser();
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/");
  };

  return (
    <>
      {user ? (
        <div>This is the document with ID: {params.documentID}</div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-100">
          <div>
            <Clear
              className="text-9xl text-red-500"
              style={{ fontSize: "10rem" }}
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Access Denied
          </h1>
          <Button
            onClick={handleLoginClick}
            className="px-8 py-3 text-lg font-semibold rounded-lg bg-blue-500 hover:bg-blue-400 text-white focus:outline-none focus:ring focus:border-blue-300"
          >
            Log in
          </Button>
        </div>
      )}
    </>
  );
}
