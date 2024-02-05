"use client";

import React, { useEffect, useState } from "react";
import useUser from "../components/useUser";
import HomeComp from "./HomeComp";
import Login from "@/components/Login";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const user = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress className="text-4xl" />
      </div>
    );
  }

  if (!user && !loading) {
    return <Login />;
  } else {
    return <HomeComp user={user} />;
  }
}
