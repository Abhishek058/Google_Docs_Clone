"use client";

import Documents from "@/components/Documents";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Login from "@/components/Login";
import { useSession } from "next-auth/react";

export default function HomeComp() {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <>
        <Header />
        <Hero />
        <Documents />
      </>
    );
  }

  return (
    <>
      <Login />
    </>
  );
}
