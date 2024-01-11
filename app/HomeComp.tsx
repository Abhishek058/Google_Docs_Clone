import React from "react";
import Documents from "@/components/Documents";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

interface HomeCompProps {
  user: any;
}

const HomeComp: React.FC<HomeCompProps> = ({ user }) => {
  return (
    <div>
      <Header user={user} />
      <Hero />
      <Documents />
    </div>
  );
};

export default HomeComp;
