"use client";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const user = useSession().data;
  const status = useSession().status;
  console.log(user, status);

  return (
    <div className="w-full h-screen items-center justify-center bg-gradient-to-br from-orange-300 to-sky-300">
      <Header />
      <div className="h-12"></div>
      main
    </div>
  );
};

export default page;
