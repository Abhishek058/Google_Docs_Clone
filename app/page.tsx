"use client";

import useUser from "../components/useUser";
import HomeComp from "./HomeComp";
import Login from "@/components/Login";

export default function Home() {
  const user = useUser();
  return <>{user ? <HomeComp user={user} /> : <Login />}</>;
}
